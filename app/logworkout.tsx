import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  FlatList,
  StyleSheet,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { saveWorkout } from "../src/services/apiClient";
import type { Workout, WorkoutExercise } from "../src/models/Workout";
import { sampleExercises } from "../src/models/Exercise";

export default function LogWorkout() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [durationMinutes, setDurationMinutes] = useState("");
  const [notes, setNotes] = useState("");
  const [selectedExercises, setSelectedExercises] = useState<WorkoutExercise[]>([]);
  const [search, setSearch] = useState("");
  const [filterGroup, setFilterGroup] = useState<string | null>(null);

  const filteredExercises = sampleExercises.filter((ex) => {
    const matchesSearch = ex.name.toLowerCase().includes(search.toLowerCase());
    const matchesGroup = filterGroup ? ex.category === filterGroup : true;
    return matchesSearch && matchesGroup;
  });

  const toggleExercise = (exerciseId: string) => {
    setSelectedExercises((prev) => {
      const exists = prev.find((ex) => ex.exerciseId === exerciseId);
      if (exists) return prev.filter((ex) => ex.exerciseId !== exerciseId);
      return [...prev, { exerciseId, sets: 3, reps: 10 }];
    });
  };

  const updateExercise = (exerciseId: string, field: "sets" | "reps", value: string) => {
    const num = parseInt(value, 10) || 0;
    setSelectedExercises((prev) =>
      prev.map((ex) =>
        ex.exerciseId === exerciseId ? { ...ex, [field]: num } : ex
      )
    );
  };

  const handleSaveWorkout = async () => {
    if (!name || !durationMinutes) {
      Alert.alert("Error", "Please enter a workout name and duration.");
      return;
    }
    if (selectedExercises.length === 0) {
      Alert.alert("Error", "Please select at least one exercise.");
      return;
    }

    const newWorkout: Workout = {
      id: Date.now().toString(),
      name,
      date: new Date().toISOString().split("T")[0],
      durationMinutes: parseInt(durationMinutes, 10),
      exercises: selectedExercises,
      notes: notes || undefined,
    };

    try {
      await saveWorkout(newWorkout);
      Alert.alert("Saved", "Workout logged successfully!");
      setName("");
      setDurationMinutes("");
      setNotes("");
      setSelectedExercises([]);
      setSearch("");
      setFilterGroup(null);
      router.back();
    } catch (err: any) {
      console.error("saveWorkout failed:", err);
      Alert.alert("Save failed", err?.message ?? "Unknown error");
    }
  };

  const renderExerciseItem = ({ item }: { item: typeof sampleExercises[0] }) => {
    const selected = selectedExercises.find((ex) => ex.exerciseId === item.id);

    return (
      <View style={styles.exerciseRow}>
        <Pressable
          style={[styles.exerciseItem, selected && styles.exerciseSelected]}
          onPress={() => toggleExercise(item.id)}
        >
          <Text style={{ fontSize: 16 }}>{item.name}</Text>
        </Pressable>

        {selected && (
          <View style={styles.setsRepsContainer}>
            <View style={styles.setsRepsInputWrapper}>
              <Text style={styles.setsRepsLabel}>Sets</Text>
              <TextInput
                style={styles.setsRepsInput}
                value={selected.sets?.toString() ?? "0"}
                onChangeText={(val) => updateExercise(item.id, "sets", val)}
                keyboardType="numeric"
                placeholder="0"
              />
            </View>

            <View style={styles.setsRepsInputWrapper}>
              <Text style={styles.setsRepsLabel}>Reps</Text>
              <TextInput
                style={styles.setsRepsInput}
                value={selected.reps?.toString() ?? "0"}
                onChangeText={(val) => updateExercise(item.id, "reps", val)}
                keyboardType="numeric"
                placeholder="0"
              />
            </View>
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backText}>← Back</Text>
      </Pressable>

      <Text style={styles.title}>Log a New Workout</Text>

      <TextInput
        style={styles.input}
        placeholder="Workout Name"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Duration (minutes)"
        value={durationMinutes}
        onChangeText={setDurationMinutes}
        keyboardType="numeric"
      />

      <TextInput
        style={[styles.input, { height: 80, marginBottom: 16 }]}
        placeholder="Optional notes"
        value={notes}
        onChangeText={setNotes}
        multiline
      />

      <TextInput
        style={[styles.input, { marginBottom: 10 }]}
        placeholder="Search exercises"
        value={search}
        onChangeText={setSearch}
      />

      <View style={{ flexDirection: "row", marginBottom: 10, flexWrap: "wrap" }}>
        {["Chest", "Back", "Legs", "Arms", "Core", "Shoulders", "Glutes"].map((group) => (
          <Pressable
            key={group}
            style={[
              styles.groupButton,
              filterGroup === group && styles.groupButtonSelected,
            ]}
            onPress={() => setFilterGroup(filterGroup === group ? null : group)}
          >
            <Text style={{ color: filterGroup === group ? "#fff" : "#007AFF" }}>
              {group}
            </Text>
          </Pressable>
        ))}
      </View>

      <FlatList
        data={filteredExercises}
        keyExtractor={(ex) => ex.id}
        renderItem={renderExerciseItem}
        contentContainerStyle={{ paddingBottom: 32 }}
      />

      <Pressable style={styles.saveButton} onPress={handleSaveWorkout}>
        <Text style={styles.saveText}>Save Workout</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f7f7f8" },
  title: { fontSize: 22, fontWeight: "700", marginBottom: 12 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 8,
    marginBottom: 10,
  },
  saveButton: {
    backgroundColor: "#007AFF",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 12,
  },
  saveText: { color: "#fff", fontWeight: "700" },
  exerciseRow: { marginBottom: 6 },
  exerciseItem: {
    padding: 10,
    borderRadius: 6,
    backgroundColor: "#fff",
  },
  exerciseSelected: { backgroundColor: "#d0f0fd" },
  setsRepsContainer: { flexDirection: "row", marginTop: 4, marginLeft: 10 },
  setsRepsInputWrapper: { marginRight: 12 },
  setsRepsLabel: { fontSize: 12, marginBottom: 2, fontWeight: "500" },
  setsRepsInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff",
    borderRadius: 6,
    padding: 4,
    width: 60,
  },
  backButton: { marginBottom: 5, marginTop: 30 },
  backText: { fontSize: 16, color: "#007AFF" },
  groupButton: {
    borderWidth: 1,
    borderColor: "#007AFF",
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginRight: 6,
    marginBottom: 6,
  },
  groupButtonSelected: { backgroundColor: "#007AFF" },
});
