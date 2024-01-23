import { StyleSheet, View } from "react-native";
import type { InteractionsPropType } from "@/constants/types";
import { SearchBar, MapViewButton } from "@/components";

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
        top: 75,
        width: '100%',
        borderRadius: 10,
        zIndex: 2,
        display: 'flex',
        alignItems: 'center',
        gap: 10,
    }
})




export default Interactions;