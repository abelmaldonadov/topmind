import { StyleSheet, Text, TouchableOpacity, View } from "react-native"

export default function Note({
    title,
    text,
    color,
    onPress,
    onLongPress,
    height,
}) {
    return (
        <TouchableOpacity
            style={[
                color
                    ? { ...styles.container, backgroundColor: color }
                    : styles.container,
                height && { height: height },
            ]}
            onPress={onPress}
            onLongPress={onLongPress}
        >
            {title && (
                <Text style={styles.title} numberOfLines={2}>
                    {title}
                </Text>
            )}
            {text && (
                <Text style={styles.text} numberOfLines={4}>
                    {text}
                </Text>
            )}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#ffd111",
        padding: 20,
        borderRadius: 10,
        marginBottom: 13,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
    },
    title: {
        fontSize: 18,
        fontWeight: "500",
        color: "rgb(0,0,0)",
        textAlign: "center",
        marginBottom: 5,
    },
    text: {
        fontSize: 14,
        fontWeight: "400",
        color: "rgba(0,0,0,0.5)",
        textAlign: "center",
    },
})
