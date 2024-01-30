import React, { useEffect, useState } from 'react';
import { Tabs, router, usePathname } from 'expo-router';
import { FontAwesome5, Feather } from '@expo/vector-icons';
import { headerHeight, tabBarHeight, theme } from '@/constants/constants';
import { useThemeContext } from '@/context/themeProvider';
import { Pressable, View } from 'react-native';

export default function TabLayout() {
  const [activeRoute, setActiveRoute] = useState<'globe' | 'create' | 'profile'>('globe');
  const { currentTheme } = useThemeContext();
  const pathname = usePathname();

  useEffect(() => {
    switch (pathname) {
      case '/':
        setActiveRoute('globe');
        break;
      case '/create':
        setActiveRoute('create');
        break;
      case '/profile':
        setActiveRoute('profile');
        break;
    }
  }, [pathname]);
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          shadowColor: theme[currentTheme].lowColor,
          shadowRadius: 3,
          shadowOffset: {
            width: 0,
            height: -0.5
          },
          shadowOpacity: 1,
          backgroundColor: theme[currentTheme].primary,
          height: tabBarHeight,
          position: pathname === '/create' ? 'absolute' : 'relative',
          opacity: pathname === '/create' ? (currentTheme === 'dark' ? 0.7 : 0.8) : 1,
        },
        tabBarShowLabel: false
      }}>
      <Tabs.Screen
        name="globe"
        options={{
          tabBarIcon: () => <FontAwesome5 name="globe-americas" size={24} color={activeRoute === 'globe' ? theme[currentTheme].highColor : theme[currentTheme].lowColor} />,
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          tabBarIcon: () => <Feather name="plus-square" size={24} color={activeRoute === 'create' ? theme[currentTheme].highColor : theme[currentTheme].lowColor} />
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: () => <Feather name="user" size={24} color={activeRoute === 'profile' ? theme[currentTheme].highColor : theme[currentTheme].lowColor} />,
          headerShown: true,
          headerStyle: {
            backgroundColor: theme[currentTheme].primary,
            borderBottomColor: theme[currentTheme].highColor,
            borderBottomWidth: 1,
            height: headerHeight
          },
          headerTitleStyle: {
            color: theme[currentTheme].highColor
          },
          headerTitle: 'deankadri',
          headerLeft: () => {
            return (
              <Pressable className='ml-3' onPress={() => router.back()}>
                <Feather name="chevron-left" size={28.5} color={theme[currentTheme].highColor} />
              </Pressable>
            )
          },
          headerRight: () => {
            return (
              <Pressable className='mr-3' onPress={() => router.push('/(tabs)/profile/(modals)/settings')}>
                <Feather name="settings" size={25.5} color={theme[currentTheme].highColor} />
              </Pressable>
            )
          }
        }}
      />
    </Tabs>
  );
}
