import { StyleSheet, View } from "react-native";
import type { InteractionsPropType } from "@/constants/types";
// To prevent cycle, we need to import SearchBar and MapViewButton from components/ComponentName
import SearchBar from "@/components/SearchBar";
import MapViewButton from "@/components/MapViewButton";

const Interactions = ({ projectionType, setProjectionType }: InteractionsPropType) => {
    return (
        <View style={styles.interactionsWrapper}>
            <SearchBar />
            <MapViewButton projectionType={projectionType} setProjectionType={setProjectionType} />
        </View>
    )
}

const styles = StyleSheet.create({
    interactionsWrapper: {
        position: 'absolute',
        top: 15,
        width: '100%',
        borderRadius: 10,
        zIndex: 2,
        display: 'flex',
        alignItems: 'center',
        gap: 5,
    }
})




export default Interactions;