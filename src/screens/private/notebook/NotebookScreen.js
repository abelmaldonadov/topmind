import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native"
import { StatusBar } from "expo-status-bar"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "../../../contexts/UserContext"
import Note from "../../../components/note/Note"
import FIcon from "react-native-vector-icons/Feather"
import Space from "../../../components/space/Space"
import { collection, query, where, onSnapshot } from "firebase/firestore"
import { db } from "../../../firebase/config"
import Loader from "../../../components/loader/Loader"

export default function NotebookScreen({ navigation }) {
    const [isLoading, setLoading] = useState(true)
    const { user } = useContext(UserContext)
    const [notes, setNotes] = useState([])

    const getNotes = async () => {
        console.log("getting data")
        const q = query(
            collection(db, "notes"),
            where("userId", "==", user.email)
        )
        await onSnapshot(q, (querySnapshot) => {
            console.log(querySnapshot.docs)
            setNotes(
                querySnapshot.docs.map((doc) => {
                    return { ...doc.data(), id: doc.id }
                })
            )
        })
    }

    useEffect(() => {
        getNotes().finally(() => setLoading(false))
    }, [])

    if (isLoading) {
        return <Loader />
    }

    return (
        <ScrollView style={styles.page}>
            <View style={styles.header}>
                <Text style={styles.title}>Cuaderno</Text>
                <TouchableOpacity
                    onPress={() => navigation.navigate("WriteNoteScreen")}
                >
                    <FIcon
                        name="plus-circle"
                        size={30}
                        color="rgba(0,0,0,0.25)"
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.container}>
                {notes.map((item) => (
                    <Note
                        key={item.id}
                        color={item.color}
                        title={item.title}
                        text={item.text}
                        onPress={() =>
                            navigation.navigate("ReadNoteScreen", {
                                noteId: item.id,
                            })
                        }
                    />
                ))}
            </View>

            <Space size={20} />
            <StatusBar style="auto" />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    page: {
        padding: 20,
    },
    title: {
        fontSize: 40,
        fontWeight: "500",
        textAlign: "left",
        color: "rgb(0,0,0)",
        paddingVertical: 20,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        flexWrap: "wrap",
    },
})
