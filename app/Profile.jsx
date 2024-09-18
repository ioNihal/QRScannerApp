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
          Alert.alert('Error fetching user data:', text , [{ text: 'OK', onPress: () => {
            console.log('OK Pressed');
            router.dismissAll();
            router.push('/Scanner');
             } }]);
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
      const response = await fetch('http://ip/mark-in-out', {
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
        <Text style={styles.title}>USER DATA</Text>
        {userData.regno ? (<Text style={styles.response}> REGISTER NO: {userData.regno} </Text>) : undefined}
        {userData.name ? (<Text style={styles.response}> NAME: {userData.name} </Text>) : undefined}
        {userData.batch ? (<Text style={styles.response}> BATCH: {userData.batch} </Text>) : undefined}
        {userData.ticket ? (<Text style={styles.response}> TICKET: {userData.ticket} </Text>) : undefined}
        <Text style={styles.success}> {userData.success === "true" ? "SUCCESS" : "FAILED"} </Text>
        <Text style={userData.message === "User already entered" ? styles.messageColR : styles.messageColG}> MESSAGE: {userData.message} </Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button title="New Scan" onPress={() => {
          router.dismissAll();
          router.push('/Scanner');
          
        }} />
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
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: 'white',
  },
  resCon: {
    backgroundColor: 'rgb(23,23,22)',
    borderRadius: 5,
    padding: 10,
  },
  messageColG: {
    color: '#00ff00',
    fontSize: 25,
    textAlign: 'justified',
    marginTop: 5,
  },
  messageColR: {
    color: '#ff0000',
    fontSize: 25,
    textAlign: 'justified',
    marginTop: 5,
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
  },
  success: {
    fontSize: 20,
    textAlign: 'justified',
    color: '#00ff00',
  }
});
