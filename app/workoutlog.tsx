// app/workoutlog.tsx
import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Pressable, StyleSheet, ActivityIndicator, Alert } from "react-native";
import { useRouter } from "expo-router";
import { useIsFocused } from "@react-navigation/native";
import { fetchWorkouts } from "../src/services/apiClient";
import { sampleWorkouts } from "../src/models/Workout";
import type { Workout } from "../src/models/Workout";

export default function WorkoutLog() {
  const router = useRouter();
  const isFocused = useIsFocused();

  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadWorkouts = () => {
    setLoading(true);
    fetchWorkouts()
      .then((data) => {
        setWorkouts(Array.isArray(data) ? data : sampleWorkouts);
        setError(null);
      })
      .catch(() => {
        setWorkouts(sampleWorkouts);
        setError("Unable to load workouts (using sample data).");
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => { loadWorkouts(); }, [isFocused]);

  const formatDate = (d: string) => new Date(d).toLocaleDateString(undefined, {
    year: "numeric", month: "short", day: "numeric"
  });

  const handleClearWorkouts = async () => {
    try {
      await fetch("http://10.110.35.124:4000/api/workouts", { method: "DELETE" });
      Alert.alert("Cleared", "All workouts have been deleted.");
      loadWorkouts();
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Failed to clear workouts.");
    }
  };

  const renderItem = ({ item }: { item: Workout }) => (
    <Pressable style={styles.card} onPress={() => router.push(`/workouthistory/${item.date}`)}>
      <Text style={styles.date}>{formatDate(item.date)}</Text>
      <Text style={styles.meta}>
        {item.exercises.length} exercises • {item.durationMinutes ?? 0} min
      </Text>
    </Pressable>
  );

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
        data={workouts}
        keyExtractor={(w) => w.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 32 }}
      />

      {workouts.length > 0 && (
        <Pressable style={styles.clearButton} onPress={handleClearWorkouts}>
          <Text style={styles.clearText}>Clear Workout History</Text>
        </Pressable>
      )}

      {workouts.length === 0 && (
        <Text style={styles.empty}>No workouts yet — start one from the Dashboard!</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f7f7f8" },
  center: { justifyContent: "center", alignItems: "center" },
  title: { fontSize: 22, fontWeight: "700", marginBottom: 12 },
  card: { backgroundColor: "#fff", padding: 16, borderRadius: 10, marginBottom: 12, elevation: 2 },
  date: { fontSize: 18, fontWeight: "600" },
  meta: { fontSize: 13, color: "#666", marginTop: 4 },
  empty: { textAlign: "center", color: "#777", marginTop: 20 },
  error: { color: "#b00020", marginBottom: 8 },
  backButton: { marginBottom: 5, marginTop: 30 },
  backText: { fontSize: 16, color: "#007AFF" },
  clearButton: { backgroundColor: "#ff3b30", padding: 10, borderRadius: 8, alignItems: "center", marginTop: 12 },
  clearText: { color: "#fff", fontWeight: "700" },
});
