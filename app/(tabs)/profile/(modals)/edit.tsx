import { theme } from "@/constants/constants";
import { useThemeContext } from "@/context/themeProvider";
import { useState } from "react";
import { StyleProp, Text, TextInput, TextStyle, View, TouchableOpacity } from "react-native";
import { FontAwesome6, Entypo } from '@expo/vector-icons';
import { Image } from "expo-image";
import { useUser } from "@/context/userProvider";
import { useLoadedAssets } from "@/app/_layout";
import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { UserDocType } from "@/constants/types";


// START HERE NEXT TIME, NOT UPDATING, INDEX OUT OF SYNC. FIX THIS

type TextInputNamedPropType = {
    className?: string;
    style?: StyleProp<TextStyle>;
    placeHolderTextColor: string;
    placeholder: string;
    value: string;
    onChangeText: (text: string, name: string) => void;
    name: string;
}

const TextInputNamed = ({ className = '', style = {}, placeHolderTextColor, placeholder, value, onChangeText, name }: TextInputNamedPropType) => {
    return (
        <TextInput
            placeholderTextColor={placeHolderTextColor}
            className={className}
            style={style}
            onChangeText={(text) => onChangeText(text, name)}
            value={value}
            placeholder={placeholder}
        />
    )
}

const Edit = () => {
    const { currentTheme } = useThemeContext();
    const { userDoc, userAuth, setUserDoc } = useUser()
    const { uris } = useLoadedAssets();
    const [userDetails, setUserdetails] = useState({
        username: '',
        identifier: '',
        fullName: '',
        bio: '',
        profilePicture: null
    });
    const [showError, setShowError] = useState(false);
    if (userDoc === undefined || userAuth === null) return;
    const onChangeText = (text: string, name: string) => {
        const lastChar = text[text.length - 1];
        if (lastChar === '\n') return;
        setUserdetails(prev => ({
            ...prev,
            [name]: text
        }))
    }
    const tryUpdate = async () => {
        try {
            await firestore().collection('users').doc(userAuth.uid).update(userDetails)
            const snapshot = await firestore().collection('users').doc(userAuth.uid).get()
            const data = snapshot.data();
            if (data === undefined) throw new Error('User doc is undefined');
            setUserDoc(data as (FirebaseFirestoreTypes.DocumentData & UserDocType));
        } catch (e) {
            setShowError(true);
            console.log(e);
        }
    }
    const { profilePicture } = userDoc;
    const fallbackUri = uris[0];
    const imgUri = profilePicture ? profilePicture : fallbackUri;
    return (
        <View className="flex-[1] p-8 flex items-center gap-5" style={{ backgroundColor: theme[currentTheme].primary }}>
            <View className="w-full flex justify-center items-center">
                <View className="w-20 h-20 relative">
                    <Image className='w-full h-full rounded-full border-2' source={{ uri: imgUri }} style={{ borderColor: theme[currentTheme].highColor }} />
                    <View className="absolute border-2 rounded-full bottom-0.5 right-0.5 w-6 h-6 origin-center bg-blue-400 flex justify-center items-center" style={{ borderColor: theme[currentTheme].primary }}>
                        <Entypo name="plus" size={16} color={theme[currentTheme].highColor} />
                    </View>
                </View>
            </View>
            <View className="w-full">
                <Text className="mb-2 ml-2" style={{ color: theme[currentTheme].highColor }}>Username</Text>
                <TextInputNamed
                    className="p-3 rounded-full"
                    style={{ backgroundColor: theme[currentTheme].highColor, color: theme[currentTheme].primary, fontSize: 16 }}
                    placeHolderTextColor={theme[currentTheme].primary}
                    onChangeText={onChangeText}
                    value={userDetails.username}
                    placeholder="Username"
                    name="username"
                />
            </View>
            <View className="w-full">
                <Text className="mb-2 ml-2" style={{ color: theme[currentTheme].highColor }}>Identifier</Text>
                <TextInputNamed
                    className="p-3 rounded-full"
                    style={{ backgroundColor: theme[currentTheme].highColor, color: theme[currentTheme].primary, fontSize: 16 }}
                    placeHolderTextColor={theme[currentTheme].primary}
                    onChangeText={onChangeText}
                    value={userDetails.identifier}
                    placeholder="Identifier"
                    name="identifier"
                />
            </View>
            <View className="w-full">
                <Text className="mb-2 ml-2" style={{ color: theme[currentTheme].highColor }}>Display Name</Text>
                <TextInputNamed
                    className="p-3 rounded-full"
                    style={{ backgroundColor: theme[currentTheme].highColor, color: theme[currentTheme].primary, fontSize: 16 }}
                    placeHolderTextColor={theme[currentTheme].primary}
                    onChangeText={onChangeText}
                    value={userDetails.fullName}
                    placeholder="Display Name"
                    name="fullName"
                />
            </View>
            <View className="w-full">
                <Text className="mb-2 ml-2" style={{ color: theme[currentTheme].highColor }}>Bio</Text>
                <TextInputNamed
                    className="p-3 rounded-full"
                    style={{ backgroundColor: theme[currentTheme].highColor, color: theme[currentTheme].primary, fontSize: 16 }}
                    placeHolderTextColor={theme[currentTheme].primary}
                    onChangeText={onChangeText}
                    value={userDetails.bio}
                    placeholder="Bio"
                    name="bio"
                />
            </View>
            {showError && <Text className="text-red-400">Something went wrong</Text>}
            <TouchableOpacity onPress={tryUpdate} className="bg-green-300 flex flex-row justify-center items-center p-2.5 border-2 rounded-full" style={{ gap: 6.5, borderColor: theme[currentTheme].highColor }}>
                <Text className="text-md" style={{ color: theme.light.highColor }}>Update Profile</Text>
                <FontAwesome6 name="edit" size={20} color={theme.light.highColor} />
            </TouchableOpacity>
        </View>
    )
}

export default Edit;