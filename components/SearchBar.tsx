import { theme } from "@/constants/constants";
import { useThemeContext } from "@/context/useThemeContext";
import { StyleSheet, TextInput } from "react-native";

const SearchBar = () => {
    const { currentTheme } = useThemeContext();
    return (
        <TextInput
            placeholderTextColor={theme[currentTheme].highColor}
            placeholder='Search' style={[
                styles.textInput,
                {
                    backgroundColor: theme[currentTheme].secondary,
                    color: theme[currentTheme].highColor,
                    borderColor: theme[currentTheme].lowColor,
                    shadowColor: theme[currentTheme].lowColor,
                }
            ]}
        />
    )
}

const styles = StyleSheet.create({
    textInput: {
        padding: 16.5,
        width: '90%',
        borderRadius: 15,
        shadowRadius: 10,
        shadowOffset: {
            width: 10,
            height: 5
        },
        shadowOpacity: 1,
        borderWidth: 0.5,
        fontSize: 15,
    }
});

export default SearchBar;