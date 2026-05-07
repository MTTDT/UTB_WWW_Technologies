import sqlite3 from 'sqlite3';
import path from "path";
import fs from "fs";

const __dirname = import.meta.dirname;
let db;

export const db_initialize_create = async () => {
    const dbDir = path.join(__dirname, "db");
    if (!fs.existsSync(dbDir)) {
        fs.mkdirSync(dbDir);
    }
    
    let filename = path.join(__dirname, "db", "data.db");

    return new Promise((resolve, reject) => {
        db = new sqlite3.Database(filename, (err) => {
          if (err) {
            console.error("Error opening database:", err.message);
            reject(err);
          }
          console.log("Connected to the SQLite database.");
          
          createTables(resolve, reject);
        });
      });
}

const createTables = (resolve, reject) => {
    const schema = `
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
  
      CREATE TABLE IF NOT EXISTS items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        owner_user_id INTEGER,
        FOREIGN KEY (owner_user_id) REFERENCES users (id)
      );
    `;
  
    db.exec(schema, (err) => {
      if (err) {
        console.error("Error creating tables:", err.message);
        reject(err);
      } else {
        resolve(db);
      }
    });
  };

export const get_db = () => {
  if (!db) throw new Error("DB not initialized. Call db_initialize_create() first.");
  return db;
}

export const populate_items = async () => {
    const mockItems = [
      ["Vintage Camera", "A classic 35mm film camera.", 1],
      ["Mountain Bike", "Well-used but reliable.", 1],
      ["Mechanical Keyboard", "Clicky switches, RGB lighting.", 1]
    ];
  
    for (const [name, desc, userId] of mockItems) {
      await new Promise((resolve, reject) => {
        db.run(
          "INSERT INTO items (name, description, owner_user_id) VALUES (?, ?, ?)",
          [name, desc, userId],
          (err) => {
            if (err) {
              console.error(`Error inserting ${name}:`, err.message);
              reject(err);
            } else {
              console.log(`Inserted item: ${name}`);
              resolve();
            }
          }
        );
      });
    }
};