import { lightTheme } from '@/constants/constants';
import { MapPropType } from '@/constants/types';
import {
    MapView,
    SkyLayer,
    Terrain,
    RasterDemSource,
    Atmosphere,
    Camera,
    LocationPuck,
    UserLocation
} from '@rnmapbox/maps';
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { initialCameraAnimDuration } from '@/constants/constants';

const Map = ({ projectionType, cameraRef, locationRef }: MapPropType) => {
    const [gotLocationOnce, setGotLocationOnce] = useState(false);
    return (
        <MapView
            style={styles.container}
            projection={projectionType}
            styleURL={'mapbox://styles/mapbox/light-v11'}
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
            />
            <Camera
                defaultSettings={{
                    zoomLevel: 4,
                    centerCoordinate: [0, 0],
                    pitch: 0
                }}
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
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

export default Map;