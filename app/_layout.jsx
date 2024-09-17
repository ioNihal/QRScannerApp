import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'QR Scanner' }} />
      <Stack.Screen name="Profile" options={{ title: 'Verify User' }} />
    </Stack>
  );
}
