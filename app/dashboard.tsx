import React from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';

const Dashboard = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dashboard</Text>
      <View style={styles.stats}>
        <Text>Total Workouts: 4</Text>
        <Text>Total Exercises: 28</Text>
      </View>
      <Button title="View Workout Log" onPress={() => Alert.alert('Navigate to Workout Log')} />
        {/* <NavButton label="Workout Log" onPress={() => router.push("/workoutlog")} /> */}
      <Button title="View Exercise Catalog" onPress={() => Alert.alert('Navigate to Exercise Catalog')} />
        {/* <NavButton label="Exercise Catalog" onPress={() => router.push("/exercisecatalog")} /> */}
        
        {/* later, use the useRouter() function to push these buttons and navigate the app back to  */}
        {/* /workoutlog and /exercisecatalog -- this info is in index.tsx !! */}
    </View>
  );
};


const styles = StyleSheet.create({
    container: { flex: 1, padding: 24, justifyContent: "center", alignItems: "center", backgroundColor: "#ffffff" },
    title: { fontSize: 36, fontWeight: "800", marginBottom: 8 },
    subtitle: { fontSize: 14, color: "#666", marginBottom: 28 },
    footer: { position: "absolute", bottom: 20, alignItems: "center" },
    small: { fontSize: 12, color: "#999" },
    stats: { fontSize: 16, padding: 24, alignItems: "center"}
});

export default Dashboard;
