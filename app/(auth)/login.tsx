import { useState } from "react";
import { View, Text, TouchableOpacity, Pressable, ActivityIndicator, TextInput, TouchableWithoutFeedback, Keyboard } from "react-native";
import { AntDesign, Feather } from '@expo/vector-icons';
import { useRouter } from "expo-router";
import { useThemeContext } from "@/context/themeProvider";
import { theme } from "@/constants/constants";
import auth from "@react-native-firebase/auth";
const Login = () => {
    const { currentTheme } = useThemeContext();
    const [key, setKey] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [loggingIn, setLoggingIn] = useState<boolean>(false);
    const [passwordShown, setPasswordShown] = useState<boolean>(false);
    const [showError, setShowError] = useState(false);
    const router = useRouter();
    const tryLogin = async () => {
        setLoggingIn(true);
        try {
            await auth().signInWithEmailAndPassword(key, password);
        } catch (e) {
            setShowError(true);
            console.log(e);
        }
        setLoggingIn(false);
    }
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={{ backgroundColor: theme[currentTheme].primary }} className="flex justify-end items-center flex-col flex-[9]">
                <View style={{ gap: 20 }} className="flex-[9] w-full flex justify-center items-center flex-col">
                    {/* <Image source={} style={{ transform: [{ scale: 0.45 }] }} /> */}
                    <Text className="text-5xl font-bold" style={{ color: theme[currentTheme].highColor }}>click</Text>
                    <TextInput
                        onChangeText={text => setKey(text)}
                        value={key}
                        placeholder="Email"
                        placeholderTextColor="#acadad"
                        autoCapitalize="none"
                        style={{ color: theme[currentTheme].highColor }}
                        className="p-4 text-[18px] w-[80%] bg-[#353535] rounded-lg"
                    />
                    <View className="w-[80%] flex items-center justify-center flex-row">
                        <TextInput
                            onChangeText={text => setPassword(text)}
                            value={password}
                            placeholder="Password"
                            placeholderTextColor="#acadad"
                            style={{ color: theme[currentTheme].highColor }}
                            className="p-4 text-[18px] w-full bg-[#353535] rounded-lg"
                            secureTextEntry={!passwordShown}
                        />
                        <Feather name={passwordShown ? "eye" : "eye-off"} size={25} color="white" style={{
                            position: 'absolute',
                            right: 12.5
                        }} onPress={() => setPasswordShown(prev => !prev)} />
                    </View>
                    {showError && <Text className="text-red-400">Invalid email or password</Text>}
                    <View className="w-[80%] flex items-end">
                        <Pressable>
                            <Text style={{ color: theme[currentTheme].highColor }}>
                                Forgotten Password?
                            </Text>
                        </Pressable>
                    </View>
                    <TouchableOpacity
                        className="w-[80%] flex justify-center items-center rounded-lg p-4"
                        style={{ opacity: loggingIn ? 0.8 : 1, backgroundColor: theme[currentTheme].highColor }}
                        disabled={loggingIn}
                        onPress={tryLogin}
                    >
                        {
                            loggingIn ? (
                                <ActivityIndicator color="white" size="small" />
                            ) : (
                                <Text className="text-md" style={{
                                    color: theme[currentTheme].primary
                                }}>Log in</Text>
                            )
                        }
                    </TouchableOpacity>
                    <View className="w-[80%] mt-2 flex justify-center items-center flex-row">
                        <View className="h-1 flex-[2] bg-[#555455]" />
                        <View className="flex-[1] flex items-center justify-center">
                            <Text style={{ color: theme[currentTheme].highColor }}>Or</Text>
                        </View>
                        <View className="h-1 flex-[2] bg-[#555455]" />
                    </View>
                    <TouchableOpacity className=" p-5 flex flex-row items-center rounded-2xl mt-2" style={{ backgroundColor: theme[currentTheme].highColor, gap: 10 }}>
                        <AntDesign name="google" size={24} color={theme[currentTheme].primary} />
                        <Text className=" text-md text-[#7a797a]">Sign in with Google</Text>
                    </TouchableOpacity>
                </View>
                <View className="w-full flex justify-center items-center flex-col flex-[1] border-t-2 border-[#555455]" style={{ gap: 20 }}>
                    <View className="h-full w-full flex flex-row justify-center p-5" style={{ gap: 10 }}>
                        <Text className="text-[#9fa2a1] text-md">Don't have an account?</Text>
                        <Pressable onPress={() => {
                            router.replace('/(auth)/signup');
                        }}>
                            <Text className="text-md" style={{ color: theme[currentTheme].highColor }}>Sign Up</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

export default Login;