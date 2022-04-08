import { StyleSheet, Text, TouchableOpacity } from "react-native"

export default function Post({
    title,
    text,
    color,
    onPress,
    onLongPress,
    avatar,
    indications,
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
            {avatar}
            {title && (
                <Text style={styles.title} numberOfLines={2}>
                    {title}
                </Text>
            )}
            {text && (
                <Text style={styles.text} numberOfLines={10}>
                    {text}
                </Text>
            )}
            {indications && (
                <Text style={styles.indications}>{indications}</Text>
            )}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#ffd111",
        paddingHorizontal: 40,
        paddingVertical: 80,
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
    indications: {
        position: "absolute",
        bottom: 0,
        padding: 20,
        width: "100%",
        color: "rgba(0,0,0,0.2)",
        fontSize: 10,
        textAlign: "center",
    },
})
