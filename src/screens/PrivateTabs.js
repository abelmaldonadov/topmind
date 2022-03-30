import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import NotebookStack from "./NotebookStack"
import MCIcon from "react-native-vector-icons/MaterialCommunityIcons"
import UserStack from "./UserStack"
import ExploreStack from "./ExploreStack"

const Tabs = createBottomTabNavigator()

export default function PrivateTabs(props) {
    return (
        <Tabs.Navigator initialRouteName="HomeStack">
            <Tabs.Screen
                name="ExploreStack"
                component={ExploreStack}
                options={{
                    headerShown: false,
                    tabBarLabel: "Explorar",
                    tabBarIcon: ({ color, size }) => (
                        <MCIcon
                            name="compass-outline"
                            color={color}
                            size={size}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="HomeStack"
                component={NotebookStack}
                options={{
                    headerShown: false,
                    tabBarLabel: "Cuaderno",
                    tabBarIcon: ({ color, size }) => (
                        <MCIcon
                            name="book-open-variant"
                            color={color}
                            size={size}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="UserStack"
                component={UserStack}
                options={{
                    headerShown: false,
                    tabBarLabel: "Mi Perfil",
                    tabBarIcon: ({ color, size }) => (
                        <MCIcon name="face" color={color} size={size} />
                    ),
                }}
            />
        </Tabs.Navigator>
    )
}
