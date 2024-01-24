import { theme } from "@/constants/constants";
import { useThemeContext } from "@/context/useThemeContext";
import type { InteractionsPropType } from "@/constants/types";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

const MapViewButton = ({ projectionType, setProjectionType }: InteractionsPropType) => {
    const { currentTheme } = useThemeContext();
    return (
        <TouchableOpacity
            style={[styles.pressable, theme[currentTheme].shadowBorder, { backgroundColor: theme[currentTheme].secondary }]}
            onPress={() => setProjectionType(projectionType === 'globe' ? 'mercator' : 'globe')}
        >
            <Text style={[styles.text, { color: theme[currentTheme].highColor }]}>{projectionType === 'globe' ? 'Map View' : 'Globe View'}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    pressable: {
        padding: 10,
        borderRadius: 10,
    },
    text: {

    }
})

export default MapViewButton;