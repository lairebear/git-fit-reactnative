import React, { useEffect, useState, useRef } from "react";
import { View, Text, StyleSheet, ScrollView, Pressable, Animated } from "react-native";
import { useRouter } from "expo-router";

const quotes = [
  "Discipline is the greatest form of self-love.",
  "The body achieves what the mind believes.",
  "Don’t stop when you’re tired; stop when you’re done.",
  "Consistency is what transforms average into excellence.",
  "Fall in love with the process, not just the results."
];

export default function Dashboard() {
  const [streak, setStreak] = useState(0);
  const [quote, setQuote] = useState("");
  const router = useRouter();

  const scale1 = useRef(new Animated.Value(1)).current;
  const scale2 = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const savedStreak = 67;
    setStreak(savedStreak);

    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setQuote(randomQuote);
  }, []);

  const animatePressIn = (scale: Animated.Value) => {
    Animated.spring(scale, {
      toValue: 0.95,
      useNativeDriver: true,
      speed: 50,
      bounciness: 0,
    }).start();
  };

  const animatePressOut = (scale: Animated.Value) => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      speed: 50,
      bounciness: 5,
    }).start();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Dashboard</Text>

      {/* streak card */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>🔥 Streak</Text>
        <Text style={styles.streakText}>{streak} days in a row!</Text>
      </View>

      {/* motivational quote card */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>💡 Motivation</Text>
        <Text style={styles.quoteText}>"{quote}"</Text>
      </View>

      {/* navigation buttons */}
      <Pressable
        style={styles.button}
        onPress={() => router.push("/workoutlog")}
      >
        <Text style={styles.buttonText}>Log Workout</Text>
      </Pressable>

      <Pressable
        style={styles.button}
        onPress={() => router.push("/exercisecatalog")}
      >
        <Text style={styles.buttonText}>Exercise Catalog</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
    container: {
      padding: 20,
      backgroundColor: "#fff",
      flexGrow: 1,
    },
    header: {
      padding: 40,
      fontSize: 28,
      fontWeight: "700",
      marginBottom: 5,
      textAlign: "center",
    },
    card: {
      padding: 20,
      borderRadius: 12,
      backgroundColor: "#f2f2f2",
      marginBottom: 16,
    },
    cardTitle: {
      fontSize: 18,
      fontWeight: "600",
      marginBottom: 10,
    },
    streakText: {
      fontSize: 22,
      fontWeight: "bold",
      color: "#e67e22",
    },
    quoteText: {
      fontSize: 16,
      fontStyle: "italic",
      color: "#555",
    },
    button: {
      backgroundColor: "#0284c7",
      padding: 16,
      borderRadius: 12,
      marginBottom: 16,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 6,
      elevation: 5, // android shadow
    },
    buttonPressed: {
      backgroundColor: "#0369a1", // button color darkens when pressed
    },
    buttonText: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "600",
    },
  });