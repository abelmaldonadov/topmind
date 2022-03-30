import UserContextComponent from "./src/contexts/UserContext"
import ColorContextComponent from "./src/contexts/ColorContext"
import Main from "./src/Main"

export default function App() {
    return (
        <ColorContextComponent>
            <UserContextComponent>
                <Main />
            </UserContextComponent>
        </ColorContextComponent>
    )
}
