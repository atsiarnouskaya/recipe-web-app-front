export default class Validation {

    static spaceRegex = / {2,}/g;
    static usernameRegex = /^[a-zA-Z0-9_-]*$/;
    static maxLength = 50;
    static textFieldRegex = /^['’\-\\/–a-zA-Z0-9,.!?()“”\s]*$/;
    static numberFieldRegex = /^[0-9]+(\.)?[0-9]*$/;
    static verifyEmailCodeRegex = /[0-9]{6}/;
    static emailRegex = /^[a-z0-9]+@[a-z0-9]+\.[a-z]{2,4}$/;

    static ytPattern = /https:\/\/www\.youtube\.com\/watch\?v=[a-zA-Z0-9_-]{11}/;


    static validateUsername(username) {
        const usernameNoSpaces = username.replace(Validation.spaceRegex, "")

        if(usernameNoSpaces.length > Validation.maxLength) {
            return {error: "Maximum length is 50 characters", username: usernameNoSpaces};
        } else {
            if (Validation.usernameRegex.test(usernameNoSpaces)) {
                return {error: "", username: usernameNoSpaces};
            } else {
                return {error: "Only letters, numbers, '_' and '-' are allowed", username: usernameNoSpaces};
            }
        }
    }

    static validateEmail(email) {
        const emailNoSpaces = email.replace(Validation.spaceRegex, "")

        if(emailNoSpaces.length > Validation.maxLength) {
            return {error: "Maximum length is 50 characters", email: emailNoSpaces};
        } else {
            if (Validation.emailRegex.test(emailNoSpaces)) {
                return {error: "", email: emailNoSpaces};
            } else {
                return {error: "Email is incorrect. Please provide a correct one.", email: emailNoSpaces};
            }
        }
    }

    static validatePassword(password) {
        const passwordNoSpaces = password.replace(Validation.spaceRegex, "")
        if(passwordNoSpaces.length > Validation.maxLength) {
            return {error: "Maximum length is 50 characters", password: passwordNoSpaces};
        }
        return {error: "", password: passwordNoSpaces};
    }

    // static validatePassword(confirmPassword, password) {
    //     const passwordNoSpaces = password.replace(Validation.spaceRegex, "")
    //     const confirmPasswordNoSpaces = confirmPassword.replace(Validation.spaceRegex, "")
    //     if (passwordNoSpaces.length > Validation.maxLength) {}
    //     if(confirmPasswordNoSpaces.length > Validation.maxLength || passwordNoSpaces.length > Validation.maxLength) {
    //         return {error: "Maximum length is 50 characters", password: confirmPasswordNoSpaces, confirmation: false};
    //     }
    //     if (confirmPasswordNoSpaces !== passwordNoSpaces) {
    //         return {error: "Passwords do not match", password: confirmPasswordNoSpaces, confirmation: false};
    //     }
    //     return {error: "", password: confirmPasswordNoSpaces, confirmation: true};
    // }

    static youtubeURLValidation(youtubeURL) {
        const urlNoSpaces = youtubeURL.replace(Validation.spaceRegex, "");
        const res = Validation.ytPattern.test(urlNoSpaces);
        console.log(res);
        return {error: res, url: urlNoSpaces};
    }

    static validateTextField(text, maxLength) {
        const textNoSpaces = text.replace(Validation.spaceRegex, " ");
        if (textNoSpaces.length > maxLength) {
            return {error: "Maximum length is " + maxLength + " characters", textField: textNoSpaces};
        }
        if (!Validation.textFieldRegex.test(textNoSpaces)) {
            return {error: "Only letters, ',', '.', '()' are allowed", textField: textNoSpaces};
        }
        console.log("Before:", text, "After:", textNoSpaces);
        return {error: "", textField: textNoSpaces};
    }

    static validateNumberField(number) {
        const numberNoSpaces = number.replace(Validation.spaceRegex, "");

        if(!Validation.numberFieldRegex.test(number)) {
            return {error: "Invalid number", numberField: numberNoSpaces};
        }
        return {error: "", numberField: numberNoSpaces}

    }

    static validateVerificationNumberField(number) {
        const numberNoSpaces = number.replace(Validation.spaceRegex, "");
        if(!Validation.verifyEmailCodeRegex.test(number)) {
            return {error: "Invalid number", numberField: numberNoSpaces};
        }
        return {error: "", numberField: numberNoSpaces};
    }

}