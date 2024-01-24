import { lightTheme } from "@/constants/constants";
import { Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { globalStyles } from "@/constants/globalStyles";
import { Link } from "expo-router";
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Stat = ({ statNum, statText }: { statNum: number, statText: string }) => {
    const statHref = `/${statText.toLowerCase()}`;
    return (
        <Link href={{
            pathname: "/modals/[stat]",
            params: { stat: statHref }
        }}>
            <View style={styles.statContainer}>
                <Text style={styles.statNum}>{statNum}</Text>
                <Text style={styles.statText}>{statText}</Text>
            </View>
        </Link>
    )
}

const Click = () => {
    return (
        <View style={[styles.clickContainer, globalStyles.shadowBorder]}>
            <View style={styles.clickLeft}>
                <View style={styles.clickStatus} />
                <Text style={styles.clickTitle}>Click</Text>
            </View>
            <View style={styles.clickRight}>
                <MaterialCommunityIcons name="dots-vertical" size={24} color={lightTheme.primary} />
            </View>
        </View>
    )
}

const Profile = () => {
    return (
        <SafeAreaView style={styles.profileWrapper} edges={['right', 'left', 'top']}>
            <View style={styles.upper}>
                <View style={styles.upperLeft}>
                    <View style={[styles.pictureContainer, globalStyles.shadowBorder]}>
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
                        <Stat statNum={0} statText="Posts" />
                        <Stat statNum={0} statText="Clicks" />
                        <Stat statNum={0} statText="Friends" />
                    </View>
                    <TouchableOpacity style={styles.editProfileButton}>
                        <Text style={styles.editProfileText}>Edit Profile</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.midUpper}>
                <Text style={styles.username}>Username</Text>
                <Text style={styles.displayName}>Display Name</Text>
                <Text style={styles.bio}>BioBio BioBio BioBio BioBio BioBio BioBio BioBio</Text>
            </View>
            <ScrollView style={styles.lower} contentContainerStyle={styles.lowerContentContainer}>
                {Array.from({ length: 40 }).map((_, i) => <Click key={i} />)}
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
        backgroundColor: lightTheme.secondary
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
        backgroundColor: lightTheme.primary,
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
        backgroundColor: lightTheme.secondary,
        flex: 0.5,
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: lightTheme.lowColor,
        borderWidth: 1,
    },
    editProfileText: {
        color: lightTheme.highColor,
        padding: 5,
    },
    statContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    statNum: {
        fontSize: 18,
        fontWeight: 'bold',
        color: lightTheme.highColor
    },
    statText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: lightTheme.highColor
    },
    midUpper: {
        backgroundColor: lightTheme.secondary,
        width: '100%',
        display: 'flex',
        gap: 5,
        padding: 20,
        paddingTop: 10,
        paddingBottom: 10,
        justifyContent: 'space-around',
        borderColor: lightTheme.lowColor,
        borderBottomWidth: 1,
    },
    username: {
        fontSize: 20,
        fontWeight: 'bold',
        color: lightTheme.highColor
    },
    displayName: {
        fontSize: 13.5,
        fontWeight: 'bold',
        color: lightTheme.highColor
    },
    bio: {
        fontSize: 12.5,
        color: lightTheme.highColor
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
        backgroundColor: lightTheme.secondary,
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