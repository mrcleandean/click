import { StyleSheet } from "react-native";
import { lightTheme } from "./constants";

export const globalStyles = StyleSheet.create({
    shadowBorder: {
        borderColor: lightTheme.lowColor,
        borderWidth: 2,
        shadowColor: lightTheme.lowColor,
        shadowRadius: 10,
        shadowOffset: {
            width: 10,
            height: 5
        },
        shadowOpacity: 1
    }
});