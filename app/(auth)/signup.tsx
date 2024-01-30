import { View, Text, TouchableOpacity, Pressable, TextInput, ActivityIndicator } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { theme } from "@/constants/constants";
import { useThemeContext } from "@/context/themeProvider";
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { UserDocType } from "@/constants/types";

const SignUp = () => {
    const { currentTheme } = useThemeContext();
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [fullName, setFullName] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVerification, setPasswordVerification] = useState('');
    const [passwordShown, setPasswordShown] = useState(false);
    const [signingUp, setSigningUp] = useState(false);
    const [showError, setShowError] = useState(false);
    const router = useRouter();

    const trySignUp = async () => {
        setSigningUp(true);
        try {
            const userCredential = await auth().createUserWithEmailAndPassword(email, password);
            const setDocObj: UserDocType = {
                email,
                username,
                fullName,
                createdAt: firestore.FieldValue.serverTimestamp(),
                profilePicture: null,
                identifier: '',
                bio: '',
                posts: 0,
                clicks: 0,
                friends: 0
            }
            await firestore().collection('users').doc(userCredential.user.uid).set(setDocObj);
        } catch (e) {
            setShowError(true);
            console.log(e);
        }
        setSigningUp(false);
    }
    return (
        <View className="bg-[#1a1919] flex justify-end items-center flex-col flex-[1]">
            <View className="flex-[8] w-full flex justify-center items-center flex-col" style={{ gap: 15 }}>
                <Text className="text-5xl font-bold" style={{ color: theme[currentTheme].highColor }}>Sign Up</Text>
                <TextInput
                    onChangeText={text => setEmail(text)}
                    value={email}
                    placeholder="Email"
                    placeholderTextColor="#acadad"
                    className="p-4 text-[18px] w-[80%] bg-[#353535] text-white rounded-lg"
                />
                <TextInput
                    onChangeText={text => setFullName(text)}
                    value={fullName}
                    placeholder="Full Name"
                    placeholderTextColor="#acadad"
                    className="p-4 text-[18px] w-[80%] rounded-lg text-white bg-[#353535]"
                />
                <TextInput
                    onChangeText={text => setUsername(text)}
                    value={username}
                    placeholder="Username"
                    placeholderTextColor="#acadad"
                    className="p-4 text-[18px] w-[80%] rounded-lg text-white bg-[#353535]"
                />

                <View className="w-[80%] flex items-center justify-center flex-row">
                    <TextInput
                        onChangeText={text => setPassword(text)}
                        value={password}
                        placeholder="Password"
                        placeholderTextColor="#acadad"
                        className="text-white p-4 text-[18px] w-full bg-[#353535] rounded-lg"
                        secureTextEntry={!passwordShown}
                    />
                    <Feather name={passwordShown ? "eye" : "eye-off"} size={25} color="white" style={{
                        position: 'absolute',
                        right: 12.5
                    }} onPress={() => setPasswordShown(prev => !prev)} />
                </View>
                <TextInput
                    onChangeText={text => setPasswordVerification(text)}
                    value={passwordVerification}
                    placeholder="Confirm Password"
                    placeholderTextColor="#acadad"
                    className="text-white p-4 text-[18px] w-[80%] bg-[#353535] rounded-lg"
                    secureTextEntry={!passwordShown}
                />
                <TouchableOpacity
                    className="w-[80%] bg-blue-300 flex justify-center items-center rounded-lg p-4"
                    onPress={trySignUp}
                >
                    {
                        signingUp ? (
                            <ActivityIndicator color="white" size="small" />
                        ) : (
                            <Text style={{
                                color: 'white',
                                fontSize: 15
                            }}>Create Account</Text>
                        )
                    }
                </TouchableOpacity>
                {showError && <Text className="text-red-400">Something went wrong, please check and try again.</Text>}
            </View>
            <View className="flex-[1] border-t-2 border-[#555455] w-full flex justify-center items-center flex-col" style={{ gap: 15 }}>
                <View className="h-full w-full flex flex-row justify-center p-5" style={{ gap: 10 }}>
                    <Text style={{
                        color: '#9fa2a1',
                        fontSize: 15,
                    }}>Already have an account?</Text>
                    <Pressable onPress={() => router.push('/(auth)/login')}>
                        <Text className="text-blue-300">Log in</Text>
                    </Pressable>
                </View>
            </View>
        </View >
    )
}

export default SignUp