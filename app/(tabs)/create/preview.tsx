import { useLocalSearchParams } from "expo-router";
import { SafeAreaView, Text, View } from "react-native"
import { Image } from 'expo-image';
import { Video } from 'expo-av';
const Preview = () => {
    const { uri, type } = useLocalSearchParams<{ uri: string, type: 'photo' | 'video' }>();
    console.log(uri, type);
    return (
        <SafeAreaView className="flex-[1]">
            <View className="flex-[1] flex justify-center items-center">
                {type === 'photo'
                    ? (
                        <Image source={{ uri }} />
                    ) : (
                        <Video source={{ uri }} />
                    )
                }
            </View>
        </SafeAreaView>
    )
}

export default Preview;