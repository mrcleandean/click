import { Stack } from "expo-router"

const Layout = () => {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="login" />
            <Stack.Screen name="signup" />
        </Stack>
    )
}

export default Layout;