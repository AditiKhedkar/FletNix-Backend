import express from 'express';
import cors from 'cors';
import { createClient } from '@libsql/client';

const app = express();
const port = 3000;

// Initialize database
const db = createClient({
  url: 'file:database.db'
});

// Middleware
app.use(cors());
app.use(express.json());

// Create tables if they don't exist
await db.execute(`
  CREATE TABLE IF NOT EXISTS data (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    -- Add more columns based on your CSV structure
  )
`);

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'API is running' });
});

// Get all records
app.get('/data', async (req, res) => {
  const result = await db.execute('SELECT * FROM data');
  res.json(result.rows);
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});