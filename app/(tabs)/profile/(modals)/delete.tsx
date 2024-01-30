import { Keyboard, Text, TouchableOpacity, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { useState } from "react";
import { AntDesign, Feather } from "@expo/vector-icons";
import { useUser } from "@/context/userProvider";
import auth from '@react-native-firebase/auth';
import { theme } from "@/constants/constants";
import { useThemeContext } from "@/context/themeProvider";

const Delete = () => {
    const { currentTheme } = useThemeContext();
    const [password, setPassword] = useState('');
    const [passwordShown, setPasswordShown] = useState<boolean>(false);
    const [optionalFeedback, setOptionalFeedback] = useState('');
    const [showError, setShowError] = useState(false);
    const { userAuth, loadedAuth } = useUser();
    const maxFeedbackLength = 300;
    const tryDelete = async () => {
        try {
            if (!loadedAuth) throw new Error('App has not loaded yet');
            if (userAuth === null) throw new Error('User is not logged in');
            if (userAuth.email === null) throw new Error('User does not have an email');
            const credential = auth.EmailAuthProvider.credential(userAuth.email, password);
            await auth().currentUser?.reauthenticateWithCredential(credential);
            await auth().currentUser?.delete();
            console.log('Account deleted');
        } catch (e) {
            setShowError(true);
            console.log(e);
        }
    }
    return (
        <View className="w-full flex-[1] flex items-center p-7" style={{ backgroundColor: theme[currentTheme].primary, gap: 20 }}>
            <Text className="text-lg" style={{ color: theme[currentTheme].highColor }}>Please enter your password to delete your account</Text>
            <View className="w-full flex items-center justify-center flex-row">
                <TextInput
                    onChangeText={text => setPassword(text)}
                    value={password}
                    placeholder="Password"
                    placeholderTextColor="#acadad"
                    className="p-4 text-[18px] w-full bg-[#353535] rounded-lg text-white"
                    secureTextEntry={!passwordShown}
                />
                <Feather name={passwordShown ? "eye" : "eye-off"} size={25} color="white" style={{
                    position: 'absolute',
                    right: 12.5
                }} onPress={() => setPasswordShown(prev => !prev)} />
            </View>
            <Text className="text-lg" style={{ color: theme[currentTheme].highColor }}>Optional Feedback: Why are you leaving this platform?</Text>
            <View style={{ width: '100%' }}>
                <TextInput
                    onChangeText={text => setOptionalFeedback(text)}
                    value={optionalFeedback}
                    multiline={true}
                    maxLength={300}
                    placeholder="Feel free to let us know"
                    placeholderTextColor="#acadad"
                    className="text-white p-4 text-[18px] h-[200px] w-full bg-[#353535] rounded-lg"
                    secureTextEntry={!passwordShown}
                />
                <Text style={{
                    color: optionalFeedback.length >= maxFeedbackLength ? 'red' : 'white',
                    position: 'absolute',
                    right: 15,
                    bottom: 15,
                }}>{optionalFeedback.length}/{maxFeedbackLength}</Text>
            </View>
            <TouchableOpacity className="bg-[#FF3131] p-3 rounded-lg flex justify-center items-center flex-row" style={{ gap: 5 }} onPress={tryDelete}>
                <Text style={{
                    color: 'white'
                }}>
                    Confirm Deletion
                </Text>
                <AntDesign name="delete" size={22} color="white" />
            </TouchableOpacity>
        </View>
    )
}

export default Delete;