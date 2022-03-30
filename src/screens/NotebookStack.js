import { createStackNavigator } from "@react-navigation/stack"
import NotebookScreen from "./private/notebook/NotebookScreen"
import WriteNoteScreen from "./private/notebook/WriteNoteScreen"
import ReadNoteScreen from "./private/notebook/ReadNoteScreen"

const Stack = createStackNavigator()

export default function NotebookStack(props) {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="NotebookScreen"
                component={NotebookScreen}
                options={{ title: "Cuaderno", headerShown: false }}
            />
            <Stack.Screen
                name="WriteNoteScreen"
                component={WriteNoteScreen}
                options={{ title: "Escribir", headerShown: true }}
            />
            <Stack.Screen
                name="ReadNoteScreen"
                component={ReadNoteScreen}
                options={{ title: "Leer", headerShown: true }}
            />
        </Stack.Navigator>
    )
}
