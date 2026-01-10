import LoginFormComponent from "../../Components/Login/LoginFormComponent";
import {useContext, useState} from "react";
import {AuthContext} from "../../API/Context";
import AuthService from "../../API/AuthService";
import Lottie from "lottie-react";
import mail from "../../Utils/LottiesAnimations/mail.json"
import cat from "../../Utils/LottiesAnimations/loaderCat.json"
import {useNavigate} from "react-router-dom";
import EmailVerification from "../../API/EmailVerification";
import classes from "./LoginStyle.module.css"

const LoginPage = () => {

    const {isAuth, setIsAuth, user, setUser} = useContext(AuthContext);
    const navigate = useNavigate();

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const loginUser = async (username, password) => {

        if (!username || !password) {
            setError("Please enter both username and password");
            return;
        }

        try {
            setLoading(true);
            const response = await AuthService.login(username, password)

            if (response.status === 200) {
                setUser(response.data.username);
                setError("");
                setIsAuth(true);

                localStorage.setItem('auth', 'true');
                localStorage.setItem('user', JSON.stringify(response.data));

            } else if (response.status === 403) {
                navigate("/verifyEmail", {
                    state: {
                        email: response.data.email,
                        autoResend: true
                    }
                });
            } else {
                setError("Invalid username or password");
            }
        } catch (err) {
            setError(err + " Server error. Try again later.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className={classes.loginPage}>
            <div className={classes.loader}>
                {loading && <Lottie animationData={cat} loop={true}/>}
            </div>

            {!loading && <LoginFormComponent login={loginUser} error={error} />}
        </div>

    )
}

export default LoginPage;