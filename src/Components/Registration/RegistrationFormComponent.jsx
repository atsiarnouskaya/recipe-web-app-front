import React, {useState} from 'react';
import InputComponent from "../Input/InputComponent";
import Button from "../Button/Button";
import classes from "../Form/FormStyle.module.css"
import {Link} from "react-router-dom";

function RegistrationFormComponent({register}) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    return (
        <div className={classes.centerWrapper}>
            <form className={classes.form}>
                <h2 className={classes.h2}>Please enter your username and password to sign up</h2>

                <InputComponent
                    type="text"
                    value={username}
                    onChange={e => {
                        setUsername (e.target.value);
                    }}
                    placeholder="Username" />

                <InputComponent
                    type="password"
                    value={password}
                    onChange={e => {
                        setPassword(e.target.value);
                    }}
                    placeholder="Password" />

                <InputComponent
                    type="password"
                    value={confirmPassword}
                    onChange={e => {
                        setConfirmPassword(e.target.value);
                    }}
                    placeholder="Confirm password"
                    style={{borderColor: confirmPassword && password !== confirmPassword ? "red" : ""}}/>


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