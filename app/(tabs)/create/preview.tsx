import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { FontAwesome6, MaterialIcons } from '@expo/vector-icons';
import { Dimensions, Pressable, SafeAreaView, Text, View, TouchableOpacity, TouchableWithoutFeedback } from "react-native"
import { Image } from 'expo-image';
import { AVPlaybackStatus, Video } from 'expo-av';
import Animated, { Easing, useSharedValue, withTiming } from "react-native-reanimated";
import { tabBarHeight, theme } from "@/constants/constants";
import { useCallback, useEffect, useRef, useState } from "react";
import { useIsForeground } from "@/hooks";

const Preview = () => {
    const { uri, type } = useLocalSearchParams<{ uri: string, type: 'photo' | 'video' }>();
    const windowWidth = Dimensions.get('window').width;
    const playing = useRef(true);
    const videoRef = useRef<Video | null>(null);
    const positionWidth = useSharedValue(0);
    const [isFocused, setIsFocused] = useState(false);
    useFocusEffect(
        useCallback(() => {
            setIsFocused(true);
            return () => setIsFocused(false);
        }, [])
    );
    const isForeground = useIsForeground();
    const isActive = isFocused && isForeground;
    useEffect(() => {
        (async () => {
            if (!videoRef.current) return;
            try {
                if (!isActive) {
                    const status = await videoRef.current.pauseAsync();
                    pausePositionWidth(status)
                } else if (playing.current) {
                    const status = await videoRef.current.playAsync();
                    playPositionWidth(status);
                }
            } catch (e) {
                console.log(e);
            }
        })();
    }, [isActive]);

    const setPositionWidth = (status: AVPlaybackStatus) => {
        if (status?.isLoaded && status.durationMillis && status.didJustFinish) {
            positionWidth.value = 0;
            positionWidth.value = withTiming(windowWidth, {
                duration: status.durationMillis,
                easing: Easing.linear
            })
        }
    }

    const pausePositionWidth = (status: AVPlaybackStatus) => {
        if (status?.isLoaded && status.durationMillis) {
            positionWidth.value = (status.positionMillis / status.durationMillis) * windowWidth;
        }
    }

    const playPositionWidth = (status: AVPlaybackStatus) => {
        if (status?.isLoaded && status.durationMillis) {
            positionWidth.value = (status.positionMillis / status.durationMillis) * windowWidth;
            positionWidth.value = withTiming(windowWidth, {
                duration: status.durationMillis - status.positionMillis,
                easing: Easing.linear
            })
        }
    }

    const togglePlay = async () => {
        if (!videoRef.current) return;
        try {
            if (playing.current) {
                const status = await videoRef.current.pauseAsync();
                pausePositionWidth(status)
                playing.current = false;
            } else {
                const status = await videoRef.current.playAsync();
                playPositionWidth(status);
                playing.current = true;
            }
        } catch (e) {
            console.log(e);
        }
    }
    return (
        <SafeAreaView className="flex-[1]">
            <View className="flex-[1] flex justify-center items-center bg-blue-500 object-cover">
                {type === 'photo'
                    ? (
                        <Image source={{ uri }} className="w-full h-full object-contain" />
                    ) : (
                        <Video
                            source={{ uri }}
                            className="h-full aspect-video object-contain"
                            isLooping={true}
                            onPlaybackStatusUpdate={status => setPositionWidth(status)}
                            progressUpdateIntervalMillis={100}
                            ref={videoRef}
                        />
                    )
                }
                <TouchableWithoutFeedback onPress={togglePlay}>
                    <View className="absolute top-0 right-0 bottom-0 left-0 flex justify-between items-start">
                        <Pressable className="top-6 left-6" onPress={() => router.back()}>
                            <MaterialIcons name="close" size={35} color={theme['dark'].highColor} />
                        </Pressable>
                        <View className="w-full flex flex-col" style={{ bottom: tabBarHeight + 10 }}>
                            <View className="flex justify-between flex-row p-4">
                                <TouchableOpacity
                                    onPress={() => router.push({ pathname: '/(tabs)/create/edit', params: { uri, type } })}
                                    className="pl-2 pr-2 pt-1 pb-1 rounded-md flex flex-row items-center justify-center"
                                    style={{ backgroundColor: theme.light.primary }}
                                >
                                    <Text className="text-lg">Edit</Text>
                                    <FontAwesome6 name="edit" size={17} color={theme.light.highColor} style={{ marginLeft: 6 }} />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => router.push({ pathname: '/(tabs)/create/upload', params: { uri, type } })}
                                    className="pl-2 pr-0.5 pt-1 pb-1 rounded-md flex flex-row items-center justify-center"
                                    style={{ backgroundColor: theme.light.primary }}
                                >
                                    <Text className="text-lg">Next</Text>
                                    <MaterialIcons name="navigate-next" size={21} color="black" />
                                </TouchableOpacity>
                            </View>
                            <Animated.View style={{ height: 10, width: positionWidth, backgroundColor: theme.light.primary }} />
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        </SafeAreaView>
    )
}

export default Preview;