import React, {useState} from 'react';
import RegistrationFormComponent from "../Components/Registration/RegistrationFormComponent";
import AuthService from "../API/AuthService";
import {useNavigate} from "react-router-dom";

function RegisterPage() {

    const navigate = useNavigate();
    const [registrationError, setRegistrationError] = useState(false);
    const register = async (username, password) => {
        const response = await AuthService.register(username, password);

        console.log(response);
        if (!username || !password) {
            console.error("Both username or password must be entered.");
            return;
        }

        if (response.status === 400) {
            setRegistrationError(true);
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