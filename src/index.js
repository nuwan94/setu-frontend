import React from "react";
import b2cauth from "react-azure-adb2c";
import ReactDOM from "react-dom";
import App from "./App/App";
import "./index.css";
import * as serviceWorker from "./serviceWorker";

b2cauth.initialize({
    instance: "https://login.microsoftonline.com/tfp/",
    tenant: "uoksetu.onmicrosoft.com",
    signInPolicy: "B2C_1_react_signup",
    applicationId: "1278766e-5c26-4964-842d-6f5f50494992",
    cacheLocation: "sessionStorage",
    scopes: ["https://uoksetu.onmicrosoft.com/api/user_impersonation"],
    redirectUri: window.location.origin,
    postLogoutRedirectUri: window.location.origin,
});

b2cauth.run(() => {
    ReactDOM.render( < App / > , document.getElementById("root"));
    serviceWorker.unregister();
});

serviceWorker.unregister();