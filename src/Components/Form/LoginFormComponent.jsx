import InputComponent from "../Input/InputComponent";
import {useState} from "react";
import Button from "../Button/Button";

const LoginFormComponent = ({login}) => {

    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");


    return (
        <form>
            <InputComponent
                type="text"
                value={username}
                onChange={e => {
                setUsername (e.target.value);
            }} placeholder="username" />

            <InputComponent
                type="password"
                value={password}
                onChange={e => {
                    setPassword(e.target.value);
                }} placeholder="password" />

            <Button onClick={(e) => {
                e.preventDefault();
                login(username, password)}
            }>Login</Button>

        </form>
    )
}

export default LoginFormComponent;