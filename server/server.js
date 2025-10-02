// simple Express API for local dev
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

let workouts = [
  { id: "w1", date: "2025-09-30", durationMinutes: 45, exercises: [{ exerciseId: "1", sets: 3, reps: 12 }] }
];

app.get("/api/ping", (_req, res) => res.json({ ok: true, time: Date.now() }));
app.get("/api/workouts", (_req, res) => res.json(workouts));
app.post("/api/workouts", (req, res) => {
  const item = { id: `w${Date.now()}`, ...req.body };
  workouts.unshift(item);
  res.status(201).json(item);
});
app.listen(4000, () => console.log("API running on http://localhost:4000"));
