import { useUserContext } from "@/context/useUserContext";
import { Redirect } from "expo-router";
import { useEffect } from "react";
import { SafeAreaView, Text, View } from "react-native"

const Initial = () => {
    const { userAuth } = useUserContext();

    if (userAuth === 'initial') {
        return (
            <SafeAreaView className="flex-[1]">
                <View className="flex-[1] flex justify-center items-center">
                    <Text>Loading...</Text>
                </View>
            </SafeAreaView>
        )
    }
    if (userAuth === null) {
        return <Redirect href="/(auth)/login" />
    }

    return <Redirect href="/(tabs)/globe" />
}

export default Initial;