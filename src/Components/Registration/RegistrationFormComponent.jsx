import React, {useState} from 'react';
import InputComponent from "../Input/InputComponent";
import Button from "../Button/Button";

function RegistrationFormComponent({register}) {

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



            <Button
                onClick={(e) => {
                e.preventDefault();
                register(username, password)}}
                disabled={!(username && password)}>
                Register
            </Button>

        </form>
    );
}

export default RegistrationFormComponent;