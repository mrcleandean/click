import { theme } from "@/constants/constants";
import { useThemeContext } from "@/context/useThemeContext";
import { StyleSheet, TextInput, View } from "react-native";

const SearchBar = () => {
    const { currentTheme } = useThemeContext();
    return (
        <View style={[styles.container, {
            backgroundColor: theme[currentTheme].primary,
            borderColor: theme[currentTheme].lowColor,
        }]}>
            <TextInput
                placeholderTextColor={theme[currentTheme].highColor}
                placeholder='Search' style={[
                    styles.textInput,
                    { color: theme[currentTheme].highColor }
                ]}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingLeft: 16.5,
        paddingRight: 16.5,
        height: 47.5,
        width: '90%',
        borderRadius: 47.5,
        borderWidth: 1,
    },
    textInput: {
        width: '100%',
        height: '100%',
        fontSize: 18,
    }
});

export default SearchBar;