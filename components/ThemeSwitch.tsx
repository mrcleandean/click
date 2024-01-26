import { theme } from "@/constants/constants";
import { useThemeContext } from "@/context/useThemeContext";
import { StyleSheet, Text, View } from "react-native";
import { Switch } from 'native-base';

const ThemeSwitch = ({ currentTheme }: { currentTheme: 'light' | 'dark' }) => {
    const { setCurrentTheme } = useThemeContext();
    const toggleSwitch = () => setCurrentTheme(prev => prev === 'light' ? 'dark' : 'light');
    return (
        <View style={styles.switchContainer}>
            <Switch
                offTrackColor="black"
                offThumbColor="white"
                onTrackColor="white"
                onThumbColor="black"
                onToggle={toggleSwitch}
                isChecked={currentTheme === 'dark'}
                size="sm"
            />
            <Text style={{ fontSize: 11, color: theme[currentTheme].highColor }}>{currentTheme === 'dark' ? 'Dark' : 'Light'} Mode</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    switchContainer: {
        position: 'absolute',
        bottom: 27.5,
        left: 27.5,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 4
    }
})

export default ThemeSwitch;