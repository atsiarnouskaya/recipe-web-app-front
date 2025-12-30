import React from "react";
import axios from "axios";



export default class AuthService extends React.Component {

    static async login(username, password) {
        try {
            const response = await axios.post(
                "http://localhost:8080/signin",
                {username, password},
                {withCredentials: true});

            return response;

        } catch (err) {
            return err.response;
        }
    }

    static async register(username, password, email) {
        try {
            const response = await axios.post("http://localhost:8080/signup",
                { username, password, email},
                {withCredentials: true});

            console.log("Register success", response.data, response.status);
            return response;
        } catch (e) {
            console.error("Register error", e);
            if (e.response && e.response.status === 400) {
                return e.response;
            }
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