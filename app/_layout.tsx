import { StatusBarBackground } from '@/components';
import { ThemeContext } from '@/context/useThemeContext';
import { UserContext } from '@/context/useUserContext';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { NativeBaseProvider } from 'native-base';
import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { User } from 'firebase/auth';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [currentTheme, setCurrentTheme] = useState<'light' | 'dark'>('dark')
  const [userAuth, setUserAuth] = useState<User | null | 'initial'>('initial')
  const [userDoc, setUserDoc] = useState(null);
  const error = false;

  useEffect(() => {
    if (error) {
      throw new Error('Throw future errors from here');
    }
  }, [error])

  useEffect(() => {
    setUserAuth(null);
  }, []);

  useEffect(() => {
    // Hide splash screen on future asset loads from here.
    if (userAuth !== 'initial') {
      SplashScreen.hideAsync();
    }
  }, [userAuth]);

  return (
    <ThemeContext.Provider value={{ currentTheme, setCurrentTheme }}>
      <NativeBaseProvider>
        <SafeAreaProvider>
          <UserContext.Provider value={{ userAuth, userDoc }}>
            <View style={{ flex: 1 }}>
              <StatusBarBackground />
              <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name='index' />
                <Stack.Screen name='(tabs)' />
                <Stack.Screen name='(auth)' options={{ animation: 'none' }} />
              </Stack>
            </View>
          </UserContext.Provider>
        </SafeAreaProvider>
      </NativeBaseProvider>
    </ThemeContext.Provider>
  )
}
