import UserListScreen from "./screens/UserListScreen"
import { createStackNavigator } from "@react-navigation/stack"
import UserDetailScreen from "./screens/UserDetailScreen"
import CreateUserScreen from "./screens/CreateUserScreen"
import { NavigationContainer } from "@react-navigation/native"

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
