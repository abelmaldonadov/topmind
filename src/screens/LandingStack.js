import { createStackNavigator } from "@react-navigation/stack"
import LandingScreen from "./public/landing/LandingScreen"
import SignInScreen from "./public/landing/SignInScreen"

const Stack = createStackNavigator()

export default function LandingStack(props) {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="LandingScreen"
                component={LandingScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="SignInScreen"
                component={SignInScreen}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    )
}
