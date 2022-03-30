import { NavigationContainer } from "@react-navigation/native"
import { useContext, useEffect } from "react"
import { UserContext } from "./contexts/UserContext"
import PrivateTabs from "./screens/PrivateTabs"
import LandingStack from "./screens/LandingStack"
import AsyncStorage from "@react-native-async-storage/async-storage"

export default function Main(props) {
    const { user, setUser } = useContext(UserContext)

    useEffect(() => {
        AsyncStorage.getItem("@user")
            .then((response) =>
                setUser(response != null ? JSON.parse(response) : undefined)
            )
            .catch(() => setUser(false))
    }, [])

    return (
        <NavigationContainer>
            {user ? <PrivateTabs /> : <LandingStack />}
        </NavigationContainer>
    )
}
