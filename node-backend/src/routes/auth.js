import express from 'express';
import bcrypt from 'bcryptjs';
import { get_db } from '../db.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post("/signup", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
    }

    const db = get_db();

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const query = "INSERT INTO users (email, password_hash) VALUES (?, ?)";
        
        db.run(query, [email, hashedPassword], function(err) {
            if (err) {
                if (err.message.includes("UNIQUE constraint failed")) {
                    return res.status(409).json({ error: "Email already registered" });
                }
                console.error(err);
                return res.status(500).json({ error: "Database error during signup" });
            }
            console.log(`User created with ID ${this.lastID}`);
            return res.status(201).json({
                message: "User created successfully",
                userId: this.lastID,
                email: email
            });
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error during password hashing" });
    }
});

const findUserByEmail = (db, email) => {
    return new Promise((resolve, reject) => {
        db.get("SELECT * FROM users WHERE email = ?", [email], (err, row) => {
            if (err) reject(err);
            resolve(row);
        });
    });
};

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
    }

    const db = get_db();

    try {
        const user = await findUserByEmail(db, email);
        if (!user) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        const payload = { 
            sub: user.id, 
            email: user.email 
        };

        const token = jwt.sign(
            payload, 
            process.env.JWT_SECRET, 
            { expiresIn: '1h' }
        );

        return res.status(200).json({
            token: token
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error during login" });
    }
});

export const requireAuth = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        req.user = {
            id: decoded.sub,
            email: decoded.email
        };

        next();
    });
};

export default router;