import { lightTheme } from "@/constants/constants";
import { StyleSheet, TextInput } from "react-native";

const SearchBar = () => {
    return (
        <TextInput
            placeholderTextColor={lightTheme.highColor}
            placeholder='Search' style={styles.textInput}
        />
    )
}

const styles = StyleSheet.create({
    textInput: {
        backgroundColor: lightTheme.secondary,
        color: lightTheme.highColor,
        padding: 16.5,
        width: '90%',
        borderRadius: 15,
        borderColor: lightTheme.lowColor,
        shadowColor: lightTheme.lowColor,
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