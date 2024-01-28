import { theme } from "@/constants/constants";
import { useThemeContext } from "@/context/useThemeContext";
import { Text, View, TouchableOpacity } from "react-native";
import { FontAwesome } from '@expo/vector-icons';
const SettingsModal = () => {
    const { currentTheme } = useThemeContext();
    return (
        <View className="flex-[1] flex items-center p-5 gap-5" style={{ backgroundColor: theme[currentTheme].primary }}>
            <TouchableOpacity className="flex flex-row justify-center items-center p-4 bg-red-400 rounded-xl">
                <Text className="text-md" style={{ color: theme[currentTheme].highColor }}>Log Out</Text>
                <FontAwesome name="sign-out" size={22} color={theme[currentTheme].highColor} style={{ marginLeft: 8 }} />
            </TouchableOpacity>
            <TouchableOpacity className="flex flex-row justify-center items-center p-4 bg-red-400 rounded-xl">
                <Text className="text-md" style={{ color: theme[currentTheme].highColor }}>Deactivate</Text>
                <FontAwesome name="trash-o" size={24} color={theme[currentTheme].highColor} style={{ marginLeft: 8 }} />
            </TouchableOpacity>
        </View>
    )
}

export default SettingsModal;