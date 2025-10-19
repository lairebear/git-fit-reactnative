import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, Pressable, ActivityIndicator } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { fetchWorkouts } from "../../src/services/apiClient";
import { sampleWorkouts } from "../../src/models/Workout";
import type { Workout, WorkoutExercise } from "../../src/models/Workout";
import { sampleExercises } from "../../src/models/Exercise";

export default function WorkoutsByDate() {
  const router = useRouter();
  const { date } = useLocalSearchParams();
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    fetchWorkouts()
      .then((data) => {
        if (!mounted) return;
        const all = Array.isArray(data) ? data : sampleWorkouts;
        const filtered = all.filter((w) => w.date === date);
        setWorkouts(filtered);
      })
      .catch(() => {
        const filtered = sampleWorkouts.filter((w) => w.date === date);
        setWorkouts(filtered);
      })
      .finally(() => {
        if (!mounted) return;
        setLoading(false);
      });

    return () => { mounted = false; };
  }, [date]);

  const getExerciseById = (id: string) => sampleExercises.find((ex) => ex.id === id);

  const formatDate = (d: string) => {
    const dt = new Date(d);
    return dt.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" />
        <Text style={{ marginTop: 12 }}>Loading workouts for {date}…</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Pressable style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backText}>← Back</Text>
      </Pressable>

      <Text style={styles.title}>Workouts on {date ? formatDate(date as string) : "—"}</Text>

      {workouts.length === 0 ? (
        <Text style={styles.empty}>No workouts found for this date.</Text>
      ) : (
        <FlatList
          data={workouts}
          keyExtractor={(w) => w.id}
          renderItem={({ item: workout }) => (
            <View style={styles.card}>
              <Text style={styles.workoutTitle}>
                {workout.name ?? "Workout"} • {workout.durationMinutes ?? 0} min
              </Text>

              <FlatList
                data={workout.exercises}
                keyExtractor={(ex) => ex.exerciseId}
                renderItem={({ item: ex }) => {
                  const exercise = getExerciseById(ex.exerciseId);
                  return (
                    <View style={styles.exerciseRow}>
                      <Text style={styles.bullet}>•</Text>
                      <View style={styles.exerciseInfo}>
                        <Text style={styles.exerciseName}>
                          {exercise?.name ?? "Exercise"} ({ex.sets ?? 0} sets × {ex.reps ?? 0} reps)
                        </Text>
                      </View>
                    </View>
                  );
                }}
              />

              {workout.notes ? <Text style={styles.notes}>💬 {workout.notes}</Text> : null}
            </View>
          )}
          contentContainerStyle={{ paddingBottom: 32 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f7f7f8", padding: 16 },
  center: { justifyContent: "center", alignItems: "center" },
  backButton: { marginBottom: 5, marginTop: 30 },
  backText: { fontSize: 16, color: "#007AFF" },
  title: { fontSize: 22, fontWeight: "700", marginBottom: 15 },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  workoutTitle: { fontSize: 18, fontWeight: "600", marginBottom: 8 },
  exerciseRow: { flexDirection: "row", alignItems: "flex-start", marginBottom: 6 },
  bullet: { fontSize: 16, marginRight: 6 },
  exerciseInfo: { flex: 1 },
  exerciseName: { fontSize: 16 },
  notes: { fontSize: 14, color: "#333", marginTop: 8, fontStyle: "italic" },
  empty: { marginTop: 20, textAlign: "center", color: "#777" },
});
