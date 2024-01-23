import React from 'react';
import { Tabs } from 'expo-router';
import { FontAwesome5, Feather } from '@expo/vector-icons';
import { lightTheme } from '@/constants/constants';

export default function TabLayout() {
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
          tabBarIcon: () => <FontAwesome5 name="globe-americas" size={24} color={lightTheme.lowColor} />,
          title: 'Clicks',
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          tabBarIcon: () => <Feather name="plus-square" size={24} color={lightTheme.lowColor} />
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: () => <Feather name="user" size={24} color={lightTheme.lowColor} />
        }}
      />
    </Tabs>
  );
}
