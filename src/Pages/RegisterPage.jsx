import React from 'react';
import RegistrationFormComponent from "../Components/Registration/RegistrationFormComponent";
import AuthService from "../API/AuthService";
import {useNavigate} from "react-router-dom";

function RegisterPage() {

    const navigate = useNavigate();

    const register = async (username, password) => {
        const response = await AuthService.register(username, password);

        if (!username || !password) {
            console.error("Both username or password must be entered.");
            return;
        }

        if (response.status === 200 || response.status === 201) {
            navigate("/register-success");
        }
    }

    return (
        <div>

            <RegistrationFormComponent register={register} />
        </div>

    );
}

export default RegisterPage;