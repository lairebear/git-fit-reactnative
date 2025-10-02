// app/myJsScreen.js
import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { fetchWorkouts, ping } from "../src/services/apiClient";

export default function MyJsScreen({ navigation }) {
  const [pong, setPong] = useState(null);

  useEffect(() => {
    ping().then(setPong).catch(console.warn);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>JS Screen</Text>
      <Text>Ping result: {pong ? JSON.stringify(pong) : "loading..."}</Text>
      <Button title="Refresh" onPress={() => fetchWorkouts().then(w => console.log(w)).catch(console.warn)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center", padding: 16 },
  title: { fontSize: 20, fontWeight: "700", marginBottom: 8 },
});
