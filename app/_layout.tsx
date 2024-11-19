import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: '' , headerStyle: { backgroundColor: '#C2B8B4' },}} />
      <Stack.Screen name="about" options={{ title: '' }} />
      <Stack.Screen name="scoreBoard" options={{title:''}}/>
    </Stack>
  );
}
