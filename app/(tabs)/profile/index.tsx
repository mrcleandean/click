import { SafeAreaView, ScrollView, Text, View, TouchableOpacity, Dimensions, PixelRatio, Pressable, TouchableWithoutFeedback } from "react-native"
import { theme } from "@/constants/constants";
import { MaterialIcons, FontAwesome6 } from '@expo/vector-icons';
import { useThemeContext } from "@/context/themeProvider";
import { Image } from 'expo-image';
import { useAssets } from 'expo-asset';
import { useMemo, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { SetStateType } from "@/constants/types";
import { useUser } from "@/context/userProvider";

// asset square may not be supported on all devices 
const Profile = () => {
    const { currentTheme } = useThemeContext();
    const { userId } = useLocalSearchParams();
    const { userAuth, loadingAuth } = useUser();
    const [activeSection, setActiveSection] = useState<'clicks' | 'posts' | 'reels'>('posts');

    if (!userAuth || loadingAuth) {
        return (
            <SafeAreaView className="flex-1">
                <View className="flex-1 flex justify-center items-center">
                    <Text>Loading</Text>
                </View>
            </SafeAreaView>
        )
    }

    const isMe = userId === userAuth.uid;

    return (
        <SafeAreaView className="flex-1" style={{ backgroundColor: theme[currentTheme].primary }}>
            <View className='flex flex-row' style={{ backgroundColor: theme[currentTheme].primary }}>
                <ProfilePicture />
                <View className="w-2/3 flex pt-5 pb-1 pl-4 pr-4 items-center justify-center">
                    <Stats currentTheme={currentTheme} numPosts={0} numClicks={0} numFriends={0} />
                    <ProfileButton currentTheme={currentTheme} isMe={isMe} />
                </View>
            </View>
            <UserInfo displayName="Deak Kadri" identifier="Software Dev" bio="Lorem Lorem Lorem Lorem Lorem" currentTheme={currentTheme} />
            <Highlights currentTheme={currentTheme} />
            <SectionSelector activeSection={activeSection} setActiveSection={setActiveSection} currentTheme={currentTheme} />
            {activeSection === 'posts' ? <PostGrid currentTheme={currentTheme} /> : activeSection === 'clicks' ? <Text>Clicks</Text> : <Text>Reels</Text>}
        </SafeAreaView>
    )
}

const ProfilePicture = () => {
    const [assets] = useAssets([require('../../../assets/gladpfp.jpeg')]);
    const uri = assets ? assets[0].uri : '';
    // const uri = fetchUserPfp();
    return (
        <View className="w-1/3 flex justify-center items-center p-3.5">
            <View className="w-full h-full flex-1 rounded-full aspect-square overflow-hidden">
                <Image source={{ uri }} className="w-full h-full" />
            </View>
        </View>
    )
}

const Stats = ({ currentTheme, numPosts, numClicks, numFriends }: { currentTheme: 'light' | 'dark', numPosts: number; numClicks: number; numFriends: number; }) => {
    return (
        <View className="w-full flex-row justify-around">
            <Stat label="Posts" num={numPosts} currentTheme={currentTheme} />
            <Stat label="Clicks" num={numClicks} currentTheme={currentTheme} />
            <Stat label="Friends" num={numFriends} currentTheme={currentTheme} />
        </View>
    )
}

const Stat = ({ currentTheme, num, label }: { currentTheme: 'dark' | 'light'; num: number; label: string }) => {
    return (
        <TouchableWithoutFeedback onPress={() => router.push({ pathname: '/(tabs)/profile/stat', params: { label } })}>
            <View className="flex justify-center items-center">
                <Text className="text-xl" style={{ color: theme[currentTheme].highColor }}>{num}</Text>
                <Text className="text-md" style={{ color: theme[currentTheme].highColor }}>{label}</Text>
            </View>
        </TouchableWithoutFeedback>
    )
}

const ProfileButton = ({ currentTheme, isMe }: { currentTheme: 'dark' | 'light', isMe: boolean | undefined }) => {
    return (
        <TouchableOpacity
            className="rounded-lg p-2 w-11/12 mt-3 flex justify-center items-center"
            style={{ backgroundColor: theme[currentTheme].highColor }}
            onPress={() => router.push('/(tabs)/profile/(modals)/edit')}
        >
            <Text className="font-semibold" style={{ color: theme[currentTheme].primary }}>{
                isMe === undefined || isMe === true ? 'Edit Profile' : 'Follow'
            }</Text>
        </TouchableOpacity>
    )
}

const UserInfo = ({ displayName, identifier, bio, currentTheme }: { displayName: string; identifier: string; bio: string, currentTheme: 'dark' | 'light' }) => {
    return (
        <View className="flex flex-col gap-0.5 pl-5 pr-5 pt-2 pb-0">
            <Text className="font-bold text-md" style={{ color: theme[currentTheme].highColor }}>{displayName}</Text>
            <Text className="text-md" style={{ color: theme[currentTheme].highColor }}>{identifier}</Text>
            <Text style={{ color: theme[currentTheme].highColor }}>{bio}</Text>
        </View>
    )
}

const SectionSelector = ({ activeSection, setActiveSection, currentTheme }: {
    activeSection: 'clicks' | 'posts' | 'reels';
    setActiveSection: SetStateType<'clicks' | 'posts' | 'reels'>;
    currentTheme: 'dark' | 'light';
}) => {
    return (
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
    )
}

const Highlights = ({ currentTheme }: { currentTheme: 'dark' | 'light' }) => {
    const userHighlights: string[] = [];
    // const userHighlights = fetchUserAssets();
    return (
        <View className="border-b-[1px]" style={{ borderColor: theme[currentTheme].highColor }}>
            <ScrollView horizontal={true} contentContainerStyle={{
                padding: 15,
                paddingBottom: 7.5,
                display: 'flex',
                flexDirection: 'row',
                gap: 7.5
            }}>
                {userHighlights.map((uri, i) => {
                    return (
                        <View key={i} className="flex justify-center items-center">
                            <StoryBubble uri={uri} key={i} currentTheme={currentTheme} />
                            <Text className="text-md" style={{ color: theme[currentTheme].highColor }}>Title</Text>
                        </View>
                    )
                })}
            </ScrollView>
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

const PostGrid = ({ currentTheme }: { currentTheme: 'dark' | 'light' }) => {
    const postGap = useMemo(() => Dimensions.get('window').width / (PixelRatio.get() * 100), []);
    const userPosts: string[] = [];
    // const userPosts = fetchUserPosts();
    if (userPosts.length === 0) {
        return (
            <View className="flex justify-center items-center m-8">
                <Text className="text-xl" style={{ color: theme[currentTheme].highColor }}>No posts yet...</Text>
            </View>
        )
    }
    return (
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
                {userPosts.map((uri, i) => <Post uri={uri} key={i} currentTheme={currentTheme} />)}
                <View className="absolute bottom-0 w-full h-[33vw] z-[1]" style={{ backgroundColor: theme[currentTheme].primary }} />
            </ScrollView>
        </View>
    )
}

const Post = ({ uri, currentTheme }: { uri: string; currentTheme: 'light' | 'dark'; }) => {
    return (
        <View className="w-[33vw] h-[33vw] aspect-square z-[2]" style={{ backgroundColor: theme[currentTheme].primary }}>
            <Image source={{ uri }} className="w-full h-full" />
        </View>
    )
}

export default Profile;