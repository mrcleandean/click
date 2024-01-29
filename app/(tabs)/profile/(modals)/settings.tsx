import { theme } from "@/constants/constants";
import { useThemeContext } from "@/context/themeProvider";
import { Text, View, TouchableOpacity, ActivityIndicator } from "react-native";
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { useState } from "react";
import { router } from "expo-router";
import auth from '@react-native-firebase/auth';

const Settings = () => {
    const { currentTheme } = useThemeContext();
    const [loading, setLoading] = useState(false);
    const [showError, setShowError] = useState(false);
    const logOut = async () => {
        setLoading(true);
        try {
            await auth().signOut();
        } catch (e) {
            setShowError(true);
            console.log(e);
        }
        setLoading(false);
    }
    const deactivateAccount = () => {
        router.push('/(tabs)/profile/(modals)/deactivate');
    }
    const deleteAccount = () => {
        router.push('/(tabs)/profile/(modals)/delete');
    }
    return (
        <View className="flex-[1] flex items-center p-5 gap-5" style={{ backgroundColor: theme[currentTheme].primary }}>
            <TouchableOpacity disabled={loading} onPress={logOut} className="flex flex-row justify-center items-center p-4 bg-red-400 rounded-xl">
                {
                    loading ? <ActivityIndicator color="white" size="small" /> : (
                        <>
                            <Text className="text-md" style={{ color: theme[currentTheme].highColor }}>Log Out</Text>
                            <FontAwesome name="sign-out" size={22} color={theme[currentTheme].highColor} style={{ marginLeft: 8 }} />
                        </>
                    )
                }
            </TouchableOpacity>
            {showError && <Text className="bg-red-400">There was an error logging out</Text>}
            <TouchableOpacity disabled={loading} onPress={deactivateAccount} className="flex flex-row justify-center items-center p-4 bg-red-400 rounded-xl">
                {
                    loading ? <ActivityIndicator color="white" size="small" /> : (
                        <>
                            <Text className="text-md" style={{ color: theme[currentTheme].highColor }}>Deactivate Account</Text>
                            <MaterialIcons name="no-accounts" size={24} color={theme[currentTheme].highColor} style={{ marginLeft: 8 }} />
                        </>
                    )
                }
            </TouchableOpacity>
            <TouchableOpacity disabled={loading} onPress={deleteAccount} className="flex flex-row justify-center items-center p-4 bg-red-400 rounded-xl">
                {
                    loading ? <ActivityIndicator color="white" size="small" /> : (
                        <>
                            <Text className="text-md" style={{ color: theme[currentTheme].highColor }}>Delete Account</Text>
                            <FontAwesome name="trash-o" size={24} color={theme[currentTheme].highColor} style={{ marginLeft: 8 }} />
                        </>
                    )
                }
            </TouchableOpacity>
        </View>
    )
}

export default Settings;