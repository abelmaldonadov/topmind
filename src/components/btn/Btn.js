import { StyleSheet, Text, TouchableOpacity } from "react-native"

export default function Btn({ mod_block, text, color, onPress, children }) {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={[
                color
                    ? { ...styles.button, backgroundColor: color }
                    : styles.button,
                mod_block && styles.block,
            ]}
        >
            {children && children}
            {text && <Text style={styles.buttonText}>{text}</Text>}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: "#ffd111",
        padding: 15,
        // transform: [{ rotate: "-6deg" }],
        borderRadius: 10,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 10,
    },
    buttonText: {
        fontSize: 18,
        fontWeight: "300",
        textAlign: "center",
        color: "rgb(0,0,0)",
        paddingHorizontal: 5,
    },
    block: {
        width: "100%",
    },
})
