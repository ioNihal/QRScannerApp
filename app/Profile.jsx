import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

export default function Profile() {
  const params = useLocalSearchParams();
  const [userData, setUserData] = useState(null);
  const qrData = params.qrData;
  const router = useRouter();
  console.log('QR Data received in Profile:', qrData);

  useEffect(() => {
    if (!qrData) {
      Alert.alert('Error', 'No QR data provided');
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://192.168.157.83:3000/get-user?qrData=${encodeURIComponent(qrData)}`);
        
        if (!response.ok) {
          const text = await response.text();
          console.error('Error fetching user data:', text);
          Alert.alert('Error', 'Failed to fetch user data. Please check your server.');
          return;
        }

        const data = await response.json();
        setUserData(data);
      } catch (error) {
        Alert.alert('Error', 'Failed to fetch user data');
        console.error(error);
      }
    };

    fetchUserData();
  }, [qrData]);

  const handleInOut = async (action) => {
    try {
      const response = await fetch('http://192.168.157.83:3000/mark-in-out', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          qrData: qrData,
          action: action,
        }),
      });

      const result = await response.json();

      if (result.success) {
        Alert.alert(`Marked ${action} successfully`);
        setUserData(prev => ({ ...prev, status: action.toUpperCase() }));
      } else {
        Alert.alert(result.message);
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong');
      console.error(error);
    }
  };

  if (!userData) {
    return <View><Text>Loading...</Text></View>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Profile</Text>
      <Text>Name: {userData.name}</Text>
      <Text>Register Number: {userData.registerNo}</Text>
      <Text>Status: {userData.status || 'N/A'}</Text>
      <Text>In Time: {userData.inTime ? new Date(userData.inTime).toLocaleString() : 'N/A'}</Text>
      <Text>Out Time: {userData.outTime ? new Date(userData.outTime).toLocaleString() : 'N/A'}</Text>
      <View style={styles.buttonContainer}>
        <Button title="Mark In" onPress={() => handleInOut('in')} />
        <Button title="Mark Out" onPress={() => handleInOut('out')} />
        <Button title="New Scan" onPress={() => router.push('/')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  buttonContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
});
