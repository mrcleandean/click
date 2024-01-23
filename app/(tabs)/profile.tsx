import { lightTheme } from "@/constants/constants";
import { StyleSheet, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context";

const Profile = () => {
    return (
        <SafeAreaView style={styles.profileWrapper}>
            <Text style={styles.title}>Profile</Text>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    profileWrapper: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: lightTheme.highColor
    }
})

export default Profile;