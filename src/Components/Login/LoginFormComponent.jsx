import InputComponent from "../Input/InputComponent";
import React, {useState} from "react";
import Button from "../Button/Button";
import classes from "../Form/FormStyle.module.css"
import {Link} from "react-router-dom";

const LoginFormComponent = ({login, error}) => {

    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");


    return (
        <div className={classes.centerWrapper}>
        <form className={classes.form}>
            <h2 className={classes.h2}>Enter your username and password to log in</h2>

            <InputComponent
                type="text"
                value={username}
                onChange={e => {
                    setUsername (e.target.value);
                }}
                placeholder="username" />

            <InputComponent
                type="password"
                value={password}
                onChange={e => {
                    setPassword(e.target.value);
                }}
                placeholder="password" />


                {error && <p className={classes.errorMessage}>{error}</p>}



            <Button onClick={(e) => {
                e.preventDefault();
                login(username, password)}}
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