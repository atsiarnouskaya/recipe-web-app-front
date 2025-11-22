import React, {useState} from 'react';
import InputComponent from "../Input/InputComponent";
import Button from "../Button/Button";
import classes from "../Form/FormStyle.module.css"
import {Link} from "react-router-dom";
import Validation from "../../Validation/Validation";

function RegistrationFormComponent({register, error}) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [userError, setUserError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");

    return (
        <div className={classes.centerWrapper}>
            <form className={classes.form}>
                <h2 className={classes.h2}>Please enter your username and password to sign up</h2>

                <InputComponent
                    type="text"
                    value={username}
                    onChange={e => {
                        const usernameValidation = Validation.validateUsername(e.target.value);

                        if (usernameValidation.error === "") {
                            setUserError("");
                            setUsername(usernameValidation.username);
                        }
                        else {
                            setUserError(usernameValidation.error);
                            setUsername(usernameValidation.username);
                        }
                    }
                    }
                    placeholder="Username" />
                {userError && <span className={classes.errorMessage}>{userError}</span>}

                <InputComponent
                    type="password"
                    value={password}
                    onChange={e => {
                        const passwordValidation = Validation.validatePassword(e.target.value);

                        if (passwordValidation.error === "") {
                            setPasswordError("")
                            setPassword(passwordValidation.password);
                        } else {
                            setPasswordError(passwordValidation.error)
                            setPassword(passwordValidation.password);
                        }
                    }}
                    placeholder="Password" />
                {passwordError && <span className={classes.errorMessage}>{passwordError}</span>}

                <InputComponent
                    type="password"
                    value={confirmPassword}
                    onChange={e => {
                        const confirmPasswordValidation = Validation.confirmPasswordValidation(e.target.value, password);
                        if (confirmPasswordValidation.confirmation) {
                            setConfirmPassword(confirmPasswordValidation.password);
                            setConfirmPasswordError(confirmPasswordValidation.error)
                            return;
                        }
                        setConfirmPasswordError(confirmPasswordValidation.error)
                        setConfirmPassword(confirmPasswordValidation.password);
                    }}
                    placeholder="Confirm password"
                    style={{borderColor: confirmPasswordError ? "red" : ""}}/>

                {error && (<span className={classes.errorMessage}>{error}</span>)}
                <Button
                    onClick={(e) => {
                    e.preventDefault();

                    if (confirmPasswordError) {
                        alert("Passwords don't match");
                        setPassword("");
                        setConfirmPassword("");
                        return;
                    }
                    register(username, password)}}
                    disabled={!(username && password && confirmPassword)}>
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