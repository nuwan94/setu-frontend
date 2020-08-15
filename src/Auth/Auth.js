import decodeJWT from "jwt-decode";
import b2cauth from "react-azure-adb2c";

class Auth {
    isLoggedIn() {
        if (b2cauth.getAccessToken()) {
            return true;
        }
        return false;
    }

    logout() {
        b2cauth.signOut();
    }

    getToken() {
        return b2cauth.getAccessToken();
    }

    currentUser() {
        const decoded = decodeJWT(b2cauth.getAccessToken());
        return {
            name: decoded.name,
            firstName: decoded.given_name,
            lastName: decoded.family_name,
            emails: decoded.emails,
            stuNo: decoded.student_no,
        };
    }
}

export default Auth;