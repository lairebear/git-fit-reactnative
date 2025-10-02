const BASE = "http://localhost:4000/api";

export async function ping() {
  const res = await fetch(`${BASE}/ping`);
  return res.json();
}

export async function fetchWorkouts() {
  const res = await fetch(`${BASE}/workouts`);
  if (!res.ok) throw new Error("Failed to fetch workouts");
  return res.json();
}

export async function createWorkout(payload) {
  const res = await fetch(`${BASE}/workouts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  if (!res.ok) throw new Error("Failed to create workout");
  return res.json();
}
