import { View, StyleSheet, Text } from "react-native"
import FAIcon from "react-native-vector-icons/FontAwesome"

export default function Avatar({ name }) {
    return (
        <>
            <View style={styles.container}>
                <View style={styles.photo}>
                    <FAIcon name="rocket" size={15} color="#000" />
                </View>
                <Text style={styles.text} numberOfLines={1}>
                    {name}
                </Text>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        top: 0,
        flexDirection: "row",
        alignItems: "center",
        padding: 20,
    },
    photo: {
        width: 30,
        height: 30,
        backgroundColor: "#ffffff",
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        paddingLeft: 10,
        color: "rgba(0,0,0,0.25)",
    },
})
