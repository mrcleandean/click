import { theme } from "@/constants/constants";
import { useThemeContext } from "@/context/useThemeContext";
import { useState } from "react";
import { StyleProp, Text, TextInput, TextStyle, View, TouchableOpacity } from "react-native";
import { FontAwesome6, Entypo } from '@expo/vector-icons';
import { useAssets } from "expo-asset";
import { Image } from "expo-image";

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

const EditModal = () => {
    const { currentTheme } = useThemeContext();
    const [assets] = useAssets([require('../../../assets/gladpfp.jpeg')]);
    const [userDetails, setUserdetails] = useState({
        username: '',
        identifier: '',
        displayName: '',
        bio: ''
    });
    const onChangeText = (text: string, name: string) => {
        const lastChar = text[text.length - 1];
        if (lastChar === '\n') return;
        setUserdetails(prev => ({
            ...prev,
            [name]: text
        }))
    }
    if (assets === undefined || !assets[0]) return;
    return (
        <View className="flex-[1] p-8 flex items-center gap-5" style={{ backgroundColor: theme[currentTheme].primary }}>
            <View className="w-full flex justify-center items-center">
                <View className="w-20 h-20 relative">
                    <Image className="object-contain w-full h-full rounded-full border-2" source={{ uri: assets[0].uri }} style={{ borderColor: theme[currentTheme].highColor }} />
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
                    value={userDetails.displayName}
                    placeholder="Display Name"
                    name="displayName"
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
            <TouchableOpacity className="bg-green-300 flex flex-row justify-center items-center p-2.5 border-2 rounded-full" style={{ gap: 6.5, borderColor: theme[currentTheme].highColor }}>
                <Text className="text-md" style={{ color: theme.light.highColor }}>Update Profile</Text>
                <FontAwesome6 name="edit" size={20} color={theme.light.highColor} />
            </TouchableOpacity>
        </View>
    )
}

export default EditModal;