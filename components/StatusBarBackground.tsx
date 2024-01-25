import { theme } from '@/constants/constants';
import { useThemeContext } from '@/context/useThemeContext';
import { BlurView } from '@react-native-community/blur';
import { usePathname } from 'expo-router';
import * as StatusBar from 'expo-status-bar';
import React, { useEffect } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const FALLBACK_COLOR = 'rgba(140, 140, 140, 0.3)'

const StatusBarBackground = (): React.ReactElement | null => {
    const { currentTheme } = useThemeContext();
    const pathname = usePathname();
    const insets = useSafeAreaInsets();
    if (Platform.OS != 'ios') return null;
    useEffect(() => {
        StatusBar.setStatusBarStyle(currentTheme === 'dark' ? 'light' : 'dark');
    }, [currentTheme]);
    return (
        <>
            {pathname !== '/create'
                ? (
                    <View
                        style={[styles.statusBarBackground, {
                            height: insets.top,
                            backgroundColor: theme[currentTheme].primary
                        }]}
                    />
                ) : <BlurView
                    style={[styles.statusBarBackground, { height: insets.top }]}
                    blurAmount={25}
                    blurType="light"
                    reducedTransparencyFallbackColor={FALLBACK_COLOR}
                />
            }
        </>

    )
}

export default StatusBarBackground;

const styles = StyleSheet.create({
    statusBarBackground: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10
    },
})