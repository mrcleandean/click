import { theme } from "@/constants/constants";
import { useThemeContext } from "@/context/themeProvider";
import { StyleSheet, Switch, Text, View } from "react-native";

const ThemeSwitch = ({ currentTheme }: { currentTheme: 'light' | 'dark' }) => {
    const { setCurrentTheme } = useThemeContext();
    const toggleSwitch = () => setCurrentTheme(prev => prev === 'light' ? 'dark' : 'light');
    return (
        <View style={styles.switchContainer}>
            <Switch
                trackColor={{ false: theme.light.primary, true: theme.dark.primary }}
                thumbColor={theme[currentTheme].highColor}
                onValueChange={toggleSwitch}
                value={currentTheme === 'dark'}
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