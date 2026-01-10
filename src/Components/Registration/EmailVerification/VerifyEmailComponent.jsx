import classes from "./EmailVerification.module.css"
import React, {useState} from "react";
import InputComponent from "../../Input/InputComponent";
import Button from "../../Button/Button";
import Validation from "../../../Validation/Validation"
import {Link} from "react-router-dom";

function VerifyEmailComponent({email, verify, resend, resendStatus, error, disabled})  {
    const [code, setCode] = useState("");
    const [codeError, setCodeError] = useState("");

    return (
        <div className={classes.centerWrapper}>
            <div className={classes.verifyCard}>
            <h2 className={classes.h2}>Please enter verification code that has been sent on your email</h2>
                <h4 className={classes.h4}>{`Your email: ${email}`}</h4>

                <div className={classes.inputWrapper}>
                    <InputComponent
                        disabled={disabled}
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
                className={classes.button}
                onClick={(e) => {
                    e.preventDefault();
                    verify(code);
                }}
                disabled={codeError!=="" || disabled}>
                Verify email
            </Button>

            <Button
                disabled={disabled}
                className={classes.button}
                onClick={(e) => {
                    e.preventDefault();
                    resend();
                }}>
                Resend code
            </Button>
                {resendStatus && (<span className={classes.resendMessage}>{resendStatus}</span>)}

                <Link to={"/login"}
                      style={{fontSize:"15px",
                          alignItems:"center",
                          justifyContent:"center",
                          display:"flex",
                          textDecoration: "none"}}>If you already have an account, please log in</Link>
            </div>
        </div>
    )
}

export default VerifyEmailComponent;