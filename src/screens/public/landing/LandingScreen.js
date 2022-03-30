import { Image, StyleSheet, Text, View } from "react-native"
import { StatusBar } from "expo-status-bar"
import Btn from "../../../components/btn/Btn"
import IIcon from "react-native-vector-icons/Ionicons"

export default function LandingScreen({ navigation }) {
    return (
        <>
            <Image
                source={require(`../../../../assets/images/notes/1.jpg`)}
                style={styles.cover}
            />
            <View style={styles.page}>
                <Text style={styles.title}>Top-Mind</Text>
                <Text style={styles.subtitle}>
                    Todo comenzó con una idea pegajosa
                </Text>
                <Btn
                    text="Tengo una idea"
                    onPress={() => navigation.navigate("SignInScreen")}
                >
                    <IIcon
                        name="trail-sign-outline"
                        size={20}
                        color="rgba(0,0,0,0.5)"
                    />
                </Btn>

                <StatusBar style="auto" />
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    page: {
        backgroundColor: "#ffffff",
        paddingHorizontal: 75,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    cover: {
        width: "100%",
        height: "50%",
    },
    title: {
        fontSize: 60,
        fontWeight: "300",
        textAlign: "center",
        color: "rgb(0,0,0)",
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 20,
        fontWeight: "200",
        textAlign: "center",
        color: "rgba(0,0,0,0.5)",
        marginBottom: 20,
    },
})
