import React, { useEffect, useState } from 'react';
import { Tabs, usePathname } from 'expo-router';
import { FontAwesome5, Feather } from '@expo/vector-icons';
import { theme } from '@/constants/constants';
import { useThemeContext } from '@/context/useThemeContext';

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
          shadowRadius: 20,
          shadowOffset: {
            width: 0,
            height: -2
          },
          shadowOpacity: 1,
        },
        tabBarShowLabel: false
      }}>
      <Tabs.Screen
        name="index"
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
          tabBarIcon: () => <Feather name="user" size={24} color={activeRoute === 'profile' ? theme[currentTheme].highColor : theme[currentTheme].lowColor} />
        }}
      />
    </Tabs>
  );
}
