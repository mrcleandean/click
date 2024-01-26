import { theme } from "@/constants/constants";
import { useThemeContext } from "@/context/useThemeContext";
import { Stack } from "expo-router"

const ProfileLayout = () => {
    const { currentTheme } = useThemeContext();
    return (
        <Stack screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="settings-m" options={{
                presentation: 'modal',
                headerShown: true,
                headerTitle: 'Settings'
            }} />
            <Stack.Screen name="edit-m" options={{
                presentation: 'modal',
                headerShown: true,
                headerTitle: 'Edit Profile',
                headerTitleStyle: {
                    color: theme[currentTheme === 'dark' ? 'light' : 'dark'].highColor
                },
                headerStyle: {
                    backgroundColor: theme[currentTheme === 'dark' ? 'light' : 'dark'].primary
                }
            }} />
        </Stack>
    )
}

export default ProfileLayout;