// In-memory schemas + helpers for exercises and workouts

function genId(prefix = "id") {
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2,8)}`;
}

// Exercise schema: { id, name, category, equipment }
const exercises = [
  { id: "e1", name: "Squat", category: "strength", equipment: "barbell" },
  { id: "e2", name: "Bench Press", category: "strength", equipment: "barbell" },
  { id: "e3", name: "Pull Up", category: "strength", equipment: "bodyweight" }
];

// Workout schema: { id, date, exercises[], notes }
// each workout.exercises item: { id, exerciseId, sets?, reps?, weight?, notes? }
const workouts = [
  {
    id: "w1",
    date: new Date().toISOString(),
    exercises: [
      { id: "we1", exerciseId: "e1", sets: 3, reps: 8, weight: 100 },
      { id: "we2", exerciseId: "e2", sets: 3, reps: 6, weight: 80 }
    ],
    notes: "Easy session"
  }
];

function validateExercisePayload(payload) {
  if (!payload || typeof payload !== "object") return false;
  if (!payload.name || typeof payload.name !== "string") return false;
  if (!payload.category || typeof payload.category !== "string") return false;
  if (!payload.equipment || typeof payload.equipment !== "string") return false;
  return true;
}

function createExercise(payload) {
  if (!validateExercisePayload(payload)) {
    throw new Error("Invalid exercise payload");
  }
  const item = {
    id: genId("ex"),
    name: payload.name,
    category: payload.category,
    durationMinutes: payload.durationMinutes ?? 0,
    equipment: payload.equipment
  };
  exercises.unshift(item);
  return item;
}

function validateWorkoutPayload(payload) {
  if (!payload || typeof payload !== "object") return false;
  if (!Array.isArray(payload.exercises)) return false;
  for (const e of payload.exercises) {
    if (!e.exerciseId || typeof e.exerciseId !== "string") return false;
    if (e.sets != null && typeof e.sets !== "number") return false;
    if (e.reps != null && typeof e.reps !== "number") return false;
  }
  return true;
}

function createWorkout(payload) {
  if (!validateWorkoutPayload(payload)) {
    throw new Error("Invalid workout payload");
  }
  const item = {
    id: genId("wk"),
    date: payload.date || new Date().toISOString(),
    exercises: payload.exercises.map((ex) => ({
      id: genId("we"),
      exerciseId: ex.exerciseId,
      sets: ex.sets ?? null,
      reps: ex.reps ?? null,
      weight: ex.weight ?? null,
      notes: ex.notes ?? ""
    })),
    notes: payload.notes || ""
  };
  workouts.unshift(item);
  return item;
}

module.exports = {
  exercises,
  workouts,
  validateExercisePayload,
  createExercise,
  validateWorkoutPayload,
  createWorkout
};