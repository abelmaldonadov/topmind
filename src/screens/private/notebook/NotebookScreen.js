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
import FAIcon from "react-native-vector-icons/FontAwesome"

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
                    <View style={styles.note}>
                        <Note
                            key={item.id}
                            color={item.color}
                            title={item.title}
                            text={item.text}
                            height="100%"
                            onPress={() =>
                                navigation.navigate("ReadNoteScreen", {
                                    noteId: item.id,
                                })
                            }
                        />
                        {item.origin && (
                            <View style={styles.icon}>
                                <FAIcon
                                    name="share"
                                    size={15}
                                    color="#000"
                                ></FAIcon>
                            </View>
                        )}
                    </View>
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
    note: {
        position: "relative",
        width: "48%",
        height: 160,
        marginBottom: 15,
    },
    icon: {
        position: "absolute",
        top: 0,
        right: 0,
        padding: 15,
    },
})
