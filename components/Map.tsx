import { theme } from '@/constants/constants';
import { useThemeContext } from '@/context/useThemeContext';
import { MapPropType } from '@/constants/types';
import {
    MapView,
    SkyLayer,
    Terrain,
    RasterDemSource,
    Atmosphere,
    Camera,
    LocationPuck,
    UserLocation,
    StyleURL
} from '@rnmapbox/maps';
import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { initialCameraAnimDuration } from '@/constants/constants';

const Map = ({ projectionType, cameraRef, locationRef }: MapPropType) => {
    const { currentTheme } = useThemeContext();
    const [gotLocationOnce, setGotLocationOnce] = useState(false);
    return (
        <MapView
            style={styles.container}
            projection={projectionType}
            styleURL={currentTheme === 'light' ? StyleURL.Light : StyleURL.Dark}
            logoEnabled={false}
            attributionEnabled={false}
            pitchEnabled={false}
            scaleBarEnabled={false}
        >
            <UserLocation
                onUpdate={(newLocation) => {
                    if (newLocation && cameraRef.current && !gotLocationOnce) {
                        const { coords: { latitude, longitude } } = newLocation;
                        cameraRef.current.flyTo([longitude, latitude], initialCameraAnimDuration);
                        setGotLocationOnce(true);
                    }
                    locationRef.current = newLocation;
                }}
                visible={false}
            />
            <LocationPuck
                visible={true}
                scale={['interpolate', ['linear'], ['zoom'], 15, 1.0, 20, 4.0]}
                pulsing={{
                    isEnabled: true,
                    color: 'teal',
                    radius: 30.0,
                }}
            />
            <Camera
                defaultSettings={{
                    zoomLevel: 4,
                    centerCoordinate: [0, 0],
                    pitch: 0
                }}
                ref={cameraRef}
            />
            <RasterDemSource
                id="mapbox-dem"
                url="mapbox://mapbox.mapbox-terrain-dem-v1"
                tileSize={514}
                maxZoomLevel={14}
            >
                <Atmosphere
                    style={{
                        color: theme[currentTheme].lowColor,
                        highColor: theme[currentTheme].highColor,
                        horizonBlend: 0.02,
                        spaceColor: theme[currentTheme].primary,
                        starIntensity: currentTheme === 'light' ? 0 : 0.1,
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
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

export default Map;