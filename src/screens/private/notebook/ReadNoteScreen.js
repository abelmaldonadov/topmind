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
    View,
} from "react-native"
import { useContext, useEffect, useState } from "react"
import Loader from "../../../components/loader/Loader"
import { deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore"
import { db } from "../../../firebase/config"
import FIcon from "react-native-vector-icons/Feather"
import FAIcon from "react-native-vector-icons/FontAwesome"
import Btn from "../../../components/btn/Btn"
import { ColorContext } from "../../../contexts/ColorContext"

export default function ReadNoteScreen({ navigation, route }) {
    const { noteId } = route.params
    const [isLoading, setLoading] = useState(true)
    const { colors } = useContext(ColorContext)
    const [note, setNote] = useState(undefined)

    const getNote = async () => {
        const docRef = doc(db, "notes", noteId)
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data())
            setNote(docSnap.data())
        } else {
            console.log("No such document!")
            navigation.navigate("NotebookScreen")
        }
    }

    useEffect(() => {
        getNote().finally(() => setLoading(false))
    }, [])

    const confirmationDelete = () => {
        Alert.alert("Eliminar la nota", "Está seguro de esto?", [
            { text: "Sí", onPress: () => deleteNote() },
            { text: "No", onPress: () => console.log(false) },
        ])
    }
    const deleteNote = () => {
        setLoading(true)
        deleteDoc(doc(db, "notes", noteId))
            .then(() => navigation.navigate("NotebookScreen"))
            .catch(() => Alert.alert("Error deleting"))
            .finally(() => setLoading(false))
    }

    const updateNote = async () => {
        setLoading(true)
        try {
            const docRef = doc(db, "notes", noteId)
            await updateDoc(docRef, note)
            navigation.navigate("NotebookScreen")
        } catch (e) {
            Alert.alert("Update error")
        } finally {
            setLoading(false)
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
                        value={note.title}
                    />
                    <TextInput
                        multiline={true}
                        maxLength={200}
                        placeholder="Cuerpo del pensamiento"
                        style={styles.text}
                        onChangeText={(value) =>
                            setNote({ ...note, text: value })
                        }
                        value={note.text}
                    />

                    <TouchableOpacity
                        onPress={() => confirmationDelete()}
                        style={styles.action}
                    >
                        <FIcon name="trash-2" size={20} color="#000000"></FIcon>
                    </TouchableOpacity>
                </View>
                <Btn text="Guardar" onPress={() => updateNote()}>
                    <FAIcon name="save" size={20} color="#000000" />
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
    action: {
        position: "absolute",
        top: 0,
        right: 0,
        padding: 15,
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
