import React from 'react';
import Button from "../Button/Button";
import {Link, useNavigate} from "react-router-dom";

function RegistrationSuccess() {

    const navigate = useNavigate();

    return (
        <div>
            You have successfully registered!
            <br></br>

            <Link to={"/login"}>Login</Link>

        </div>
    );
}

export default RegistrationSuccess;