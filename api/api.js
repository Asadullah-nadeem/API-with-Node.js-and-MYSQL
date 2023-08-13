const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3100;

// MySQL database connection
const connection = mysql.createConnection({
  host: 'localhost',
  port: 3308,
  user: 'root',
  password: '',
  database: 'json'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database');
});

// Route to get all tiles as JSON
app.get('/tiles', (req, res) => {
  const sql = 'SELECT * FROM tiles';
  connection.query(sql, (err, result) => {
    if (err) {
      console.error('Error fetching tiles:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    res.json(result);
  });
});

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
