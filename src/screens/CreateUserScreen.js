import {
    StyleSheet,
    View,
    TextInput,
    Alert,
    Button,
    ActivityIndicator,
} from "react-native"
import { StatusBar } from "expo-status-bar"
import { useState } from "react"
import { db } from "../firebase/config"
import { collection, addDoc } from "firebase/firestore"

export default function CreateUserScreen({ navigation }) {
    const [isLoading, setLoading] = useState(false)
    const [user, setUser] = useState({
        name: "",
        email: "",
        phone: "",
    })

    const addNewUser = async () => {
        if (user.name && user.email && user.phone) {
            setLoading(true)
            try {
                const docRef = await addDoc(collection(db, "users"), user)
                console.log("Document written with ID: ", docRef.id)
                navigation.navigate("UserListScreen")
            } catch (e) {
                console.error("Error adding document: ", e)
                Alert.alert("Save error")
            } finally {
                setLoading(false)
            }
        } else {
            Alert.alert("Please provide all the fields")
        }
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
                    onChangeText={(value) => setUser({ ...user, name: value })}
                />
                <TextInput
                    placeholder="email user"
                    onChangeText={(value) => setUser({ ...user, email: value })}
                />
                <TextInput
                    placeholder="phone user"
                    onChangeText={(value) => setUser({ ...user, phone: value })}
                />
            </View>
            <Button title="add new user" onPress={() => addNewUser()} />
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
