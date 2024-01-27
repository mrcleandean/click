import { SafeAreaView, ScrollView, Text, View, TouchableOpacity, Dimensions, PixelRatio, Pressable } from "react-native"
import { theme } from "@/constants/constants";
import { MaterialIcons, FontAwesome6 } from '@expo/vector-icons';
import { useThemeContext } from "@/context/useThemeContext";
import { Image } from 'expo-image';
import { useAssets } from 'expo-asset';
import { useEffect, useMemo, useState } from "react";
import { Link, router } from "expo-router";

// asset square may not be supported on all devices 
const Profile = () => {
    const { currentTheme } = useThemeContext();
    const [activeSection, setActiveSection] = useState<'clicks' | 'posts' | 'reels'>('posts');
    const postGap = useMemo(() => Dimensions.get('window').width / (PixelRatio.get() * 100), []);
    const [assets] = useAssets([require('../../../assets/gladpfp.jpeg')]);
    if (assets === undefined || !assets[0]) return;
    const uri = assets[0].uri;

    return (
        <SafeAreaView className="flex-1" style={{ backgroundColor: theme[currentTheme].primary }}>
            <View className='flex flex-row' style={{ backgroundColor: theme[currentTheme].primary }}>
                <View className="w-1/3 flex justify-center items-center p-3.5">
                    <View className="w-full h-full flex-1 rounded-full aspect-square overflow-hidden">
                        <Image source={{ uri }} className="w-full h-full" />
                    </View>
                </View>
                <View className="w-2/3 flex pt-5 pb-1 pl-4 pr-4 items-center justify-center">
                    <View className="w-full flex-row justify-around">
                        <View className="flex justify-center items-center">
                            <Text className="text-xl" style={{ color: theme[currentTheme].highColor }}>0</Text>
                            <Text className="text-md" style={{ color: theme[currentTheme].highColor }}>Posts</Text>
                        </View>
                        <View className="flex justify-center items-center">
                            <Text className="text-xl" style={{ color: theme[currentTheme].highColor }}>0</Text>
                            <Text className="text-md" style={{ color: theme[currentTheme].highColor }}>Clicks</Text>
                        </View>
                        <View className="flex justify-center items-center">
                            <Text className="text-xl" style={{ color: theme[currentTheme].highColor }}>0</Text>
                            <Text className="text-md" style={{ color: theme[currentTheme].highColor }}>Friends</Text>
                        </View>
                    </View>
                    <TouchableOpacity
                        className="rounded-lg p-2 w-11/12 mt-3 flex justify-center items-center"
                        style={{ backgroundColor: theme[currentTheme].highColor }}
                        onPress={() => router.push('/(tabs)/profile/edit-m')}
                    >
                        <Text className="font-semibold" style={{ color: theme[currentTheme].primary }}>Edit Profile</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View className="flex flex-col gap-0.5 pl-5 pr-5 pt-2 pb-0">
                <Text className="font-bold text-md" style={{ color: theme[currentTheme].highColor }}>Dean Kadri</Text>
                <Text className="text-md" style={{ color: theme[currentTheme].highColor }}>Software Dev</Text>
                <Text style={{ color: theme[currentTheme].highColor }}>Bio Lorem ipsum dolor sit amet consectetur adipisicing elit.</Text>
            </View>
            <View className="border-b-[1px]" style={{ borderColor: theme[currentTheme].highColor }}>
                <ScrollView horizontal={true} contentContainerStyle={{
                    padding: 15,
                    paddingBottom: 7.5,
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 7.5
                }}>
                    {Array.from({ length: 15 }).map((_, i) => {
                        return (
                            <View key={i} className="flex justify-center items-center">
                                <StoryBubble uri={uri} key={i} currentTheme={currentTheme} />
                                <Text className="text-md" style={{ color: theme[currentTheme].highColor }}>Title</Text>
                            </View>
                        )
                    })}
                </ScrollView>
            </View>
            <View className="flex flex-row justify-around p-4 pr-0 pl-0 border-b-[1px]" style={{ borderColor: theme[currentTheme].highColor }}>
                <Pressable onPress={() => setActiveSection('clicks')}>
                    <MaterialIcons name="ads-click" size={24} color={activeSection === 'clicks' ? theme[currentTheme].highColor : theme[currentTheme].lowColor} />
                </Pressable>
                <Pressable onPress={() => setActiveSection('posts')}>
                    <MaterialIcons name="grid-on" size={24} color={activeSection === 'posts' ? theme[currentTheme].highColor : theme[currentTheme].lowColor} />
                </Pressable>
                <Pressable onPress={() => setActiveSection('reels')}>
                    <FontAwesome6 name="film" size={24} color={activeSection === 'reels' ? theme[currentTheme].highColor : theme[currentTheme].lowColor} />
                </Pressable>
            </View>
            <View className="flex-1">
                <ScrollView
                    bounces={false}
                    contentContainerStyle={{
                        display: 'flex',
                        justifyContent: 'flex-start',
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        gap: postGap,
                        backgroundColor: theme[currentTheme].highColor
                    }}>
                    {assets.map((asset, i) => <Post uri={asset.uri} key={i} currentTheme={currentTheme} />)}
                    <View className="absolute bottom-0 w-full h-[33vw] z-[1]" style={{ backgroundColor: theme[currentTheme].primary }} />
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

const Post = ({ uri, currentTheme }: { uri: string; currentTheme: 'light' | 'dark'; }) => {
    return (
        <View className="w-[33vw] h-[33vw] aspect-square z-[2]" style={{ backgroundColor: theme[currentTheme].primary }}>
            <Image source={{ uri }} className="w-full h-full" />
        </View>
    )
}

const StoryBubble = ({ uri, currentTheme }: { uri: string; currentTheme: 'light' | 'dark' }) => {
    return (
        <View className="p-0.5 border-2 rounded-full w-16 h-16" style={{ borderColor: theme[currentTheme].highColor }}>
            <View className="w-full h-full rounded-full aspect-square overflow-hidden">
                <Image source={{ uri }} className="w-full h-full" />
            </View>
        </View>
    )
}

export default Profile;