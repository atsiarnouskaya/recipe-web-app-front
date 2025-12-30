import {useLocation, useNavigate} from "react-router-dom";
import EmailVerification from "../API/EmailVerification";
import VerifyEmailComponent from "../Components/Registration/EmailVerification/VerifyEmailComponent";
import {useState} from "react";


function VerifyEmailPage() {

    const [verificationError, setVerificationError] = useState("");
    const [codeResendInfo, setCodeResendInfo] = useState("");
    const { state } = useLocation();
    const navigate = useNavigate();

    const email = state?.email;

    if (!email) {
        navigate("/register");
        return null;
    }

    const verify = async (code) => {
        if (!email || !code) {
            return;
        }
        const response = await EmailVerification.verifyEmail(email, code);
        console.log(response);

        if (response.status === 200) {
            navigate("/register-success");
        } else {
            setVerificationError(response.data.message);
        }
    }

    const resendVerificationCode = async () => {
        if (!email) {
            return;
        }
        console.log(email)
        const response = await EmailVerification.resendVerificationCode(email);

        if (response.status === 200) {
            setCodeResendInfo("A new code has been sent");
        } else {
            setCodeResendInfo("Smth went wrong");
        }
    }

    return (
        <div>
            <VerifyEmailComponent verify = {verify} resend = {resendVerificationCode} resendStatus = {codeResendInfo} error = {verificationError}></VerifyEmailComponent>
        </div>
    )
}

export default VerifyEmailPage;