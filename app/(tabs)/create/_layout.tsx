import { Stack } from "expo-router";
import { SafeAreaView, View } from "react-native";

const Layout = () => {
    return (
        <Stack screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name='index' />
            <Stack.Screen name='devices' options={{
                headerShown: true,
            }} />
            <Stack.Screen name='preview' />
            <Stack.Screen name='scanner' />
        </Stack>
    )
}

export default Layout;