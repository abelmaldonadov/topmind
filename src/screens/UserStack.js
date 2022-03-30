import { createStackNavigator } from "@react-navigation/stack"
import UserScreen from "./private/user/UserScreen"

const Stack = createStackNavigator()

export default function UserStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="UserScreen"
                component={UserScreen}
                options={{ title: "Mi Perfil", headerShown: true }}
            />
        </Stack.Navigator>
    )
}
