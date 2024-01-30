import { StatusBarBackground } from '@/components';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { createContext, useContext, useEffect } from 'react';
import { View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { UserProvider, useUser } from '@/context/userProvider';
import { ThemeProvider } from '@/context/themeProvider';
import { Asset, useAssets } from 'expo-asset';
export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

SplashScreen.preventAutoHideAsync();

const AssetContext = createContext<{ uris: string[], loadedAssets: boolean; errorAssets: boolean } | undefined>(undefined);

export const useLoadedAssets = () => {
  const context = useContext(AssetContext);
  if (context === undefined) {
    throw new Error('useLoadedAssets must be used within a AssetProvider');
  }
  return context;
}

export const AssetProvider = ({ children }: { children: React.ReactNode }) => {
  const [assets, error] = useAssets(require('../assets/pfpfallback.jpeg'));
  const value = {
    uris: assets?.map(asset => asset.uri) ?? [],
    loadedAssets: !!assets,
    errorAssets: !!error
  }
  return (
    <AssetContext.Provider value={value}>
      {children}
    </AssetContext.Provider>
  )
}

const RootStack = () => {
  const { loadedAuth } = useUser();
  const { loadedAssets, errorAssets } = useLoadedAssets();
  const loaded = loadedAuth && loadedAssets;
  const error = errorAssets;

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
        <Stack.Screen name='placeholder' />
        <Stack.Screen name='(tabs)' options={{ animation: 'none' }} />
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
          <AssetProvider>
            <RootStack />
          </AssetProvider>
        </UserProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  )
}

export default RootLayout;
