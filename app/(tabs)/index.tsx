import { StyleSheet, SafeAreaView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { lightTheme } from '@/constants/constants';
import Mapbox, {
  MapView,
  SkyLayer,
  Logger,
  Terrain,
  RasterDemSource,
  Atmosphere,
  Camera,
  LocationPuck
} from '@rnmapbox/maps';
import { useRef, useState } from 'react';
import { ProjectionType } from '@/constants/types';
import { Interactions } from '@/components';

Mapbox.setAccessToken('pk.eyJ1IjoiZGVtZGV2dnkiLCJhIjoiY2xycGl3b2NpMDJjaDJrbXE2d2RhODNiZSJ9.Y34dC57ZpRlz_iEmTyZ2eQ');
Logger.setLogLevel('verbose');

export default function Home() {
  const [projectionType, setProjectionType] = useState<ProjectionType>('globe');
  const cameraRef = useRef<Camera | null>(null);
  cameraRef.current?.setCamera({
    pitch: 0
  })
  return (
    <TouchableWithoutFeedback onPress={() => {
      Keyboard.dismiss();
    }}>
      <SafeAreaView style={styles.container}>
        <Interactions projectionType={projectionType} setProjectionType={setProjectionType} />
        <MapView
          style={styles.container}
          projection={projectionType}
          styleURL={'mapbox://styles/mapbox/light-v11'}
          logoEnabled={false}
          attributionEnabled={false}
          pitchEnabled={false}
          scaleBarEnabled={false}
        >
          <Camera
            defaultSettings={{
              zoomLevel: 0,
              centerCoordinate: [0, 0],
              pitch: 0
            }}
            pitch={0}
            ref={cameraRef}
          />
          <LocationPuck
            visible={true}
            scale={['interpolate', ['linear'], ['zoom'], 10, 1.0, 20, 4.0]}
            pulsing={{
              isEnabled: true,
              color: 'teal',
              radius: 50.0,
            }}
          />
          <RasterDemSource
            id="mapbox-dem"
            url="mapbox://mapbox.mapbox-terrain-dem-v1"
            tileSize={514}
            maxZoomLevel={14}
          >
            <Atmosphere
              style={{
                color: lightTheme.lowColor,
                highColor: lightTheme.highColor,
                horizonBlend: 0.02,
                spaceColor: 'white',
                starIntensity: 0,
              }}
            />
            <SkyLayer
              id="sky-layer"
              style={{
                skyType: 'atmosphere',
                skyAtmosphereSun: [0.0, 0.0],
                skyAtmosphereSunIntensity: 15.0,
              }}
            />
            <Terrain style={{ exaggeration: 1.5 }} />
          </RasterDemSource>
        </MapView>
      </SafeAreaView >
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  }
});
