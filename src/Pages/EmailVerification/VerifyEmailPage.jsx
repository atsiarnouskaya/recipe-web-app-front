import {Link, useLocation, useNavigate} from "react-router-dom";
import EmailVerification from "../../API/EmailVerification";
import VerifyEmailComponent from "../../Components/Registration/EmailVerification/VerifyEmailComponent";
import React, {useEffect, useState} from "react";
import classes from "./EmailVerificationPageStyle.module.css"
import Lottie from "lottie-react";
import mail from "../../Utils/LottiesAnimations/mail.json"


function VerifyEmailPage() {

    const [verificationError, setVerificationError] = useState("");
    const [codeResendInfo, setCodeResendInfo] = useState("");
    const [loading, setLoading] = useState(false);
    const [emailLoading, setEmailLoading] = useState(false);
    const [error, setError] = useState("");
    const { state } = useLocation();
    const navigate = useNavigate();

    const email = state?.email;
    const autoResend = state?.autoResend;

    useEffect(() => {
        console.log(email);
        if (!email) {
            navigate("/register")
            return;
        }

        const resend = async () => {
            try {
                setEmailLoading(true);
                await EmailVerification.resendVerificationCode(email);
            } catch {
                setError("Failed to send verification email");
            } finally {
                setEmailLoading(false);
            }
        };

        if (autoResend) {
            resend();
        }

    }, [email, autoResend]);

    const verify = async (code) => {
        if (!email || !code) {
            return;
        }

        try {
            setLoading(true);
            const response = await EmailVerification.verifyEmail(email, code);

            if (response.status === 200) {
                navigate("/register-success");
            }

            if(response.status === 400) {
                setVerificationError(response.data.message);
            }
        } catch (err) {
            setVerificationError(err + "Failed to verify email");
        } finally {
            setLoading(false);
        }
    }

    const resendVerificationCode = async () => {
        if (!email) {
            return;
        }
        try {
            setEmailLoading(true);
            const response = await EmailVerification.resendVerificationCode(email);
            setVerificationError("");
            if (response.status === 200) {
                setCodeResendInfo("A new code has been sent");
            }
        } catch (err) {
            setCodeResendInfo(err + "Failed to resend verification code");
        } finally {
            setEmailLoading(false);
        }
    }

    return (
        <div className={classes.emailVerificationPage}>
            <div className={classes.cardWrapper}>
                <VerifyEmailComponent
                    email = {email}
                    verify = {verify}
                    resend = {resendVerificationCode}
                    resendStatus = {codeResendInfo}
                    error = {verificationError}
                    disabled = {emailLoading}></VerifyEmailComponent>
            </div>
                {emailLoading && (
                    <div className={classes.loader}>
                        <Lottie animationData={mail} loop={true} style={{ width: 150 }}/>
                    </div>)}
        </div>
    )
}

export default VerifyEmailPage;