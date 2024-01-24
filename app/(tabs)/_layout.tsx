import React, { useEffect, useState } from 'react';
import { Tabs, usePathname } from 'expo-router';
import { FontAwesome5, Feather } from '@expo/vector-icons';
import { lightTheme } from '@/constants/constants';

export default function TabLayout() {
  const [activeRoute, setActiveRoute] = useState<'globe' | 'create' | 'profile'>('globe');
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
          shadowColor: lightTheme.lowColor,
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
          tabBarIcon: () => <FontAwesome5 name="globe-americas" size={24} color={activeRoute === 'globe' ? lightTheme.highColor : lightTheme.lowColor} />,
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          tabBarIcon: () => <Feather name="plus-square" size={24} color={activeRoute === 'create' ? lightTheme.highColor : lightTheme.lowColor} />
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: () => <Feather name="user" size={24} color={activeRoute === 'profile' ? lightTheme.highColor : lightTheme.lowColor} />
        }}
      />
    </Tabs>
  );
}
