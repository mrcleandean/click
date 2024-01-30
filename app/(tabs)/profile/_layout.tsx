import { theme } from "@/constants/constants";
import { useThemeContext } from "@/context/themeProvider";
import { Stack } from "expo-router"

const ProfileLayout = () => {
    const { currentTheme } = useThemeContext();
    return (
        <Stack screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="(modals)/deactivate" options={{
                presentation: 'modal',
                headerShown: true,
                headerTitle: 'Deactivate Account',
                headerTitleStyle: {
                    color: theme[currentTheme === 'dark' ? 'light' : 'dark'].highColor
                },
                headerStyle: {
                    backgroundColor: theme[currentTheme === 'dark' ? 'light' : 'dark'].primary
                }
            }} />
            <Stack.Screen name="(modals)/delete" options={{
                presentation: 'modal',
                headerShown: true,
                headerTitle: 'Delete Account',
                headerTitleStyle: {
                    color: theme[currentTheme === 'dark' ? 'light' : 'dark'].highColor
                },
                headerStyle: {
                    backgroundColor: theme[currentTheme === 'dark' ? 'light' : 'dark'].primary
                }
            }} />
            <Stack.Screen name='(modals)/edit' options={{
                presentation: 'modal',
                headerShown: true,
                headerTitle: 'Edit Account',
                headerTitleStyle: {
                    color: theme[currentTheme === 'dark' ? 'light' : 'dark'].highColor
                },
                headerStyle: {
                    backgroundColor: theme[currentTheme === 'dark' ? 'light' : 'dark'].primary
                }
            }} />
            <Stack.Screen name="(modals)/settings" options={{
                presentation: 'modal',
                headerShown: true,
                headerTitle: 'Settings',
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