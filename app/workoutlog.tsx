import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, Pressable, Alert, ActivityIndicator } from "react-native";
import type { Workout } from "../src/models/Workout";
import { sampleWorkouts } from "../src/models/Workout";
import { fetchWorkouts, saveWorkout } from "../src/services/apiClient";
// useIsFocused from react-navigation (more reliable)
import { useRouter } from "expo-router";
import { useIsFocused } from "@react-navigation/native";

export default function WorkoutLog() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const isFocused = useIsFocused(); // added

  useEffect(() => {
    let mounted = true;
    setLoading(true);

    fetchWorkouts()
      .then((data) => {
        if (!mounted) return;
        setWorkouts(Array.isArray(data) ? data : sampleWorkouts);
        setError(null);
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
  }, [isFocused]); // refetch when screen focused

  const renderItem = ({ item }: { item: Workout }) => {
  // Format the ISO date to something nice like "Oct 16, 2025"
  const formattedDate = new Date(item.date).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <Pressable
      style={styles.card}
      onPress={() =>
        Alert.alert(
          "Workout Details",
          `Date: ${formattedDate}\nExercises: ${item.exercises.length}\nNotes: ${item.notes ?? "—"}`
        )
      }
    >
      <Text style={styles.date}>{formattedDate}</Text>
      <Text style={styles.meta}>
        {item.exercises.length} exercises • {item.durationMinutes ?? "—"} min
      </Text>
    </Pressable>
  );
};


  const handleSaveWorkout = async (workout: Workout) => {
    try {
      const saved = await saveWorkout(workout);
      // update UI immediately so history shows new item
      setWorkouts((prev) => [saved, ...prev]);
      Alert.alert("Saved", "Workout logged.");
    } catch (err: any) {
      console.error("saveWorkout failed:", err);
      Alert.alert("Save failed", err?.message ?? "Unknown error");
    }
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
