import { useLocalSearchParams } from "expo-router";
import { SafeAreaView, Text, View } from "react-native"

const Upload = () => {
    const { uri, type } = useLocalSearchParams<{ uri: string, type: 'photo' | 'video' }>();
    console.log(uri, type);
    return (
        <SafeAreaView className="flex-[1] flex justify-center items-center">
            <View className="flex-[1] flex justify-center items-center">
                <Text>Upload</Text>
            </View>
        </SafeAreaView>
    )
}

export default Upload;