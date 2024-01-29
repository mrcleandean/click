import { theme } from "@/constants/constants";
import { useThemeContext } from "@/context/useThemeContext";
import { StyleSheet, Switch, Text, View } from "react-native";

const ThemeSwitch = ({ currentTheme }: { currentTheme: 'light' | 'dark' }) => {
    const { setCurrentTheme } = useThemeContext();
    const toggleSwitch = () => setCurrentTheme(prev => prev === 'light' ? 'dark' : 'light');
    return (
        <View style={styles.switchContainer}>
            <Switch
                trackColor={{ false: theme.dark.primary, true: theme.light.primary }}
                thumbColor={theme[currentTheme].highColor}
                onValueChange={toggleSwitch}
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