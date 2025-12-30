import axios from "axios";
import React from "react";

export default class EmailVerification extends React.Component {
    static async verifyEmail(email, verificationCode) {
        try {
            const response = await axios.post(
                "http://localhost:8080/verify",
                { email, verificationCode }
            );
            return response;
        } catch (err) {
            if (err.response) {
                return err.response;
            }
        }
    }

    static async resendVerificationCode(email) {
        console.log(email);
        try {
            const response = await axios.post(
                "http://localhost:8080/resendVerificationCode",
                email,
                {
                    headers: {
                        "Content-Type": "text/plain"
                    }
                }
            );

            return response;
        } catch (err) {
            if (err.response) {
                return err.response;
            }
        }
    }
}