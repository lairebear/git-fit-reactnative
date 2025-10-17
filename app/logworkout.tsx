import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Pressable, Alert } from "react-native";
import { useRouter } from "expo-router";
import { saveWorkout } from "../src/services/apiClient"; // added
import AsyncStorage from "@react-native-async-storage/async-storage";
import { format } from "date-fns";

export default function LogWorkout() {
  const router = useRouter();

  const [workoutName, setWorkoutName] = useState("");
  const [sets, setSets] = useState("");
  const [reps, setReps] = useState("");
  const [duration, setDuration] = useState("");
  const [saving, setSaving] = useState(false); // added
  const [notes, setNotes] = useState(""); // optional

const handleSave = async () => {
  if (!workoutName.trim()) {
    Alert.alert("Missing info", "Please enter a workout name.");
    return;
  }

  const payload = {
    date: new Date().toISOString(),
    exercises: [
      {
        exerciseId: "e1", // placeholder for now
        sets: Number(sets) || 0,
        reps: Number(reps) || 0,
      },
    ],
    notes: workoutName,
    durationMinutes: duration ? Number(duration) : undefined,
  };

  setSaving(true);
  try {
    const saved = await saveWorkout(payload);
    console.log("Saved workout:", saved);

    const today = format(new Date(), "yyyy-MM-dd");
    await AsyncStorage.setItem("lastWorkoutDate", today);

    Alert.alert("Success", "Workout logged.");
    router.push("/workoutlog"); // 👈 direct push instead of back
  } catch (err: any) {
    console.error("Save failed:", err);
    Alert.alert("Save failed", err?.message ?? "Unknown error");
  } finally {
    setSaving(false);
  }
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


      <Pressable style={styles.saveButton} onPress={handleSave} disabled={saving}>
        <Text style={styles.saveText}>{saving ? "Saving..." : "Save Workout"}</Text>
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
