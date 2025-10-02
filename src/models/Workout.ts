import type { Exercise } from "./Exercise";

export interface WorkoutExercise {
  exerciseId: string;
  sets?: number;
  reps?: number;
  weightKg?: number;
}

export interface Workout {
  id: string;
  date: string; // YYYY-MM-DD (simple)
  durationMinutes?: number;
  exercises: WorkoutExercise[];
  notes?: string;
}

export const sampleWorkouts: Workout[] = [
  {
    id: "w1",
    date: "2025-09-30",
    durationMinutes: 45,
    exercises: [
      { exerciseId: "1", sets: 3, reps: 12 },
      { exerciseId: "2", sets: 4, reps: 10 },
    ],
    notes: "Felt strong.",
  },
  {
    id: "w2",
    date: "2025-09-29",
    durationMinutes: 30,
    exercises: [{ exerciseId: "4", sets: 3, reps: 1 }],
  },
];
