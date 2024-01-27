import { Stack } from "expo-router";

const Layout = () => {
    return (
        <Stack screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name='index' />
            <Stack.Screen name='settings' />
            <Stack.Screen name='scanner' />
            <Stack.Screen name='preview' />
            <Stack.Screen name='upload' options={{
                headerShown: true,
                headerTitle: 'Upload'
            }} />
            <Stack.Screen name='edit' options={{
                headerShown: true,
                headerTitle: 'Edit'
            }} />

        </Stack>
    )
}

export default Layout;