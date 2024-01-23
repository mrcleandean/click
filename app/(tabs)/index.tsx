import { StyleSheet, SafeAreaView, Dimensions, View } from 'react-native';
import Mapbox, {
  MapView,
  SkyLayer,
  Logger,
  Terrain,
  RasterDemSource,
  Atmosphere,
  Camera,
} from '@rnmapbox/maps';

Mapbox.setAccessToken('pk.eyJ1IjoiZGVtZGV2dnkiLCJhIjoiY2xycGl3b2NpMDJjaDJrbXE2d2RhODNiZSJ9.Y34dC57ZpRlz_iEmTyZ2eQ');
Logger.setLogLevel('verbose');

export default function Home() {
  return (
    <SafeAreaView style={styles.container}>
      <MapView
        style={styles.container}
        projection={'globe'}
        styleURL={'mapbox://styles/mapbox/light-v11'}
      >
        <Camera
          defaultSettings={{
            zoomLevel: 10,
            centerCoordinate: [0, 0],
            pitch: 0
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
              color: 'rgb(186, 210, 235)',
              highColor: 'rgb(36, 92, 223)',
              horizonBlend: 0.02,
              spaceColor: 'white',
              starIntensity: 0.01,
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
  },
});
