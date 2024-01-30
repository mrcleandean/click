import { useUser } from "@/context/userProvider";
import { Redirect, SplashScreen } from "expo-router";
import { SafeAreaView, Text, View } from "react-native"

const Initial = () => {
    const { userAuth, loadedAuth } = useUser();
    if (!loadedAuth) {
        return (
            <SafeAreaView className="flex-[1]">
                <View className="flex-[1] flex justify-center items-center">
                    <Text>Loading</Text>
                </View>
            </SafeAreaView>
        )
    }
    if (userAuth) {
        return (
            <Redirect href="/(tabs)/globe" />
        )
    }
    return <Redirect href="/(auth)/login" />
}

export default Initial;