import React, { useContext, useState } from 'react';
import './FormStyle.css'
import avatar from '../../image/avatar.svg';
import firebase from "firebase/app";
import "firebase/auth";
import { Link, useHistory, useLocation } from 'react-router-dom';
import { UserContext } from '../../App';
import { getUserInfo, initializeLoginFramework, setUserInfo } from './LoginManager';
import swal from 'sweetalert';
import toast from 'react-hot-toast';

const LoginForm = () => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const { setLoggedInUser } = useContext(UserContext);

    const history = useHistory()
    const location = useLocation()
    let { from } = location.state || { from: { pathname: "/" } };
    const loading = toast.loading('Adding...Please wait!');

    const login = () => {
        const logindata = {
            userName: userName,
            password: password
        }
        const url = 'http://localhost:5050/auth/login'
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'Application/json'
            },
            body: JSON.stringify(logindata)
        })
            .then(res => res.json())
            .then(data => {
                if (data === 'No user found') {
                    return swal("No user found!", "Please try again.", "error", { dangerMode: true });
                }
                if (data === 'Invalid password') {
                    return swal("Invaild Password!", "Please try again.", "error", { dangerMode: true });
                }
                if (data) {
                    toast.dismiss(loading);
                    handleLogin(data)
                }

            })
    }

    const handleLogin = (res) => {
        setUserInfo(res)
        setLoggedInUser(res);
        return swal(`Successfully Log In`, `Welcome`, "success")
            .then(res => history.push(from));
    }



    var provider = new firebase.auth.GoogleAuthProvider();
    const handleGoogleSignIn = () => {
        initializeLoginFramework()
        firebase.auth().signInWithPopup(provider)
            .then((res) => {
                const { displayName, email, } = res.user;
                // setCheckEmail(email);

                const signedInUser = {
                    username: displayName,
                    email: email,
                    password: '0000000000000000000000'
                }
                // console.log(signedInUser);

                const url = 'https://toprakserver.herokuapp.com/auth/register'
                fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'Application/json'
                    },
                    body: JSON.stringify(signedInUser)
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                        // if (data.email) {
                        //     toast.dismiss(loading);
                        //     setUserInfo(data)
                        //     setLoggedInUser(data);
                        //     return swal(`Successfully Sign Up & Log In`, `Welcome`, "success").then(res => history.push(from));
                        // }
                    })

            })
            .catch((err) => {
                console.log(err);
                console.log(err.message);
            })


    }

    const handleResponse = (res) => {
        setLoggedInUser(res);
        // setJWTToken();
        setUserInfo(res)
        // toast.success('Successfully Logged In!');
        swal(`Successfully Login ${res.name || res.displayName}`, `Welcome`)
            .then(res => {
                history.push(from)
            });
    }


    const handleGoogleResponse = (email) => {

        // const url = 'https://toprak-real.herokuapp.com/profile?email=' + email
        // fetch(url)
        //     .then(res => res.json())
        //     .then(data => {
        //         console.log(data)
        //         // setLoggedInUser(data);
        //         // setJWTToken();
        //         // setUserInfo(data)
        //         // toast.success('Successfully Logged In!');
        //         // swal(`Successfully Login ${data.name || data.displayName}`, `Welcome`)
        //         //     .then(res => {
        //         //         history.push(from)
        //         //     });
        //     })
    }

    const handleFocus = (e) => {
        let parent = e.target.parentNode.parentNode;
        parent.classList.add('focus')
    }

    const handleBlur = (e) => {
        let value = e.target.value;
        let parent = e.target.parentNode.parentNode;
        if (value == "") {
            parent.classList.remove('focus')
        }
    }

    return (
        <div className='login-content'>
            <div class="login-container-body">
                <div class="login-container container">
                    <div className='form'>
                        <img class="avatar" src={avatar} alt="" />
                        <h2>Welcome</h2>
                        <div class="input-div one">
                            <div class="i">
                                <i class="fas fa-user"></i>
                            </div>
                            <div>
                                <h5>UserName</h5>
                                <input onChange={(e) => setUserName(e.target.value)} onBlur={handleBlur} onFocus={handleFocus} class="input" type="text" />
                            </div>
                        </div>
                        <div class="input-div two">
                            <div class="i">
                                <i class="fas fa-lock"></i>
                            </div>
                            <div>
                                <h5>Password</h5>
                                <input onChange={(e) => setPassword(e.target.value)} onBlur={handleBlur} onFocus={handleFocus} class="input" type="password" />
                            </div>
                        </div>
                        <div class='forget-signup'>
                            <Link className="a" to="/">Forget Password</Link>
                            <Link className="a" to="/register-form">Sign Up</Link>
                        </div>
                        <input onClick={login} type="submit" class="login-btn" value="Login" />
                        <button onClick={"handleGoogleSignIn"} class="login-btn" value="">Login With Google</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;