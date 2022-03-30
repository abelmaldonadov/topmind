import { ActivityIndicator, StyleSheet, View } from "react-native"

export default function Loader(props) {
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color="#9e9e9e" />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
})
