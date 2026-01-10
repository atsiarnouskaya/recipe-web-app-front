import LoginFormComponent from "../../Components/Login/LoginFormComponent";
import {useContext, useState} from "react";
import {AuthContext} from "../../API/Context";
import AuthService from "../../API/AuthService";
import Lottie from "lottie-react";
import cat from "../../Utils/LottiesAnimations/loaderCat.json"
import {useNavigate} from "react-router-dom";
import classes from "./LoginStyle.module.css"

const LoginPage = () => {

    const {setIsAuth, setUser} = useContext(AuthContext);
    const navigate = useNavigate();

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const loginUser = async (username, password) => {

        if (!username || !password) {
            setError("Please enter both username and password");
            return;
        }
        setLoading(true);
        setError("");

        try {
            const response = await AuthService.login(username, password)
            const { data, status } = response;
            if (status === 200) {
                localStorage.setItem('auth', 'true');
                localStorage.setItem('user', JSON.stringify(data));

                setUser(data.username);
                setIsAuth(true);
                setError("");
            } else if (status === 403) {
                navigate("/verifyEmail", {
                    state: {
                        email: response.data.email,
                        autoResend: true
                    }
                });
            } else if (status === 401) {
                setError("Invalid username or password");
            }
        } catch (err) {
            setError("Server error. Try again later.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className={classes.loginPage}>
            <div className={classes.cardWrapper}>
                {loading && (
                    <div className={classes.loader}>
                        <Lottie animationData={cat} loop={true} size={200} />
                    </div>)}
                <LoginFormComponent login={loginUser} error={error} disabled={loading}/>
            </div>
        </div>

    )
}

export default LoginPage;