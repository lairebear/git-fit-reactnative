export interface Exercise {
    id: string;
    name: string;
    category: string;
    description?: string;
    equipment?: string;
  }
  
  export const sampleExercises: Exercise[] = [
    { id: "1", name: "Push Ups", category: "Chest", description: "Bodyweight push-up", equipment: "None" },
    { id: "2", name: "Squats", category: "Legs", description: "Bodyweight squat", equipment: "None" },
    { id: "3", name: "Pull Ups", category: "Back", description: "Pull-up from bar", equipment: "Pull-up bar" },
    { id: "4", name: "Plank", category: "Core", description: "Static core hold", equipment: "None" },
    { id: "5", name: "Dumbbell Row", category: "Back", equipment: "Dumbbell", description: "One-arm row" },
  ];
  