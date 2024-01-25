import { ThemeContext } from '@/context/useThemeContext';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [currentTheme, setCurrentTheme] = useState<'light' | 'dark'>('light')
  const loaded = true;
  const error = false;

  useEffect(() => {
    if (error) {
      throw new Error('Throw future errors from here');
    }
  }, [error])

  useEffect(() => {
    // Hide splash screen on future asset loads from here.
    SplashScreen.hideAsync();
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeContext.Provider value={{ currentTheme, setCurrentTheme }}>
      <SafeAreaProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </SafeAreaProvider>
    </ThemeContext.Provider>
  )
}
