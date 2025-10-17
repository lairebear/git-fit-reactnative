export interface Exercise {
    id: string;
    name: string;
    category: string;
    description?: string;
    equipment?: string;
  }
  
  export const sampleExercises: Exercise[] = [
    // kathys fav -- upper body!
    // chest
    { id: "1", name: "Push Ups", category: "Chest", description: "Bodyweight push-up", equipment: "None" },
    { id: "2", name: "Bench Press", category: "Chest", description: "Barbell bench press", equipment: "Barbell, Bench" },
    { id: "3", name: "Incline Dumbbell Press", category: "Chest", description: "Dumbbell press on incline bench", equipment: "Dumbbells, Bench" },
    { id: "4", name: "Chest Fly", category: "Chest", description: "Dumbbell fly on flat bench", equipment: "Dumbbells, Bench" },
    { id: "5", name: "Cable Crossover", category: "Chest", description: "Cable machine chest fly", equipment: "Cable Machine" },
  
    // back
    { id: "6", name: "Pull Ups", category: "Back", description: "Pull-up from bar", equipment: "Pull-up bar" },
    { id: "7", name: "Dumbbell Row", category: "Back", description: "One-arm row", equipment: "Dumbbell" },
    { id: "8", name: "Lat Pulldown", category: "Back", description: "Lat pulldown with cable machine", equipment: "Cable Machine" },
    { id: "9", name: "Seated Row", category: "Back", description: "Seated row with cable or machine", equipment: "Cable Machine" },
    { id: "10", name: "Deadlift", category: "Back", description: "Barbell deadlift for posterior chain", equipment: "Barbell" },
  
    // shoulders
    { id: "11", name: "Overhead Press", category: "Shoulders", description: "Barbell or dumbbell press overhead", equipment: "Barbell or Dumbbells" },
    { id: "12", name: "Lateral Raise", category: "Shoulders", description: "Dumbbell lateral raise", equipment: "Dumbbells" },
    { id: "13", name: "Front Raise", category: "Shoulders", description: "Dumbbell front raise", equipment: "Dumbbells" },
    { id: "14", name: "Arnold Press", category: "Shoulders", description: "Dumbbell Arnold press", equipment: "Dumbbells" },
    { id: "15", name: "Rear Delt Fly", category: "Shoulders", description: "Dumbbell reverse fly", equipment: "Dumbbells" },
  
    // arms
    { id: "16", name: "Bicep Curl", category: "Arms", description: "Dumbbell or barbell curl", equipment: "Dumbbells or Barbell" },
    { id: "17", name: "Hammer Curl", category: "Arms", description: "Neutral-grip dumbbell curl", equipment: "Dumbbells" },
    { id: "18", name: "Tricep Dip", category: "Arms", description: "Bodyweight dip", equipment: "Dip Bars or Bench" },
    { id: "19", name: "Tricep Pushdown", category: "Arms", description: "Cable machine pushdown", equipment: "Cable Machine" },
    { id: "20", name: "Overhead Tricep Extension", category: "Arms", description: "Dumbbell overhead extension", equipment: "Dumbbell" },
  
    // lowerrrrr yuh laire's fav
    // legs
    { id: "21", name: "Squats", category: "Legs", description: "Bodyweight squat", equipment: "None" },
    { id: "22", name: "Lunges", category: "Legs", description: "Forward or backward lunges", equipment: "None or Dumbbells" },
    { id: "23", name: "Leg Press", category: "Legs", description: "Machine leg press", equipment: "Leg Press Machine" },
    { id: "24", name: "Leg Curls", category: "Legs", description: "Hamstring curl machine exercise", equipment: "Machine" },
    { id: "25", name: "Calf Raises", category: "Legs", description: "Standing or seated calf raise", equipment: "None or Dumbbells" },
  
    // glutes
    { id: "26", name: "Hip Thrust", category: "Glutes", description: "Barbell hip thrust for glute activation", equipment: "Barbell, Bench" },
    { id: "27", name: "Glute Bridge", category: "Glutes", description: "Bodyweight or weighted glute bridge", equipment: "None or Barbell" },
    { id: "28", name: "Cable Kickback", category: "Glutes", description: "Glute kickback using cable machine", equipment: "Cable Machine" },
    { id: "29", name: "Bulgarian Split Squat", category: "Glutes", description: "Single-leg squat with rear foot elevated", equipment: "Bench, Dumbbells optional" },
    { id: "30", name: "Step Ups", category: "Glutes", description: "Step onto bench or platform, driving through the heel", equipment: "Bench, Dumbbells optional" },
  
    // core
    { id: "31", name: "Plank", category: "Core", description: "Static core hold", equipment: "None" },
    { id: "32", name: "Crunches", category: "Core", description: "Abdominal crunch", equipment: "None" },
    { id: "33", name: "Russian Twist", category: "Core", description: "Twisting core exercise", equipment: "None or Medicine Ball" },
    { id: "34", name: "Leg Raises", category: "Core", description: "Lying or hanging leg raises", equipment: "None or Pull-up Bar" },
    { id: "35", name: "Bicycle Crunch", category: "Core", description: "Abdominal twisting crunch", equipment: "None" },
  ];
  