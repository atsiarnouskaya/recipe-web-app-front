import React, {useState} from 'react';
import RegistrationFormComponent from "../Components/Registration/RegistrationFormComponent";
import AuthService from "../API/AuthService";
import {useNavigate} from "react-router-dom";

function RegisterPage() {

    const navigate = useNavigate();
    const [registrationError, setRegistrationError] = useState("");
    const register = async (username, password) => {

        if (!username || !password) {
            console.error("Username and password cannot be empty");
            return;
        }

        const response = await AuthService.register(username, password);

        if (response.status === 400) {
            console.log(response);
            setRegistrationError(response.data.username || response.data.password);
        }

        if (response.status === 200 || response.status === 201) {
            navigate("/register-success");
        }
    }

    return (
        <div>
            <RegistrationFormComponent register={register} error={registrationError}/>
        </div>

    );
}

export default RegisterPage;