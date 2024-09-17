import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function Index() {
  const router = useRouter();

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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});
