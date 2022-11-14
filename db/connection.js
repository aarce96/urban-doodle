const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  // MySQL username,
  user: 'root',
  // MySQL password
  password: 'password',
  database: 'etracker_db'
});

module.exports = db;