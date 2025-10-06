import React, { useMemo, useState } from "react";
import { View, Text, TextInput, FlatList, StyleSheet, Pressable } from "react-native";
import ExerciseCard from "../src/components/ExerciseCard";
import { sampleExercises } from "../src/models/Exercise";
import { useRouter } from "expo-router";

export default function ExerciseCatalog() {
  const [query, setQuery] = useState<string>("");
  const router = useRouter();

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return sampleExercises;
    return sampleExercises.filter(
      (e) => e.name.toLowerCase().includes(q) || e.category.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <View style={styles.container}>

      <Pressable style={styles.backButton} onPress={() => router.back()}>
              <Text style={styles.backText}>← Back</Text>
            </Pressable>
      <Text style={styles.title}>Exercise Catalog</Text>

      <TextInput
        style={styles.search}
        placeholder="Search exercises or categories..."
        value={query}
        onChangeText={setQuery}
        autoCapitalize="none"
      />

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ExerciseCard exercise={item} />}
        contentContainerStyle={{ paddingBottom: 32 }}
      />

      {filtered.length === 0 && <Text style={styles.empty}>No exercises match “{query}”</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
     flex: 1, 
     backgroundColor: "#fff", 
     padding: 16 
    },
  title: { 
    fontSize: 24, 
    fontWeight: "700", 
    marginBottom: 12 
  },
  search: { 
    backgroundColor: "#f2f2f4", 
    padding: 10, 
    borderRadius: 8, 
    marginBottom: 12 
  },
  empty: { textAlign: "center", marginTop: 20, color: "#777" },
  backButton: { 
    marginBottom: 5,
    marginTop: 30,
  },
  backText: { 
    fontSize: 16, 
    color: "#007AFF" 
  },
});
