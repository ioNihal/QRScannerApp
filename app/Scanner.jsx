import React, { useState, useEffect } from 'react';
import { View, Button, StyleSheet, Alert, Text } from 'react-native';
import { CameraView, Camera } from "expo-camera";
import { useRouter } from 'expo-router';

export default function Scanner() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getCameraPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    if (type === 256 || type === "qr") {
      setScanned(true);
      console.log('Scanned QR Code Data:', data , ' TYPE: ' , type);
      router.push({
        pathname:'/Profile' ,
        params: { qrhash: data },
      })
    } else {
      Alert.alert('Not a QR Code', `Scanned type: ${type}`);
    }
  };

  if (hasPermission === null) {
    return <View><Text>Requesting camera permission</Text></View>;
  }
  if (hasPermission === false) {
    return <View><Text>No access to camera</Text></View>;
  }

  return (
    <View style={styles.container}>
      <CameraView
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned }
        barcodeScannerSettings={{
          barcodeTypes: ["qr", 256],
        }}
        style={styles.cam}
      />
      {scanned && (
        <Button title={"Tap to Scan Again"} onPress={() => setScanned(false)} />
      )}
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cam: {
    height: 350,
    width: 350,
    marginBottom: 200,
  }
});
