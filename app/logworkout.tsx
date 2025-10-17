import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Pressable, Alert } from "react-native";
import { useRouter } from "expo-router";
// import { saveWorkout } from !!! ;

export default function LogWorkout() {
  const router = useRouter();

  const [workoutName, setWorkoutName] = useState("");
  const [sets, setSets] = useState("");
  const [reps, setReps] = useState("");
  const [duration, setDuration] = useState(""); // optional
  const [notes, setNotes] = useState(""); // optional

  const handleSave = async () => {
    if (!workoutName.trim()) {
      Alert.alert("Missing info", "Please enter a workout name.");
      return;
    }

    const newWorkout: any = {
      name: workoutName,
      sets: Number(sets) || 0,
      reps: Number(reps) || 0,
      duration: duration ? `${duration} min` : "",
      date: new Date().toISOString(),
    };

    if (notes.trim()) {
      newWorkout.notes = notes.trim(); // only include notes if not empty
    }

    // placeholder for saving the workout
    // await saveWorkout(newWorkout);
    // waiting for the API to be built, then i'll call the import later

    console.log("Workout to save:", newWorkout); // temporary feedback

    Alert.alert("Success", "Workout logged (temporarily).");
    router.back(); // navigate back to the previous screen
  };

  return (
    <View style={styles.container}>

      <Pressable onPress={() => router.back()} style={styles.backButton}>
        <Text style={styles.backText}>← Back</Text>
      </Pressable>

      <Text style={styles.title}>Log a Workout</Text>

      <TextInput
        style={styles.input}
        placeholder="Workout Name (ex. leg day)"
        value={workoutName}
        onChangeText={setWorkoutName}
      />

      <TextInput
        style={styles.input}
        placeholder="Sets"
        value={sets}
        onChangeText={setSets}
        keyboardType="numeric"
      />

      <TextInput
        style={styles.input}
        placeholder="Reps"
        value={reps}
        onChangeText={setReps}
        keyboardType="numeric"
      />

      <TextInput
        style={styles.input}
        placeholder="Duration (minutes)"
        value={duration}
        onChangeText={setDuration}
        keyboardType="numeric"
      />

     <TextInput
        style={[styles.input, styles.notesInput]}
        placeholder="Notes (optional)"
        value={notes}
        onChangeText={setNotes}
        numberOfLines={3}
      />

      <Pressable style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveText}>Save Workout</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  notesInput: {
    minHeight: 42,
    textAlignVertical: "top",
  },
  saveButton: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  saveText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  backButton: {
    marginTop: 30,
    marginBottom: 10,
  },
  backText: {
    color: "#007AFF",
    fontSize: 16,
  },
});
