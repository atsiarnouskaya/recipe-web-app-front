import React, {useState} from 'react';
import RegistrationFormComponent from "../../Components/Registration/RegistrationFormComponent";
import AuthService from "../../API/AuthService";
import {useNavigate} from "react-router-dom";
import Lottie from "lottie-react";
import mail from "../../Utils/LottiesAnimations/mail.json"
import classes from './RegisterPageStyle.module.css'

function RegisterPage() {

    const navigate = useNavigate();

    const [registrationError, setRegistrationError] = useState("");
    const [loading, setLoading] = useState(false);

    const register = async (username, password, email) => {
        if (!username || !password || !email) {
            setRegistrationError("Email, username and password cannot be empty");
            return;
        }

        setLoading(true);
        setRegistrationError("");

        try {
            const response = await AuthService.register(username, password, email);

            if (response.status === 400) {
                setRegistrationError(response.data.message);
                return;
            }

            if (response.status === 200 || response.status === 201) {
                navigate("/verifyEmail", {
                    state: {
                        email: response.data.email,
                        autoResend: false
                    }
                })
            }
        } catch (err) {
                setRegistrationError("Server error. Try again later.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={classes.registerPage}>
            {loading && (
                <div className={classes.loader}>
                    <Lottie animationData={mail} loop style={{ width: 150 }} />
                </div>
            )}

                <RegistrationFormComponent
                    register={register}
                    error={registrationError}
                    disabled={loading}
                />

        </div>
    );
}

export default RegisterPage;