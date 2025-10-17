import React, { useEffect, useState, useRef } from "react";
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Pressable, Animated, Alert} from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { format, differenceInCalendarDays } from "date-fns"; // install date-fns if needed
import * as Progress from 'react-native-progress';  // Import progress bar

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
  const [showCongrats, setShowCongrats] = useState(false);
  const router = useRouter();

  const scale1 = useRef(new Animated.Value(1)).current;
  const scale2 = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const checkStreak = async () => {
      try {
        const lastDate = await AsyncStorage.getItem("lastWorkoutDate");
        const today = format(new Date(), "yyyy-MM-dd");
  
        if (!lastDate) {
          // First time logging in — initialize
          await AsyncStorage.setItem("lastWorkoutDate", today);
          await AsyncStorage.setItem("streak", "1");
          setStreak(1);
          return;
        }
  
        const daysSince = differenceInCalendarDays(new Date(today), new Date(lastDate));
  
        if (daysSince === 0) {
          // Already logged today
          const savedStreak = await AsyncStorage.getItem("streak");
          setStreak(Number(savedStreak ?? 1));
        } else if (daysSince === 1) {
          // Logged yesterday, increase streak
          const savedStreak = Number(await AsyncStorage.getItem("streak") || 1);
          const newStreak = savedStreak + 1;
          await AsyncStorage.setItem("streak", newStreak.toString());
          await AsyncStorage.setItem("lastWorkoutDate", today);
          setStreak(newStreak);
        } else {
          // Missed a day — reset
          await AsyncStorage.setItem("streak", "1");
          await AsyncStorage.setItem("lastWorkoutDate", today);
          setStreak(1);
        }
      } catch (err) {
        console.error("Failed to check streak:", err);
        setStreak(0); // fallback
      }
  
      // Random quote
      const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
      setQuote(randomQuote);
    };
    checkStreak();
  }, []);
  
    // Trigger congratulatory message on 7-day streak
    useEffect(() => {
      if (streak === 7 && !showCongrats) {
        setShowCongrats(true);
        Alert.alert("🎉 Congrats!", "Congrats on your one-week streak!");
      }
    }, [streak, showCongrats]);


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
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>GitFit</Text>
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
        onPress={() => router.push("/logworkout")}
      >
        <Text style={styles.buttonText}>Log Workout</Text>
      </Pressable>

      <Pressable
        style={styles.button}
        onPress={() => router.push("/workoutlog")}
      >
        <Text style={styles.buttonText}>Workout History</Text>
      </Pressable>

      <Pressable
        style={styles.button}
        onPress={() => router.push("/exercisecatalog")}
      >
        <Text style={styles.buttonText}>Exercise Catalog</Text>
      </Pressable>
    </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
      padding: 20,
      backgroundColor: "#fff",
      flexGrow: 1,
    },
    title: {
        fontSize: 28,
        fontWeight: "800",
        textAlign: "center",
        marginBottom: 2,     
      },
      header: {
        fontSize: 18,        
        fontWeight: "400",   
        textAlign: "center",
        marginBottom: 12,    
        color: "#555",       
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