import { Redirect } from "expo-router";
import { useEffect } from "react";
import { SafeAreaView, Text, View } from "react-native"

const Initial = () => {
    return <Redirect href="/(tabs)/globe" />
}

export default Initial;