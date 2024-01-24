import { lightTheme } from "@/constants/constants";
import { globalStyles } from "@/constants/globalStyles";
import type { InteractionsPropType } from "@/constants/types";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

const MapViewButton = ({ projectionType, setProjectionType }: InteractionsPropType) => {
    return (
        <TouchableOpacity
            style={[styles.pressable, globalStyles.shadowBorder]}
            onPress={() => setProjectionType(projectionType === 'globe' ? 'mercator' : 'globe')}
        >
            <Text style={styles.text}>{projectionType === 'globe' ? 'Map View' : 'Globe View'}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    pressable: {
        padding: 10,
        borderRadius: 10,
        backgroundColor: lightTheme.secondary,
    },
    text: {
        color: lightTheme.highColor
    }
})

export default MapViewButton;