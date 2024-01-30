import { SafeAreaView, ScrollView, Text, View, TouchableOpacity, Dimensions, PixelRatio, Pressable, TouchableWithoutFeedback } from "react-native"
import { theme } from "@/constants/constants";
import { MaterialIcons, FontAwesome6 } from '@expo/vector-icons';
import { useThemeContext } from "@/context/themeProvider";
import { Image } from 'expo-image';
import { useAssets } from 'expo-asset';
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { useUser } from "@/context/userProvider";
import { SetStateType, UserDocType } from "@/constants/types";
import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { useLoadedAssets } from "@/app/_layout";

const ViewedUserContext = createContext<{ viewedUser: (FirebaseFirestoreTypes.DocumentData & UserDocType) | undefined, setViewedUser: SetStateType<(FirebaseFirestoreTypes.DocumentData & UserDocType) | undefined> } | undefined>(undefined);

const useViewed = () => {
    const context = useContext(ViewedUserContext);
    if (!context) {
        throw new Error('useViewed must be used within a ViewedProvider');
    }
    return context;
}

const ViewedProvider = () => {
    const [viewedUser, setViewedUser] = useState<(FirebaseFirestoreTypes.DocumentData & UserDocType) | undefined>(undefined);
    const { userDoc } = useUser();
    const { userId } = useLocalSearchParams();
    useEffect(() => {
        if (userId === undefined) {
            setViewedUser(userDoc);
        } else {
            firestore().collection('users').doc(userId as string).get().then(snapshot => {
                const snapshotData = snapshot.data() as FirebaseFirestoreTypes.DocumentData & UserDocType;
                setViewedUser(snapshotData);
            });
        }
    }, []);
    return (
        <ViewedUserContext.Provider value={{ viewedUser, setViewedUser }}>
            <Profile />
        </ViewedUserContext.Provider>
    )
}

// asset square may not be supported on all devices 
const Profile = () => {
    const { currentTheme } = useThemeContext();
    const { viewedUser } = useViewed();
    const { userAuth, loadedAuth, userDoc } = useUser();
    const [activeSection, setActiveSection] = useState<'clicks' | 'posts' | 'reels'>('posts');

    if (!userAuth || !userDoc || !viewedUser || !loadedAuth) {
        return (
            <SafeAreaView className="flex-1">
                <View className="flex-1 flex justify-center items-center">
                    <Text>Loading</Text>
                </View>
            </SafeAreaView>
        )
    }

    return (
        <SafeAreaView className="flex-1" style={{ backgroundColor: theme[currentTheme].primary }}>
            <View className='flex flex-row' style={{ backgroundColor: theme[currentTheme].primary }}>
                <ProfilePicture currentTheme={currentTheme} />
                <View className="w-2/3 flex pt-5 pb-1 pl-4 pr-4 items-center justify-center">
                    <Stats currentTheme={currentTheme} />
                    <ProfileButton currentTheme={currentTheme} />
                </View>
            </View>
            <UserInfo currentTheme={currentTheme} />
            <Highlights currentTheme={currentTheme} />
            <SectionSelector activeSection={activeSection} setActiveSection={setActiveSection} currentTheme={currentTheme} />
            {activeSection === 'posts' ? <PostGrid currentTheme={currentTheme} /> : activeSection === 'clicks' ? <Text>Clicks</Text> : <Text>Reels</Text>}
        </SafeAreaView>
    )
}

const ProfilePicture = ({ currentTheme }: { currentTheme: 'light' | 'dark' }) => {
    const { uris } = useLoadedAssets();
    const { viewedUser } = useViewed();
    if (viewedUser === undefined) return;

    const { profilePicture } = viewedUser;
    const fallbackUri = uris[0];
    const imgUri = profilePicture ? profilePicture : uris ? uris[0] : undefined;

    return (
        <View className="w-1/3 flex justify-center items-center p-3.5">
            <View className="w-full h-full flex-1 rounded-full aspect-square overflow-hidden" style={{ backgroundColor: theme[currentTheme].highColor }}>
                <Image source={{ uri: imgUri }} className={`w-full h-full ${imgUri === fallbackUri && 'scale-125'}`} />
            </View>
        </View>
    )
}

const Stats = ({ currentTheme }: { currentTheme: 'light' | 'dark' }) => {
    const { viewedUser } = useViewed();
    if (viewedUser === undefined) return;

    return (
        <View className="w-full flex-row justify-around">
            <Stat label="Posts" num={viewedUser.posts} currentTheme={currentTheme} />
            <Stat label="Clicks" num={viewedUser.clicks} currentTheme={currentTheme} />
            <Stat label="Friends" num={viewedUser.friends} currentTheme={currentTheme} />
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

const ProfileButton = ({ currentTheme }: { currentTheme: 'dark' | 'light' }) => {
    const { userDoc, userAuth } = useUser();
    const { viewedUser } = useViewed();
    if (viewedUser === undefined || userAuth === null || userDoc === undefined) return;
    const isMe = userDoc.username === viewedUser.username && userDoc.email === viewedUser.email && userDoc.fullName === viewedUser.fullName && userDoc.identifier === viewedUser.identifier && userDoc.bio === viewedUser.bio && userDoc.profilePicture === viewedUser.profilePicture && userDoc.posts === viewedUser.posts && userDoc.clicks === viewedUser.clicks && userDoc.friends === viewedUser.friends;
    return (
        <TouchableOpacity
            className="rounded-lg p-2 w-11/12 mt-3 flex justify-center items-center"
            style={{ backgroundColor: theme[currentTheme].highColor }}
            onPress={() => {
                if (isMe) {
                    router.push('/(tabs)/profile/(modals)/edit')
                } else {
                    router.push('/placeholder')
                }
            }}
        >
            <Text className="font-semibold" style={{ color: theme[currentTheme].primary }}>{
                isMe ? 'Edit Profile' : 'Follow'
            }</Text>
        </TouchableOpacity>
    )
}

const UserInfo = ({ currentTheme }: { currentTheme: 'dark' | 'light' }) => {
    const { viewedUser } = useViewed();
    if (viewedUser === undefined) return;
    const { fullName, identifier, bio } = viewedUser;

    return (
        <View className="flex flex-col gap-0.5 pl-5 pr-5 pt-2 pb-0">
            <Text className="font-bold text-md" style={{ color: theme[currentTheme].highColor }}>{fullName}</Text>
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

export default ViewedProvider;