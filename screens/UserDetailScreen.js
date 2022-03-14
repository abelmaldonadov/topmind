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
import firebase from "../firebase/config"

export default function UserDetailScreen({ navigation, route }) {
    const { userId } = route.params

    const [isLoading, setLoading] = useState(true)
    const [user, setUser] = useState({
        name: "",
        email: "",
        phone: "",
    })

    useEffect(() => {
        firebase.db
            .collection("users")
            .doc(userId)
            .get()
            .then((response) => response.data())
            .then((data) => {
                setUser(data)
                setLoading(false)
            })
            .catch(() => Alert.alert("Error getting user"))
    }, [])

    const updateUser = () => {
        setLoading(true)
        firebase.db
            .collection("users")
            .doc(userId)
            .set(user)
            .then((response) => navigation.navigate("UserListScreen"))
            .catch(() => Alert.alert("Update error"))
            .finally(() => setLoading(false))
    }
    const confirmationDelete = () => {
        Alert.alert("Remove the user", "Are you sure?", [
            { text: "Yes", onPress: () => deleteUser() },
            { text: "No", onPress: () => console.log(false) },
        ])
    }
    const deleteUser = () => {
        setLoading(true)
        firebase.db
            .collection("users")
            .doc(userId)
            .delete()
            .then((response) => {
                navigation.navigate("UserListScreen")
            })
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
