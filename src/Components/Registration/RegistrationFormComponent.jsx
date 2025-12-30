import React, {useEffect, useState} from 'react';
import InputComponent from "../Input/InputComponent";
import Button from "../Button/Button";
import classes from "../Form/FormStyle.module.css"
import {Link} from "react-router-dom";
import Validation from "../../Validation/Validation";

function RegistrationFormComponent({register, error}) {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [userError, setUserError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");
    const [passwordsMatchError, setPasswordsMatchError] = useState("");

    useEffect(() => {
        if (!password || !confirmPassword) {
            setPasswordsMatchError("");
            return;
        }

        if (password !== confirmPassword) {
            setPasswordsMatchError("Passwords do not match");
        } else {
            setPasswordsMatchError("");
        }
    }, [password, confirmPassword]);


    return (
        <div className={classes.centerWrapper}>
            <form className={classes.form} onSubmit={(e) => {
                e.preventDefault();

                if (passwordsMatchError) {
                    alert("Passwords don't match");
                    setPassword("");
                    setConfirmPassword("");
                    return;
                }
                register(username, password, email)}}>
                <h2 className={classes.h2}>Please enter your email, username and password to sign up</h2>

                <InputComponent
                    type="email"
                    value={email}
                    onChange={(e) => {
                        const emailValidation = Validation.validateEmail(e.target.value);
                        setEmail(emailValidation.email)
                        setEmailError(emailValidation.error)}
                    }
                    placeholder="Email"
                />
                {emailError && <span className={classes.errorMessage}>{emailError}</span>}

                <InputComponent
                    type="text"
                    value={username}
                    onChange={e => {
                        const usernameValidation = Validation.validateUsername(e.target.value);
                        setUserError(usernameValidation.error);
                        setUsername(usernameValidation.username);
                    }
                    }
                    placeholder="Username" />
                {userError && <span className={classes.errorMessage}>{userError}</span>}

                <InputComponent
                    type="password"
                    value={password}
                    onChange={e => {
                        const passwordValidation = Validation.validatePassword(e.target.value);
                        setPasswordError(passwordValidation.error)
                        setPassword(passwordValidation.password)
                    }}
                    placeholder="Password" />
                {passwordError && <span className={classes.errorMessage}>{passwordError}</span>}

                <InputComponent
                    type="password"
                    value={confirmPassword}
                    onChange={e => {
                        const confirmPasswordValidation = Validation.validatePassword(e.target.value);
                        setConfirmPasswordError(confirmPasswordValidation.error)
                        setConfirmPassword(confirmPasswordValidation.password)
                    }}
                    placeholder="Confirm password"
                    style={{borderColor: confirmPasswordError ? "red" : ""}}/>

                {passwordsMatchError && <span className={classes.errorMessage}>{passwordsMatchError}</span>}
                {error && (<span className={classes.errorMessage}>{error}</span>)}
                <Button
                    type="submit"
                    disabled={
                        !username ||
                        !email ||
                        !password ||
                        !confirmPassword ||
                        emailError ||
                        userError ||
                        passwordError ||
                        confirmPasswordError ||
                        passwordsMatchError
                    }>
                    Register
                </Button>

                <Link to={"/login"}
                      style={{fontSize:"15px",
                              alignItems:"center",
                              justifyContent:"center",
                              display:"flex",
                              textDecoration: "none"}}>If you already have an account, please log in</Link>

            </form>
        </div>
    );
}

export default RegistrationFormComponent;