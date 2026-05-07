import express from 'express';
import { get_db } from '../db.js';
import { requireAuth } from './auth.js';

const router = express.Router();

router.get("/", async (req, res) => {
    const db = get_db();
  
    const query = "SELECT id, name, description, owner_user_id, created_at FROM items ORDER BY id DESC";
  
    await db.all(query, 
      function(err, items) {
          if (err) {
              console.error(err);
              return res.status(500).json({ error: `Database error ${err.message}` });
          }
  
          console.log(`Retrieved ${items.length} items`);
          return res.status(200).json(items);
      });
});

  
  
router.post("/", requireAuth, async (req, res) => {
    const { name, description } = req.body || {};
    if (!name) return res.status(404).json({ error: "name required" });
  
    const db = get_db();
    const query = "INSERT INTO items (name, description, owner_user_id) VALUES (?, ?, ?)";
  
    await db.run(query, 
      [name, description || null, null], 
      async function(err) {
          if (err) {
              console.error(err);
              return res.status(500).json({ error: `Database error ${err.message}` });
          }
  
          console.log(`Inserted item with ID ${this.lastID}`);
  
          const created = await get_by_id(db, req.params.id);
          return res.status(201).json(created);
      });
});


const query_get_item_by_id = "SELECT * FROM items WHERE id = ?"; 

function get_by_id(db, id) {
    return new Promise((resolve, reject) => {
        db.get(query_get_item_by_id, id, (err, item) => {
            if (err) {
                console.error(err);
                return reject(new Error(`Database error ${err.message}`));
            }
            resolve(item);
        });
    });
}

router.get("/:id", async (req, res) => {
    const db = get_db();
    const id = req.params.id;
  
    try {
        const item = await get_by_id(db, id);
        if (!item) {
            return res.status(404).json({ error: "Item not found" });
        }
        return res.status(200).json(item);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: `Database error ${err.message}` });
    }
});

router.put("/:id", requireAuth, async (req, res) => {
    const { name, description } = req.body;
    if (!name) return res.status(404).json({ error: "name required" });

    const db = get_db();
    const id = req.params.id;

    const item = await get_by_id(db, id);
    if (!item) return res.status(404).json({ error: "Item not found" });

    const query = "UPDATE items SET name = ?, description = ? WHERE id = ?";
    db.run(query, [name, description || null, id], async function(err) {
        if (err) return res.status(500).json({ error: err.message });
        
        const updated = await get_by_id(db, id);
        return res.status(200).json(updated);
    });
});


router.delete("/:id", requireAuth, async (req, res) => {
    const db = get_db();
    const id = req.params.id;

    const item = await get_by_id(db, id);
    if (!item) return res.status(404).json({ error: "Item not found" });

    db.run("DELETE FROM items WHERE id = ?", id, function(err) {
        if (err) return res.status(500).json({ error: err.message });
        return res.status(204).send();
    });
});

export default router;