import 'dotenv/config';
import express from 'express';
import { db_initialize_create, populate_items } from "./db.js";
import itemRouter from './routes/items.js';
import authRouter from './routes/auth.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/items', itemRouter);
app.use('/auth', authRouter);

app.get('/health', (req, res) => {
  res.status(200).json({ status: "ok" });
});


app.listen(PORT, () => {
    // console.log('Port:', PORT);
    // console.log('Secret:', process.env.JWT_SECRET || 'failed to get secret');
});

db_initialize_create().then(() => {
  
    console.log("DB initialized and tables created");
});

// populate_items().then(() => {
//     console.log("Sample items populated");
// }).catch(err => {
//     console.error("Error populating items:", err);
// });

