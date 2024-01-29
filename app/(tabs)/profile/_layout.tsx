import { theme } from "@/constants/constants";
import { useThemeContext } from "@/context/themeProvider";
import { Stack } from "expo-router"

const ProfileLayout = () => {
    const { currentTheme } = useThemeContext();
    const modalOptions = {
        presentation: 'modal',
        headerShown: true,
        headerTitle: 'Deactivate Account',
        headerTitleStyle: {
            color: theme[currentTheme === 'dark' ? 'light' : 'dark'].highColor
        },
        headerStyle: {
            backgroundColor: theme[currentTheme === 'dark' ? 'light' : 'dark'].primary
        }
    } as unknown as undefined;
    return (
        <Stack screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="(modals)/deactivate" options={modalOptions} />
            <Stack.Screen name="(modals)/delete" options={modalOptions} />
            <Stack.Screen name='(modals)/edit' options={modalOptions} />
            <Stack.Screen name="(modals)/settings" options={modalOptions} />
        </Stack>
    )
}

export default ProfileLayout;