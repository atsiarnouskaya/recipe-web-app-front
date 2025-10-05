import LoginFormComponent from "../Components/Login/LoginFormComponent";
import {useContext, useState} from "react";
import {AuthContext} from "../API/Context";
import AuthService from "../API/AuthService";
import useFetching from "../hooks/useFetching";

const LoginPage = () => {

    const {isAuth, setIsAuth, user, setUser} = useContext(AuthContext);

    const [error, setError] = useState("");

    const loginUser = async (username, password) => {

        if (!username || !password) {
            setError("Please enter both username and password");
            return;
        }

        const response = await
            AuthService.login(username, password)

        if (response.success) {
            console.log("Login success", response.data);
            setUser(response.data);
            setError("");
            setIsAuth(true);
        }
        else {
            setError("Invalid username or password");
        }
    }

    return (
        <LoginFormComponent login={loginUser} error={error} />
    )
}

export default LoginPage;