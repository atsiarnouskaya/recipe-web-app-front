import LoginFormComponent from "../Components/Login/LoginFormComponent";
import {useContext, useState} from "react";
import {AuthContext} from "../API/Context";
import AuthService from "../API/AuthService";
import useFetching from "../hooks/useFetching";
import {useNavigate} from "react-router-dom";
import EmailVerification from "../API/EmailVerification";

const LoginPage = () => {

    const {isAuth, setIsAuth, user, setUser} = useContext(AuthContext);
    const navigate = useNavigate();

    const [error, setError] = useState("");

    const loginUser = async (username, password) => {

        if (!username || !password) {
            setError("Please enter both username and password");
            return;
        }

        const response = await
            AuthService.login(username, password)
        console.log(response)
        if (response.status === 200) {
            console.log("Login success", response.data);
            setUser(response.data.username);
            setError("");
            setIsAuth(true);
            localStorage.setItem('auth', 'true');
            localStorage.setItem('user', JSON.stringify(response.data));
        } else if (response.status === 403) {
            setError("Please verify your email")
            await EmailVerification.resendVerificationCode(response.data.email)

            navigate("/verifyEmail", {
                state: {
                    email: response.data.email
                }
            });
        }else {
            setError("Invalid username or password");
        }
    }

    return (
        <LoginFormComponent login={loginUser} error={error} />
    )
}

export default LoginPage;