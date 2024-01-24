import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { theme } from "@/constants/constants";
import { useThemeContext } from "@/context/useThemeContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { Link } from "expo-router";
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Stat = ({ statNum, statText, currentTheme }: { statNum: number, statText: string, currentTheme: 'light' | 'dark' }) => {
    const statHref = `/${statText.toLowerCase()}`;
    return (
        <Link href={{
            pathname: "/modals/[stat]",
            params: { stat: statHref }
        }}>
            <View style={styles.statContainer}>
                <Text style={[styles.statNum, { color: theme[currentTheme].highColor }]}>{statNum}</Text>
                <Text style={[styles.statText, { color: theme[currentTheme].highColor }]}>{statText}</Text>
            </View>
        </Link>
    )
}

const Click = ({ currentTheme }: { currentTheme: 'light' | 'dark' }) => {
    return (
        <View style={[styles.clickContainer, theme[currentTheme].shadowBorder, { backgroundColor: theme[currentTheme].secondary }]}>
            <View style={styles.clickLeft}>
                <View style={styles.clickStatus} />
                <Text style={styles.clickTitle}>Click</Text>
            </View>
            <View style={styles.clickRight}>
                <MaterialCommunityIcons name="dots-vertical" size={24} color={theme[currentTheme].primary} />
            </View>
        </View>
    )
}

const Profile = () => {
    const { currentTheme } = useThemeContext();
    return (
        <SafeAreaView style={[styles.profileWrapper, { backgroundColor: theme[currentTheme].secondary }]} edges={['right', 'left', 'top']}>
            <View style={styles.upper}>
                <View style={styles.upperLeft}>
                    <View style={[styles.pictureContainer, theme[currentTheme].shadowBorder, { backgroundColor: theme[currentTheme].primary }]}>
                        <Image
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'contain'
                            }}
                            source={'https://media.istockphoto.com/id/93218228/photo/portrait-of-chimpanzee-playing-with-a-laptop-against-white-background.jpg?s=612x612&w=0&k=20&c=TzYhniW8Wjc1Fvb_1mf2McrAs3LG_cvpi9tZ7wR0Xvo='}
                        />
                    </View>
                </View>
                <View style={styles.upperRight}>
                    <View style={styles.statsWrapper}>
                        <Stat statNum={0} statText="Posts" currentTheme={currentTheme} />
                        <Stat statNum={0} statText="Clicks" currentTheme={currentTheme} />
                        <Stat statNum={0} statText="Friends" currentTheme={currentTheme} />
                    </View>
                    <TouchableOpacity style={[styles.editProfileButton, { backgroundColor: theme[currentTheme].secondary, borderColor: theme[currentTheme].lowColor }]}>
                        <Text style={[styles.editProfileText, { color: theme[currentTheme].highColor }]}>Edit Profile</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={[styles.midUpper, { backgroundColor: theme[currentTheme].secondary, borderColor: theme[currentTheme].lowColor }]}>
                <Text style={[styles.username, { color: theme[currentTheme].highColor }]}>Username</Text>
                <Text style={[styles.displayName, { color: theme[currentTheme].highColor }]}>Display Name</Text>
                <Text style={[styles.bio, { color: theme[currentTheme].highColor }]}>BioBio BioBio BioBio BioBio BioBio BioBio BioBio</Text>
            </View>
            <ScrollView style={styles.lower} contentContainerStyle={styles.lowerContentContainer}>
                {Array.from({ length: 40 }).map((_, i) => <Click currentTheme={currentTheme} key={i} />)}
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    profileWrapper: {
        flex: 1,
        display: 'flex',
        gap: 0,
        alignItems: 'center',
    },
    upper: {
        width: '100%',
        padding: 20,
        paddingBottom: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    pictureContainer: {
        width: 85,
        height: 85,
        borderRadius: 20,
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    upperLeft: {
        width: '35%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
    },
    upperRight: {
        width: '65%',
        height: '100%',
        marginTop: 9,
        display: 'flex',
    },
    statsWrapper: {
        width: '100%',
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    editProfileButton: {
        width: '100%',
        flex: 0.5,
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
    },
    editProfileText: {
        padding: 5,
    },
    statContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    statNum: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    statText: {
        fontSize: 12,
        fontWeight: 'bold'
    },
    midUpper: {
        width: '100%',
        display: 'flex',
        gap: 5,
        padding: 20,
        paddingTop: 10,
        paddingBottom: 10,
        justifyContent: 'space-around',
        borderBottomWidth: 1,
    },
    username: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    displayName: {
        fontSize: 13.5,
        fontWeight: 'bold'
    },
    bio: {
        fontSize: 12.5
    },
    lower: {
        width: '100%',
    },
    lowerContentContainer: {
        padding: 18.5,
        display: 'flex',
        flexDirection: 'column',
        gap: 7.5
    },
    clickContainer: {
        borderRadius: 15,
        padding: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    clickLeft: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        gap: 10
    },
    clickRight: {
        flex: 4,
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    clickStatus: {
        width: 16.5,
        height: 16.5,
        borderRadius: 17.5,
        backgroundColor: '#ADD8E6'
    },
    clickTitle: {
        fontSize: 20,
    }
})

export default Profile;