import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Button,
    ActivityIndicator,
} from "react-native"
import { StatusBar } from "expo-status-bar"
import { useEffect, useState } from "react"
import firebase from "../firebase/config"
import { Avatar, ListItem } from "react-native-elements"

export default function UserListScreen({ navigation }) {
    const [isLoading, setLoading] = useState(true)
    const [users, setUsers] = useState([])

    useEffect(() => {
        firebase.db.collection("users").onSnapshot((querySnapshot) => {
            setUsers(
                querySnapshot.docs.map((doc) => {
                    return { id: doc.id, ...doc.data() }
                })
            )
        })
        setLoading(false)
    }, [])

    if (isLoading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#9e9e9e" />
            </View>
        )
    }

    return (
        <ScrollView>
            <Button
                title="Create User"
                onPress={() => navigation.navigate("CreateUserScreen")}
            />
            {users.map((user) => (
                <ListItem
                    key={user.id}
                    bottomDivider
                    onPress={() =>
                        navigation.navigate("UserDetailScreen", {
                            userId: user.id,
                        })
                    }
                >
                    <ListItem.Chevron />
                    <Avatar
                        source={{
                            uri: "https://cdn.pixabay.com/photo/2019/11/03/20/11/portrait-4599553__340.jpg",
                        }}
                        rounded
                    />
                    <ListItem.Content>
                        <ListItem.Title>{user.name}</ListItem.Title>
                        <ListItem.Subtitle>{user.email}</ListItem.Subtitle>
                    </ListItem.Content>
                </ListItem>
            ))}
            <StatusBar style="auto" />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
})
