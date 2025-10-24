// simple Express API for local dev
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const { exercises, workouts, createExercise, createWorkout } = require("./data");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// health route
app.get("/api/health", (_req, res) => res.json({ status: "ok" }));

// exercises endpoints
app.get("/api/exercises", (_req, res) => res.json(exercises));
app.post("/api/exercises", (req, res) => {
  try {
    console.log("📦 Incoming workout payload:", req.body);
    const item = createExercise(req.body);
    res.status(201).json(item);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// workouts endpoints
app.get("/api/ping", (_req, res) => res.json({ ok: true, time: Date.now() }));
app.get("/api/workouts", (_req, res) => res.json(workouts));
app.post("/api/workouts", (req, res) => {
  try {
    const item = createWorkout(req.body);
    res.status(201).json(item);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.listen(4000, "0.0.0.0", () => {
  console.log("✅ API running on http://10.110.35.124:4000");
});

// clear all workouts (for testing purposes ONLYYYY DONT)
app.delete("/api/workouts", (_req, res) => {
  workouts.length = 0; // empties the array
  res.json({ ok: true, message: "All workouts cleared" });
});
