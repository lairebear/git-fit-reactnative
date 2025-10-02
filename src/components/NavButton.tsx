import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";

export default function NavButton({ label, onPress }: { label: string; onPress: () => void }) {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: { backgroundColor: "#007AFF", paddingVertical: 14, paddingHorizontal: 28, borderRadius: 12, width: 260, alignItems: "center", marginVertical: 8 },
  text: { color: "#fff", fontWeight: "700", fontSize: 16 },
});
