import { StatusBarBackground } from '@/components';
import { ThemeContext } from '@/context/useThemeContext';
import { Stack, usePathname } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { NativeBaseProvider } from 'native-base';
import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [currentTheme, setCurrentTheme] = useState<'light' | 'dark'>('light')
  const pathname = usePathname();
  const loaded = true;
  const error = false;

  useEffect(() => {
    if (error) {
      throw new Error('Throw future errors from here');
    }
  }, [error])

  useEffect(() => {
    // Hide splash screen on future asset loads from here.
    if (loaded && pathname !== '/') {
      SplashScreen.hideAsync();
    }
  }, [loaded, pathname]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeContext.Provider value={{ currentTheme, setCurrentTheme }}>
      <NativeBaseProvider>
        <SafeAreaProvider>
          <View style={{ flex: 1 }}>
            <StatusBarBackground />
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="(tabs)" />
            </Stack>
          </View>
        </SafeAreaProvider>
      </NativeBaseProvider>
    </ThemeContext.Provider>
  )
}
