import { ScrollView, StyleSheet, Text, View } from "react-native"
import Btn from "../../../components/btn/Btn"
import { useContext, useEffect } from "react"
import { UserContext } from "../../../contexts/UserContext"
import AsyncStorage from "@react-native-async-storage/async-storage"
import FAIcon from "react-native-vector-icons/FontAwesome"
import MIcon from "react-native-vector-icons/MaterialIcons"
import Space from "../../../components/space/Space"

export default function UserScreen({ navigation }) {
    const { user, setUser } = useContext(UserContext)

    useEffect(() => {
        console.log(user)
    }, [])

    const logout = () => {
        AsyncStorage.setItem("@user", JSON.stringify(undefined))
            .catch(() => {
                // saving error
            })
            .finally(() => setUser(undefined))
    }

    return (
        <ScrollView style={styles.page}>
            <View style={styles.container}>
                <View style={styles.photo}>
                    <FAIcon name="rocket" size={50} color="#000" />
                </View>
                <Text style={styles.user} numberOfLines={1}>
                    {user.email}
                </Text>
            </View>

            <View style={styles.container}>
                <View style={styles.header}>
                    <MIcon name="face" size={20} color="#000" />
                    <Text style={styles.headerText}>Información</Text>
                </View>

                <View style={styles.line}>
                    <Text style={styles.label}>ID Usuario:</Text>
                    <Text style={styles.value} numberOfLines={1}>
                        {user.email}
                    </Text>
                </View>
                <View style={styles.line}>
                    <Text style={styles.label}>Nombre:</Text>
                    <Text style={styles.value} numberOfLines={1}>
                        {user.email}
                    </Text>
                </View>
                <View style={styles.line}>
                    <Text style={styles.label}>Correo:</Text>
                    <Text style={styles.value} numberOfLines={1}>
                        {user.email}
                    </Text>
                </View>
                <View style={styles.line}>
                    <Text style={styles.label}>Verificación:</Text>
                    <Text style={styles.value} numberOfLines={1}>
                        {user.emailVerified ? "Sí" : "No"}
                    </Text>
                </View>
                <View style={styles.line}>
                    <Text style={styles.label}>Fecha de Registro:</Text>
                    <Text style={styles.value} numberOfLines={1}>
                        {user.createdAt}
                    </Text>
                </View>
                <View style={styles.line}>
                    <Text style={styles.label}>Último Acceso:</Text>
                    <Text style={styles.value} numberOfLines={1}>
                        {user.lastLoginAt}
                    </Text>
                </View>
                <View style={styles.line}>
                    <Text style={styles.label}>API Key:</Text>
                    <Text style={styles.value} numberOfLines={1}>
                        {user.apiKey}
                    </Text>
                </View>
                <Space size={15} />
                <Btn text="Salir" onPress={() => logout()}>
                    <FAIcon name="sign-out" size={20} color="#000000" />
                </Btn>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    page: {
        padding: 20,
    },
    container: {
        backgroundColor: "#ffffff",
        borderRadius: 10,
        padding: 25,
        marginBottom: 15,
        alignItems: "center",
    },
    photo: {
        backgroundColor: "#f8f8f8",
        width: 100,
        height: 100,
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20,
    },
    user: {
        color: "rgba(0,0,0,0.5)",
        fontSize: 16,
        fontWeight: "400",
    },
    header: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
    },
    headerText: {
        fontWeight: "500",
        fontSize: 20,
        marginLeft: 5,
    },
    line: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 5,
    },
    label: {
        fontWeight: "400",
        fontSize: 13,
    },
    value: {
        fontWeight: "300",
        fontSize: 13,
        color: "rgba(0,0,0,0.5)",
        maxWidth: 220,
    },
})
