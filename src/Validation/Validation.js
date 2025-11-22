export default class Validation {

    static spaceRegex = /\s+/g;
    static usernameRegex = /^[a-zA-Z0-9_-]*$/;
    static maxLength = 50;

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

    static validatePassword(password) {
        const passwordNoSpaces = password.replace(Validation.spaceRegex, "")
        if(passwordNoSpaces.length > Validation.maxLength) {
            return {error: "Maximum length is 50 characters", password: passwordNoSpaces};
        }
        return {error: "", password: passwordNoSpaces};
    }

    static confirmPasswordValidation(confirmPassword, password) {
        const passwordNoSpaces = password.replace(Validation.spaceRegex, "")
        const confirmPasswordNoSpaces = confirmPassword.replace(Validation.spaceRegex, "")
        if(confirmPasswordNoSpaces.length > Validation.maxLength || passwordNoSpaces.length > Validation.maxLength) {
            return {error: "Maximum length is 50 characters", password: confirmPasswordNoSpaces, confirmation: false};
        }
        if (confirmPasswordNoSpaces !== passwordNoSpaces) {
            return {error: "Passwords do not match", password: confirmPasswordNoSpaces, confirmation: false};
        }
        return {error: "", password: confirmPasswordNoSpaces, confirmation: true};
    }

    static youtubeURLValidation(youtubeURL) {
        const urlNoSpaces = youtubeURL.replace(Validation.spaceRegex, "");
        const res = Validation.ytPattern.test(urlNoSpaces);
        console.log(res);
        return {error: res, url: urlNoSpaces};
    }

}