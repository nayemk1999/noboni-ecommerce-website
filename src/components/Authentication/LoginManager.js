import React from 'react';
import firebase from "firebase/app";
import "firebase/auth";
// import jwt_decode from "jwt-decode";
import { firebaseConfig } from "../../firebaseConfig/firebaseConfig";
import jwt from 'jsonwebtoken';
// const jwt = require("jsonwebtoken");

export const initializeLoginFramework = () => {
    !firebase.apps.length && firebase.initializeApp(firebaseConfig);
}

export const setUserInfo = (props) => {
    const token = jwt.sign({ props }, 'user_secret_key')
    return localStorage.setItem('user_token', token)
}
export const setUpdateInfo = (props) => {
    const oldToken = localStorage.getItem('user_token')
    if (oldToken) {
        localStorage.removeItem('user_token')
        const token = jwt.sign({ props }, 'user_secret_key')
        return localStorage.setItem('user_token', token)
    }
}

export const getDecodedUser = () => {
    const token = localStorage.getItem('user_token');
    // const decoded = jwt.verify(token, 'wrong-secret');
    const decodedData = jwt.decode(token);
    const userData = decodedData?.props
    if (!token) {
        return {};
    }
    return userData;
}


export const handleSignOut = () => {
    if (localStorage.removeItem('user_token')) {
        return {}
    }
}
