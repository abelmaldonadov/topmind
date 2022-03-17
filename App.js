import { createStackNavigator } from "@react-navigation/stack"
import { NavigationContainer } from "@react-navigation/native"
import UserListScreen from "./src/screens/UserListScreen"
import CreateUserScreen from "./src/screens/CreateUserScreen"
import UserDetailScreen from "./src/screens/UserDetailScreen"

const Stack = createStackNavigator()

const MyStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="UserListScreen"
                component={UserListScreen}
                options={{ title: "User list" }}
            />
            <Stack.Screen
                name="CreateUserScreen"
                component={CreateUserScreen}
                options={{ title: "Create a new user" }}
            />
            <Stack.Screen
                name="UserDetailScreen"
                component={UserDetailScreen}
                options={{ title: "User detail" }}
            />
        </Stack.Navigator>
    )
}

export default function App() {
    return (
        <NavigationContainer>
            <MyStack />
        </NavigationContainer>
    )
}
