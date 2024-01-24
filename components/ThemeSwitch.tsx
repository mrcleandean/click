import { theme } from "@/constants/constants";
import { useThemeContext } from "@/context/useThemeContext";
import { StyleSheet, Switch, Text, View } from "react-native";

const ThemeSwitch = ({ currentTheme }: { currentTheme: 'light' | 'dark' }) => {
    const { setCurrentTheme } = useThemeContext();
    const toggleSwitch = () => setCurrentTheme(prev => prev === 'light' ? 'dark' : 'light');
    return (
        <View style={styles.switchContainer}>
            <Switch
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                thumbColor={currentTheme === 'dark' ? '#f5dd4b' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={currentTheme === 'dark'}
            />
            <Text style={{ color: theme[currentTheme].highColor }}>{currentTheme === 'light' ? 'Dark' : 'Light'} Mode</Text>
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