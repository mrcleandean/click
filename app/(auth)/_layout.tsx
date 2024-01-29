import { Stack } from "expo-router"

const Layout = () => {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="login" />
            <Stack.Screen name="signup" />
            <Stack.Screen name="two-factor-auth" />
        </Stack>
    )
}

export default Layout;