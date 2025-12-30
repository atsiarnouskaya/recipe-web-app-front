import InputComponent from "../Input/InputComponent";
import React, {useState} from "react";
import Button from "../Button/Button";
import classes from "../Form/FormStyle.module.css"
import {Link} from "react-router-dom";
import Validation from "../../Validation/Validation";

const LoginFormComponent = ({login, error}) => {

    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [userError, setUserError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    return (
        <div className={classes.centerWrapper}>
        <form className={classes.form} onSubmit={(e) => {
            e.preventDefault();
            login(username, password);
        }}>
            <h2 className={classes.h2}>Enter your username and password to log in</h2>

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
                }}
                placeholder="username" />
            {userError && <span style={{color: "red"}}>{userError}</span>}

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
                placeholder="password" />


                {error && <p className={classes.errorMessage}>{error}</p>}



            <Button
                type="submit"
                disabled={!(username && password)}>
                Login</Button>

            <Link to={"/register"}
                  style={{fontSize:"15px",
                      alignItems:"center",
                      justifyContent:"center",
                      display:"flex",
                      textDecoration: "none"}}>If you don't have an account, please register</Link>


        </form>
        </div>
    )
}

export default LoginFormComponent;