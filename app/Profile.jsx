import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

export default function Profile() {
  const params = useLocalSearchParams();
  const [userData, setUserData] = useState(null);
  const qrhash = params.qrhash;
  const router = useRouter();
  console.log('QR Data received in Profile:', qrhash);

  useEffect(() => {
    if (!qrhash) {
      Alert.alert('Error', 'No QR data provided');
      return;
    }

    const fetchUserData = async () => {
      try {
        console.log(qrhash);
        const response = await fetch('https://icis.dunite.tech/api/validate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            qrhash: qrhash
          }),
        }
        );

        if (!response.ok) {
          const text = await response.text();
          console.error('Error fetching user data:', text);
          Alert.alert('Error fetching user data:', text);
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
  }, [qrhash]);

  /*const handleInOut = async (action) => {
    try {
      const response = await fetch('http://192.168.14.83:3000/mark-in-out', {
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
  */

  if (!userData) {
    return <View><Text>Loading...</Text></View>;
  }

  return (
    <View style={styles.container}>
      {console.log(JSON.stringify(userData))}
      <View style={styles.resCon}>
        <Text style={userData.success === "true" ? styles.titleR : styles.titleG }>USER DATA</Text>
        <Text style={styles.response}> SUCCESS: {userData.success} </Text>
        <Text style={styles.response}> STATUS: {userData.status} </Text>
        <Text style={styles.response}> MESSAGE: {userData.message} </Text>
        <Text style={styles.response}> REGISTER NO: {userData.sregno} </Text>
        <Text style={styles.response}> NAME: {userData.sname} </Text>
        <Text style={styles.response}> BATCH: {userData.sbatch} </Text>
        <Text style={styles.response}> TICKET ID: {userData.sticketno} </Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button title="New Scan" onPress={() => router.push('/')} />
      </View>
      {/*
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
      */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  titleG: {
    fontSize: 24,
    marginBottom: 20,
    color: '#00ff00',
  },
  titleR: {
    fontSize: 24,
    marginBottom: 20,
    color: '#ff0000',
  },
  resCon: {
    backgroundColor: 'rgb(23,23,22)',
    borderRadius: 5,
    padding: 10,
  },
  buttonContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  response: {
    fontSize: 20,
    textAlign: 'justified',
    color: 'white',
  }
});
