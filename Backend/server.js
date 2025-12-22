import express from "express";
import cors from "cors";
import db from "./db.js";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend running");
});

// Loading all clubs
app.get("/clubs", async (req, res) => {
  try {
    const [clubs] = await db.query("SELECT * FROM clubs");
    res.json(clubs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

// Loading single club detail
app.get("/clubs/:id", async (req, res) => {
  const clubId = req.params.id;

  try {
    const [[club]] = await db.query("SELECT * FROM clubs WHERE id = ?", [
      clubId,
    ]);

    if (!club) {
      return res.status(404).json({ error: "Club not found" });
    }

    const [events] = await db.query("SELECT * FROM events WHERE club_id = ?", [
      clubId,
    ]);

    res.json({ club, events });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

// Applications...
app.post("/applications", async (req, res) => {
  const { club_id } = req.body;

  // temporary hardcoded user
  const user_id = 1;

  try {
    const [existing] = await db.query(
      "SELECT * FROM applications WHERE user_id = ? AND club_id = ?",
      [user_id, club_id]
    );

    if (existing.length > 0) {
      return res.status(400).json({ message: "Already applied" });
    }

    await db.query(
      "INSERT INTO applications (user_id, club_id) VALUES (?, ?)",
      [user_id, club_id]
    );

    res.json({ message: "Application submitted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Database error" });
  }
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
