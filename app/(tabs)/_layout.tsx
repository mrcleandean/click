import React from 'react';
import { Tabs } from 'expo-router';
import { FontAwesome5 } from '@expo/vector-icons';
console.log('testing commit priv');
export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false
      }}>
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: () => <FontAwesome5 name="globe-americas" size={24} color="black" />,
          title: 'Clicks'
        }}
      />
    </Tabs>
  );
}
