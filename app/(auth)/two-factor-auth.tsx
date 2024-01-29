import { theme } from "@/constants/constants";
import { useThemeContext } from "@/context/themeProvider"
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Text, TextInput, View } from "react-native"
import { TouchableWithoutFeedback } from "react-native-gesture-handler"

const TwoFactorAuth = () => {
    const { type } = useLocalSearchParams<{ type: 'email' | 'phone' }>();
    const { currentTheme } = useThemeContext();
    const [code, setCode] = useState('');
    return (
        <TouchableWithoutFeedback>
            <View className="flex-[1] flex justify-center items-center" style={{ backgroundColor: theme[currentTheme].primary }}>

                <Text>{
                }</Text>
                <TextInput
                    onChangeText={text => setCode(text)}
                    value={code}
                    placeholder="_ _ _ _ _ _"
                    placeholderTextColor="#acadad"
                    autoCapitalize="none"
                    style={{ color: theme[currentTheme].highColor }}
                    className="p-4 text-lg w-[80%] bg-[#353535] rounded-lg"
                />
            </View>
        </TouchableWithoutFeedback>
    )
}

export default TwoFactorAuth;