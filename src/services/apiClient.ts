const BASE_URL = "http://10.110.35.124:8082"; // change to 10.0.2.2 or your PC LAN IP for emulator/device

// export async function fetchWorkouts() {
//   const res = await fetch(`${BASE_URL}/api/workouts`);
//   if (!res.ok) throw new Error(await res.text());
//   return res.json();
// }

// temp
export async function fetchWorkouts() {
  const start = Date.now();
  const res = await fetch(`${BASE_URL}/api/workouts`);
  const end = Date.now();
  const rawText = await res.text();

  console.log(`[fetchWorkouts] Time: ${end - start}ms`);
  console.log(`[fetchWorkouts] Raw response: ${rawText.slice(0, 300)}`); // Limit for readability

  if (!res.ok) {
    throw new Error(`Server error ${res.status}: ${rawText}`);
  }

  try {
    const data = JSON.parse(rawText);
    console.log("[fetchWorkouts] Parsed data:", data);
    return data;
  } catch (err) {
    console.error("JSON parsing failed:", err);
    throw err;
  }
}


export async function saveWorkout(payload: any) {
  const res = await fetch(`${BASE_URL}/api/workouts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(txt || `Save failed: ${res.status}`);
  }
  return res.json();
}