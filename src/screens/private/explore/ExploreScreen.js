import { Alert, ScrollView, StyleSheet, View } from "react-native"
import Space from "../../../components/space/Space"
import { useContext, useEffect, useState } from "react"
import Loader from "../../../components/loader/Loader"
import {
    addDoc,
    collection,
    onSnapshot,
    query,
    where,
} from "firebase/firestore"
import { db } from "../../../firebase/config"
import { UserContext } from "../../../contexts/UserContext"
import Avatar from "../../../components/avatar/Avatar"
import Post from "../../../components/post/Post"

export default function ExploreScreen({ navigation }) {
    const [isLoading, setLoading] = useState(true)
    const { user } = useContext(UserContext)
    const [notes, setNotes] = useState([])

    const getNotes = async () => {
        console.log("getting data")
        const q = query(
            collection(db, "notes"),
            where("userId", "!=", user.email)
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

    const confirmationCopy = (noteId, userId, index) => {
        Alert.alert("Copiar nota a mi cuaderno", "Está seguro de esto?", [
            {
                text: "Sí",
                onPress: () =>
                    copyNote({ ...notes[index], origin: { noteId, userId } }),
            },
            { text: "No", onPress: () => console.log(false) },
        ])
    }

    const copyNote = async (note) => {
        setLoading(true)
        delete note.id
        // console.log(note)

        try {
            const docRef = await addDoc(collection(db, "notes"), {
                ...note,
                userId: user.email,
            })
            console.log("Document copied with ID: ", docRef.id)
            navigation.navigate("NotebookScreen")
        } catch (e) {
            console.error("Error adding document: ", e)
            Alert.alert("Copy error")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getNotes().finally(() => setLoading(false))
    }, [])

    if (isLoading) {
        return <Loader />
    }

    return (
        <ScrollView style={styles.page}>
            <View style={styles.container}>
                {notes.map((item, index) => (
                    <>
                        <Post
                            mod_block
                            key={item.id + item.userId}
                            color={item.color}
                            title={item.title}
                            text={item.text}
                            avatar={<Avatar name={item.userId} />}
                            indications="Mantenga presionado para copiar"
                            // onPress={() =>
                            //     navigation.navigate("ViewNoteScreen", {
                            //         noteId: item.id,
                            //     })
                            // }
                            onLongPress={() =>
                                confirmationCopy(item.id, item.userId, index)
                            }
                        />
                    </>
                ))}
            </View>

            <Space size={20} />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    page: {
        padding: 20,
    },
    container: {
        alignItems: "center",
    },
})
