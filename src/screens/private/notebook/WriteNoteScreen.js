import {
    Alert,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from "react-native"
import FAIcon from "react-native-vector-icons/FontAwesome"
import Btn from "../../../components/btn/Btn"
import { useContext, useState } from "react"
import { UserContext } from "../../../contexts/UserContext"
import { addDoc, collection } from "firebase/firestore"
import { db } from "../../../firebase/config"
import Loader from "../../../components/loader/Loader"
import { ColorContext } from "../../../contexts/ColorContext"

export default function WriteNoteScreen({ navigation }) {
    const [isLoading, setLoading] = useState(false)
    const { user } = useContext(UserContext)
    const { colors } = useContext(ColorContext)
    const [note, setNote] = useState({
        title: "",
        text: "",
        color: colors[2],
    })

    const send = async () => {
        if (!note.title || !note.text) {
            Alert.alert("Error", "Los campos no pueden estar vacíos")
        } else {
            setLoading(true)
            try {
                const docRef = await addDoc(collection(db, "notes"), {
                    ...note,
                    userId: user.email,
                })
                console.log("Document written with ID: ", docRef.id)
                navigation.navigate("NotebookScreen")
            } catch (e) {
                console.error("Error adding document: ", e)
                Alert.alert("Save error")
            } finally {
                setLoading(false)
            }
        }
    }

    if (isLoading) {
        return <Loader />
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.page}
            >
                <View style={styles.colors}>
                    {colors.map((item) => (
                        <TouchableOpacity
                            key={item}
                            onPress={() => setNote({ ...note, color: item })}
                            style={{
                                ...styles.color,
                                backgroundColor: item,
                            }}
                        />
                    ))}
                </View>
                <View
                    style={{ ...styles.container, backgroundColor: note.color }}
                >
                    <TextInput
                        multiline={true}
                        maxLength={40}
                        placeholder="Título"
                        style={styles.title}
                        onChangeText={(value) =>
                            setNote({ ...note, title: value })
                        }
                    />
                    <TextInput
                        multiline={true}
                        maxLength={200}
                        placeholder="Cuerpo del pensamiento"
                        style={styles.text}
                        onChangeText={(value) =>
                            setNote({ ...note, text: value })
                        }
                    />
                </View>
                <Btn text="Publicar" onPress={() => send()}>
                    <FAIcon name="send-o" size={20} color="#000000" />
                </Btn>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    container: {
        borderRadius: 10,
        paddingHorizontal: 40,
        justifyContent: "center",
        alignItems: "center",
        width: 300,
        height: 300,
        position: "relative",
        marginBottom: 15,
    },
    colors: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 15,
        width: 300,
    },
    color: {
        width: 37,
        height: 37,
        borderRadius: 5,
    },
    title: {
        fontSize: 26,
        fontWeight: "400",
        marginBottom: 10,
        textAlign: "center",
    },
    text: {
        fontSize: 15,
        fontWeight: "300",
        textAlign: "center",
        color: "rgba(0,0,0,0.5)",
    },
})
