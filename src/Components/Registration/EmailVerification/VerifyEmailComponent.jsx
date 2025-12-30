import classes from "./EmailVerification.module.css"
import React, {useState} from "react";
import InputComponent from "../../Input/InputComponent";
import Button from "../../Button/Button";
import Validation from "../../../Validation/Validation"

function VerifyEmailComponent({verify, resend, resendStatus, error})  {
    const [code, setCode] = useState("");
    const [codeError, setCodeError] = useState("");

    return (
        <div className={classes.centerWrapper}>
            <div className={classes.verifyCard}>
            <h2 className={classes.h2}>Please enter verification code that has been sent on your email</h2>

                <div className={classes.inputWrapper}>
            <InputComponent
                type="number"
                value={code}
                onChange={(e) => {
                    const codeValidation = Validation.validateVerificationNumberField(e.target.value);
                    setCode(e.target.value)
                    if (codeValidation.error === "") {
                        setCodeError("")
                    } else {
                        setCodeError(codeValidation.error)}
                }}
                placeholder="Enter verification code"/>
            {codeError && <span className={classes.errorMessage}>{codeError}</span>}
                </div>

            {error && (<span className={classes.errorMessage}>{error}</span>)}

            <Button
                classname={classes.button}
                onClick={(e) => {
                    e.preventDefault();
                    verify(code);
                }}
                disabled={codeError!==""}>Verify email</Button>

                <Button
                    classname={classes.button}
                    onClick={(e) => {
                        e.preventDefault();
                        resend();
                    }}>Resend code</Button>

                {resendStatus && (<span className={classes.resendMessage}>{resendStatus}</span>)}
            </div>

        </div>
    )
}

export default VerifyEmailComponent;