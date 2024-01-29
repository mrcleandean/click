import { StatusBarBackground } from '@/components';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { UserProvider, useUser } from '@/context/userProvider';
import { ThemeProvider } from '@/context/themeProvider';
export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

SplashScreen.preventAutoHideAsync();

const RootStack = () => {
  const { loadingAuth } = useUser();
  const loaded = loadingAuth;
  const error = false;

  useEffect(() => {
    if (error) {
      throw new Error('Throw future errors from here');
    }
  }, [error]);

  useEffect(() => {
    if (loaded) {
      setTimeout(() => {
        SplashScreen.hideAsync();
      }, 100);
    }
  }, [loaded]);

  return (
    <View style={{ flex: 1 }}>
      <StatusBarBackground />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name='index' />
        <Stack.Screen name='(tabs)' />
        <Stack.Screen name='(auth)' options={{ animation: 'none' }} />
      </Stack>
    </View>
  )
}

const RootLayout = () => {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <UserProvider>
          <RootStack />
        </UserProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  )
}

export default RootLayout;
