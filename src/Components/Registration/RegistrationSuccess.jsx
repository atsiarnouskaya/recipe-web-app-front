import React from 'react';
import {Link} from "react-router-dom";
import classes from "./RegistrationSuccess.module.css"

function RegistrationSuccess() {


    return (
        <div className={classes.regSuccessContainer}>
            <h2 className={classes.regSuccessTitle}>You have successfully registered!</h2>

            <Link className={classes.regSuccessLink} to="/login">
                Login
            </Link>
        </div>
    );
}

export default RegistrationSuccess;