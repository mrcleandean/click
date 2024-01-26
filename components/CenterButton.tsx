import { initialCameraAnimDuration, theme } from "@/constants/constants";
import { CenterButtonPropType } from "@/constants/types";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity } from "react-native";

const CenterButton = ({ cameraRef, locationRef, currentTheme }: CenterButtonPropType) => {
    return (
        <TouchableOpacity style={[styles.centerButton, theme[currentTheme].shadowBorder, { backgroundColor: theme[currentTheme].primary }]} onPress={() => {
            if (locationRef.current && cameraRef.current) {
                const { coords: { latitude, longitude } } = locationRef.current;
                cameraRef.current.flyTo([longitude, latitude], initialCameraAnimDuration);
            }
        }}>
            <MaterialCommunityIcons name="image-filter-center-focus" size={30} color={theme[currentTheme].highColor} />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    centerButton: {
        padding: 9,
        borderRadius: 50,
        position: 'absolute',
        bottom: 27.5,
        right: 27.5
    }
})

export default CenterButton;