import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import NavButton from "../src/components/NavButton";

export default function Dashboard() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>GitFit</Text>
      <Text style={styles.subtitle}>Track workouts · Browse exercises</Text>

      <NavButton label="Workout Log" onPress={() => router.push("/workoutlog")} />
      <NavButton label="Exercise Catalog" onPress={() => router.push("/exercisecatalog")} />

      <View style={styles.footer}>
        <Text style={styles.small}>Built with Expo • SDK 54</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: "center", alignItems: "center", backgroundColor: "#ffffff" },
  title: { fontSize: 36, fontWeight: "800", marginBottom: 8 },
  subtitle: { fontSize: 14, color: "#666", marginBottom: 28 },
  footer: { position: "absolute", bottom: 20, alignItems: "center" },
  small: { fontSize: 12, color: "#999" },
});
