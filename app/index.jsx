import React from 'react';
import { View, Button, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';

export default function Index() {
  const router = useRouter();

  const checkHealth = async () => {
    try {
      const response = await fetch('https://icis.dunite.tech/api/healthcheck');
      const data = await response.json();
      if (data.status === 'working') {
        // Show alert with "Status: Working"
        Alert.alert('Health Check', 'Status: Working', [{ text: 'OK', onPress: () => console.log('OK Pressed') }]);
      } else {
        Alert.alert('Health Check', 'Status: Not Working', [{ text: 'OK', onPress: () => console.log('OK Pressed') }]);
      }
    } catch (error) {
      Alert.alert('Health Check', 'Error: Unable to reach server', [{ text: 'OK', onPress: () => console.log('OK Pressed') }]);
      console.error(error);
    }
  }

  return (
    <View style={styles.container}>
      <Button
        title="Open Scanner" 
        onPress={() => router.push('/Scanner')} 
      />
      <Button 
        title="About Us" 
        onPress={() => router.push('/About')} 
      />
      <Button title="Check Status" onPress={checkHealth} />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
