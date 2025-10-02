import React from "react";
import { View, Text, StyleSheet } from "react-native";
import type { Exercise } from "../models/Exercise";

export default function ExerciseCard({ exercise }: { exercise: Exercise }) {
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <Text style={styles.name}>{exercise.name}</Text>
        <Text style={styles.category}>{exercise.category}</Text>
      </View>
      {exercise.description ? <Text style={styles.desc}>{exercise.description}</Text> : null}
      {exercise.equipment ? <Text style={styles.equip}>Equipment: {exercise.equipment}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: "#f7f8fa", padding: 12, borderRadius: 10, marginBottom: 10 },
  row: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  name: { fontSize: 16, fontWeight: "600" },
  category: { fontSize: 12, color: "#666" },
  desc: { marginTop: 8, fontSize: 13, color: "#444" },
  equip: { marginTop: 6, fontSize: 12, color: "#666" },
});
