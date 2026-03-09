import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen 
        name="homepage"
        options={{ headerShown: false }}
      />
    </Stack>
  );
}