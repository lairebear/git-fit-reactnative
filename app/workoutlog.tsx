import React, { useEffect, useState, useMemo } from "react";
import { View, Text, FlatList, StyleSheet, Pressable, ActivityIndicator } from "react-native";
import type { Workout } from "../src/models/Workout";
import { sampleWorkouts } from "../src/models/Workout";
import { fetchWorkouts } from "../src/services/apiClient";
import { useRouter } from "expo-router";

export default function WorkoutLog() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetchWorkouts()
      .then((data) => setWorkouts(Array.isArray(data) ? data : sampleWorkouts))
      .catch((err) => {
        console.warn("fetchWorkouts error:", err);
        setError("Unable to load workouts (using sample data).");
        setWorkouts(sampleWorkouts);
      })
      .finally(() => setLoading(false));
  }, []);

  const grouped = useMemo(() => {
    return workouts.reduce((groups, workout) => {
      const date = workout.date;
      if (!groups[date]) groups[date] = [];
      groups[date].push(workout);
      return groups;
    }, {} as Record<string, Workout[]>);
  }, [workouts]);

  const workoutDates = Object.entries(grouped); // [["2025-10-15", [workouts]], ...]

  if (loading) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" />
        <Text style={{ marginTop: 12 }}>Loading workouts…</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Pressable style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backText}>← Back</Text>
      </Pressable>

      <Text style={styles.title}>Workout History</Text>
      {error && <Text style={styles.error}>{error}</Text>}

      <FlatList
        data={workoutDates}
        keyExtractor={([date]) => date}
        renderItem={({ item: [date, dayWorkouts] }) => (
          <Pressable
            style={styles.card}
            onPress={() => router.push(`/workouthistory/${date}`)}
          >
            <Text style={styles.date}>{date}</Text>
            <Text style={styles.meta}>{dayWorkouts.length} workouts logged</Text>
          </Pressable>
        )}
      />

      {workouts.length === 0 && (
        <Text style={styles.empty}>No workouts yet — start one from the Dashboard!</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f7f7f8", padding: 16 },
  center: { justifyContent: "center", alignItems: "center" },
  title: { marginTop: 15, fontSize: 24, fontWeight: "700" },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    elevation: 2,
  },
  date: { fontSize: 18, fontWeight: "600" },
  meta: { fontSize: 13, color: "#666", marginTop: 6 },
  empty: { marginTop: 20, textAlign: "center", color: "#777" },
  error: { color: "#b00020", marginBottom: 8 },
  backButton: { marginBottom: 5, marginTop: 30 },
  backText: { fontSize: 16, color: "#007AFF" },
});
