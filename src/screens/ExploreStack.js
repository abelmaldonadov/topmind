import { createStackNavigator } from "@react-navigation/stack"
import ExploreScreen from "./private/explore/ExploreScreen"
import ViewNoteScreen from "./private/explore/ViewNoteScreen"

const Stack = createStackNavigator()

export default function ExploreStack(props) {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="ExploreScreen"
                component={ExploreScreen}
                options={{ title: "Explorar", headerShown: true }}
            />
            <Stack.Screen
                name="ViewNoteScreen"
                component={ViewNoteScreen}
                options={{ title: "Ver", headerShown: true }}
            />
        </Stack.Navigator>
    )
}
