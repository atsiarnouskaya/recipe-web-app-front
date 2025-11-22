import React, {useState} from 'react';
import InputComponent from "../Input/InputComponent";
import Button from "../Button/Button";
import classes from "../Form/FormStyle.module.css"
import {Link} from "react-router-dom";

function RegistrationFormComponent({register, error}) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [userError, setUserError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    return (
        <div className={classes.centerWrapper}>
            <form className={classes.form}>
                <h2 className={classes.h2}>Please enter your username and password to sign up</h2>

                <InputComponent
                    type="text"
                    value={username}
                    onChange={e => {
                        if (e.target.value.length > 50) {
                            setUserError("Maximum length is 50 characters");
                        } else {
                            setUserError("")
                            setUsername(e.target.value);
                        }
                    }}
                    placeholder="Username" />
                {userError && <span className={classes.errorMessage}>{userError}</span>}

                <InputComponent
                    type="password"
                    value={password}
                    onChange={e => {
                        if (e.target.value.length > 50) {
                            setPasswordError("Maximum length is 50 characters");
                        } else {
                            setPasswordError("")
                            setPassword(e.target.value);
                        }
                    }}
                    placeholder="Password" />
                {passwordError && <span className={classes.errorMessage}>{passwordError}</span>}

                <InputComponent
                    type="password"
                    value={confirmPassword}
                    onChange={e => {
                        setConfirmPassword(e.target.value);
                    }}
                    placeholder="Confirm password"
                    style={{borderColor: confirmPassword && password !== confirmPassword ? "red" : ""}}/>

                {error && (<span className={classes.errorMessage}>This user already exists</span>)}
                <Button
                    onClick={(e) => {
                    e.preventDefault();

                    if (password !== confirmPassword) {
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