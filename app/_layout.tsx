import { StatusBarBackground } from '@/components';
import { ThemeContext } from '@/context/useThemeContext';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [currentTheme, setCurrentTheme] = useState<'light' | 'dark'>('dark')
  const error = false;
  const loaded = true;

  useEffect(() => {
    if (error) {
      throw new Error('Throw future errors from here');
    }
  }, [error])

  useEffect(() => {
    // Hide splash screen on future asset loads from here.
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  return (
    <ThemeContext.Provider value={{ currentTheme, setCurrentTheme }}>
      <SafeAreaProvider>
        <View style={{ flex: 1 }}>
          <StatusBarBackground />
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name='index' />
            <Stack.Screen name='(tabs)' />
            <Stack.Screen name='(auth)' options={{ animation: 'none' }} />
          </Stack>
        </View>
      </SafeAreaProvider>
    </ThemeContext.Provider>
  )
}
