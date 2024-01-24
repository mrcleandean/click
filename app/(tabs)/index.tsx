import { StyleSheet, SafeAreaView, TouchableWithoutFeedback, Keyboard, TouchableOpacity } from 'react-native';
import Mapbox, { Camera, Location, Logger } from '@rnmapbox/maps';
import { useRef, useState } from 'react';
import { ProjectionType } from '@/constants/types';
import { Interactions, Map } from '@/components';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { initialCameraAnimDuration, theme } from '@/constants/constants';
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
        <TouchableOpacity style={[styles.centerButton, theme[currentTheme].shadowBorder]} onPress={() => {
          if (locationRef.current && cameraRef.current) {
            const { coords: { latitude, longitude } } = locationRef.current;
            cameraRef.current.flyTo([longitude, latitude], initialCameraAnimDuration);
          }
        }}>
          <MaterialCommunityIcons name="image-filter-center-focus" size={30} color={theme[currentTheme].highColor} />
        </TouchableOpacity>
      </SafeAreaView >
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  centerButton: {
    padding: 10,
    backgroundColor: 'white',
    borderColor: 'black',
    borderRadius: 50,
    position: 'absolute',
    bottom: 27.5,
    right: 27.5
  }
});
