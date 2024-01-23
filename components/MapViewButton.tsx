import { lightTheme } from "@/constants/constants";
import type { InteractionsPropType } from "@/constants/types";
import { Pressable, StyleSheet, Text } from "react-native";

const MapViewButton = ({ projectionType, setProjectionType }: InteractionsPropType) => {
    return (
        <Pressable
            style={styles.pressable}
            onPress={() => setProjectionType(projectionType === 'globe' ? 'mercator' : 'globe')}
        >
            <Text style={styles.text}>{projectionType === 'globe' ? 'Map View' : 'Globe View'}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    pressable: {
        padding: 10,
        borderRadius: 10,
        backgroundColor: lightTheme.secondary,
        borderColor: lightTheme.lowColor,
        shadowColor: lightTheme.lowColor,
        shadowRadius: 10,
        shadowOffset: {
            width: 10,
            height: 5
        },
        shadowOpacity: 1,
        borderWidth: 0.5
    },
    text: {
        color: lightTheme.highColor
    }
})

export default MapViewButton;