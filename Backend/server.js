const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "mySql_4678",
  database: "vitconnect",
});

db.connect((err) => {
  if (err) {
    console.log("My sql failed to connect");
    return;
  }
});

app.get("/users", (req, res) => {
  const sql = "SELECT * FROM employee";
  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.get("/", (req, res) => {
  res.status(200).json("From Backend Side");
});

app.listen(5000, () => {
  console.log("Server starting...");
});
