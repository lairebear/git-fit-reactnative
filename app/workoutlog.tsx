import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, Pressable, Alert, ActivityIndicator } from "react-native";
import type { Workout } from "../src/models/Workout";
import { sampleWorkouts } from "../src/models/Workout";
import { fetchWorkouts } from "../src/services/apiClient";
import { useRouter } from "expo-router";

export default function WorkoutLog() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    let mounted = true;

    // attempt to fetch from backend; if it fails, fall back to sampleWorkouts
    fetchWorkouts()
      .then((data) => {
        if (!mounted) return;
        setWorkouts(Array.isArray(data) ? data : sampleWorkouts);
      })
      .catch((err) => {
        console.warn("fetchWorkouts error:", err);
        if (!mounted) return;
        setError("Unable to load workouts (using sample data).");
        setWorkouts(sampleWorkouts);
      })
      .finally(() => {
        if (!mounted) return;
        setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  const renderItem = ({ item }: { item: Workout }) => {
    return (
      <Pressable
        style={styles.card}
        onPress={() =>
          Alert.alert(
            "Workout Details",
            `Date: ${item.date}\nExercises: ${item.exercises.length}\nNotes: ${item.notes ?? "—"}`
          )
        }
      >
        <Text style={styles.date}>{item.date}</Text>
        <Text style={styles.meta}>{item.exercises.length} exercises • {item.durationMinutes ?? "—"} min</Text>
      </Pressable>
    );
  };

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

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <FlatList
        data={workouts}
        keyExtractor={(w) => w.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 32 }}
      />

      {workouts.length === 0 && <Text style={styles.empty}>No workouts yet — start one from the Dashboard!</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#f7f7f8", 
    padding: 16
  },
  center: { 
    justifyContent: "center", 
    alignItems: "center" 
  },
  title: { 
    marginTop: 15,
    fontSize: 24, 
    fontWeight: "700",
  },
  card: { 
    backgroundColor: "#fff", 
    padding: 16, 
    borderRadius: 10, 
    marginBottom: 12, 
    elevation: 2 
  },
  date: { 
    fontSize: 18, 
    fontWeight: "600" 
  },
  meta: { 
    fontSize: 13, 
    color: "#666", 
    marginTop: 6 },
  empty: { 
    marginTop: 20, 
    textAlign: "center", 
    color: "#777" 
  },
  error: { 
    color: "#b00020", 
    marginBottom: 8 
  },
  backButton: { 
    marginBottom: 5,
    marginTop: 30,
  },
  backText: { 
    fontSize: 16, 
    color: "#007AFF" 
  },
});
