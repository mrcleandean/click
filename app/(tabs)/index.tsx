import { StyleSheet, SafeAreaView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Mapbox, { Camera, Location, Logger } from '@rnmapbox/maps';
import { useRef, useState } from 'react';
import { ProjectionType } from '@/constants/types';
import { CenterButton, Interactions, Map, ThemeSwitch } from '@/components';
import { useThemeContext } from '@/context/useThemeContext';

Mapbox.setAccessToken('pk.eyJ1IjoiZGVtZGV2dnkiLCJhIjoiY2xycGl3b2NpMDJjaDJrbXE2d2RhODNiZSJ9.Y34dC57ZpRlz_iEmTyZ2eQ');
Logger.setLogLevel('verbose');

export default function Home() {
  const { currentTheme } = useThemeContext();
  const [projectionType, setProjectionType] = useState<ProjectionType>('globe');
  const cameraRef = useRef<Camera | null>(null);
  const locationRef = useRef<Location | null>(null);

  return (
    <TouchableWithoutFeedback onPress={() => {
      Keyboard.dismiss();
    }}>
      <SafeAreaView style={styles.container}>
        <Interactions projectionType={projectionType} setProjectionType={setProjectionType} />
        <Map projectionType={projectionType} cameraRef={cameraRef} locationRef={locationRef} />
        <CenterButton cameraRef={cameraRef} locationRef={locationRef} currentTheme={currentTheme} />
        <ThemeSwitch currentTheme={currentTheme} />
      </SafeAreaView >
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
