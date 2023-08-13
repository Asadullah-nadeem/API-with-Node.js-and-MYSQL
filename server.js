const express = require('express');
const mysql = require('mysql');
const ejs = require('ejs');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

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

// Use EJS as the view engine
app.set('view engine', 'ejs');

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files
app.use(express.static('public'));

// Routes
app.get('/', (req, res) => {
  const sql = 'SELECT * FROM tiles';
  connection.query(sql, (err, tiles) => {
    if (err) {
      console.error('Error fetching tiles:', err);
      res.render('index', { tiles: [] });
      return;
    }
    res.render('index', { tiles });
  });
});

app.post('/', (req, res) => {
  const { title, data, description } = req.body;
  const sql = 'INSERT INTO tiles (title, data, description) VALUES (?, ?, ?)';
  connection.query(sql, [title, data, description], (err, result) => {
    if (err) {
      console.error('Error adding tile:', err);
      res.redirect('/');
      return;
    }
    res.redirect('/');
  });
});

app.get('/delete/:id', (req, res) => {
  const id = req.params.id;
  const sql = 'DELETE FROM tiles WHERE id = ?';
  connection.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Error deleting tile:', err);
    }
    res.redirect('/');
  });
});

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
