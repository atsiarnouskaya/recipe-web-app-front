import React from "react";
import axios from "axios";



export default class AuthService extends React.Component {

    static async login(username, password) {
        try {
            const response = await axios.post(
                "http://localhost:8080/login",
                {username, password},
                {withCredentials: true});

            console.log("Login success", response.data);
            return {success: true, result: response.data};

        } catch (err) {
            console.error("Login error", err);
            return {success: false, message: err.message};
        }
    }

    static async register(username, password) {
        try {
            const response = await axios.post("http://localhost:8080/signup",
                { username, password },
                {withCredentials: true});

            console.log("Register success", response.data, response.status);
            return response;
        } catch (e) {
            console.error("Register error", e);
        }
    }

    static async logout() {
        try {
            const response = await axios.post("http://localhost:8080/logout", {}, {withCredentials: true});
            console.log("Logout success", response);
            return response;
        } catch (e) {
            console.error("Logout error", e);
        }
    }


}