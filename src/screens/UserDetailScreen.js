import {
    ActivityIndicator,
    Alert,
    Button,
    StyleSheet,
    TextInput,
    View,
} from "react-native"
import { StatusBar } from "expo-status-bar"
import { useEffect, useState } from "react"
import { db } from "../firebase/config"
import { doc, getDoc, deleteDoc, updateDoc } from "firebase/firestore"

export default function UserDetailScreen({ navigation, route }) {
    const { userId } = route.params

    const [isLoading, setLoading] = useState(true)
    const [user, setUser] = useState({
        name: "",
        email: "",
        phone: "",
    })

    useEffect(async () => {
        const docRef = doc(db, "users", userId)
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data())
            setUser(docSnap.data())
        } else {
            console.log("No such document!")
            navigation.navigate("UserListScreen")
        }
        setLoading(false)
    }, [])

    const updateUser = async () => {
        setLoading(true)
        try {
            const docRef = doc(db, "users", userId)
            await updateDoc(docRef, user)
            navigation.navigate("UserListScreen")
        } catch (e) {
            Alert.alert("Update error")
        } finally {
            setLoading(false)
        }
    }
    const confirmationDelete = () => {
        Alert.alert("Remove the user", "Are you sure?", [
            { text: "Yes", onPress: () => deleteUser() },
            { text: "No", onPress: () => console.log(false) },
        ])
    }
    const deleteUser = () => {
        setLoading(true)
        deleteDoc(doc(db, "users", userId))
            .then(() => navigation.navigate("UserListScreen"))
            .catch(() => Alert.alert("Error deleting"))
            .finally(() => setLoading(false))
    }

    if (isLoading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#9e9e9e" />
            </View>
        )
    }

    return (
        <View>
            <View style={styles.form}>
                <TextInput
                    placeholder="name user"
                    value={user.name}
                    onChangeText={(value) => setUser({ ...user, name: value })}
                />
                <TextInput
                    placeholder="email user"
                    value={user.email}
                    onChangeText={(value) => setUser({ ...user, email: value })}
                />
                <TextInput
                    placeholder="phone user"
                    value={user.phone}
                    onChangeText={(value) => setUser({ ...user, phone: value })}
                />
            </View>
            <Button
                title="Update User"
                color="#1c77c7"
                onPress={() => updateUser()}
            />
            <Button
                title="Delete User"
                color="#b00b0b"
                onPress={() => confirmationDelete()}
            />
            <StatusBar style="auto" />
        </View>
    )
}

const styles = StyleSheet.create({
    form: {
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
    },
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
})
