import {
    Alert,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
} from "react-native"
import FAIcon from "react-native-vector-icons/FontAwesome"
import Btn from "../../../components/btn/Btn"
import { useContext, useState } from "react"
import { UserContext } from "../../../contexts/UserContext"
import AsyncStorage from "@react-native-async-storage/async-storage"
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from "firebase/auth"
import { auth } from "../../../firebase/config"

export default function SignInScreen({ navigation }) {
    const { setUser } = useContext(UserContext)
    const [authData, setAuthData] = useState({
        email: "",
        password: "",
    })

    const getInto = (key, value) => {
        AsyncStorage.setItem(key, JSON.stringify(value))
            .catch(() => {
                // saving error
            })
            .finally(() => setUser(value))
    }

    const login = async () => {
        // console.log(authData)
        try {
            const response = await signInWithEmailAndPassword(
                auth,
                authData.email,
                authData.password
            )
            getInto("@user", response.user)
        } catch (error) {
            if (error.code === "auth/user-not-found") {
                try {
                    const response = await createUserWithEmailAndPassword(
                        auth,
                        authData.email,
                        authData.password
                    )
                    getInto("@user", response.user)
                } catch (error) {
                    Alert.alert("Error al registrarse", error.message)
                }
            } else {
                Alert.alert("Error al Iniciar Sesión", error.message)
            }
        }
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.page}
            >
                <Text style={styles.title}>Top-Mind</Text>
                <Text style={styles.subtitle}>Inicio de sesión</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Correo electrónico"
                    keyboardType="email-address"
                    onChangeText={(value) =>
                        setAuthData({ ...authData, email: value })
                    }
                />
                <TextInput
                    style={styles.input}
                    placeholder="Contraseña"
                    secureTextEntry={true}
                    onChangeText={(value) =>
                        setAuthData({ ...authData, password: value })
                    }
                />
                <Btn text="Ingresar" mod_block onPress={() => login()}>
                    <FAIcon name="sign-in" size={20} color="rgba(0,0,0,0.5)" />
                </Btn>

                <TouchableOpacity
                    onPress={() => navigation.navigate("LandingScreen")}
                    style={styles.link}
                >
                    <Text style={styles.linkText}>Volver</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    page: {
        backgroundColor: "#ffffff",
        padding: 50,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    link: {},
    linkText: {
        color: "rgba(0,0,0,0.5)",
    },
    title: {
        fontSize: 17,
        fontWeight: "200",
        textAlign: "center",
        color: "rgba(0,0,0,0.5)",
        marginBottom: 5,
    },
    subtitle: {
        fontSize: 30,
        fontWeight: "300",
        textAlign: "center",
        color: "rgb(0,0,0)",
        marginBottom: 10,
    },
    input: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        marginBottom: 10,
        borderRadius: 5,
        borderColor: "#eeeeee",
        borderWidth: 1,
        width: "100%",
    },
})
