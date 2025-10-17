import type { Exercise } from "./Exercise";

export interface WorkoutExercise {
  exerciseId: string;
  sets?: number;
  reps?: number;
  weightKg?: number;
}

export interface Workout {
  id: string;
  date: string; // MM-DD-YYYY
  durationMinutes?: number;
  exercises: WorkoutExercise[];
  notes?: string;
}

export const sampleWorkouts: Workout[] = [
  {
    id: "w1",
    date: "9-30-2025",
    durationMinutes: 45,
    exercises: [
      { exerciseId: "1", sets: 3, reps: 12 },
      { exerciseId: "2", sets: 4, reps: 10 },
    ],
    notes: "feeling silly",
  },
  {
    id: "w2",
    date: "9-29-2025",
    durationMinutes: 30,
    exercises: [{ exerciseId: "4", sets: 3, reps: 1 }],
    notes: "i'm locked in Now"
  },
];
