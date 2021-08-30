import React, { useContext, useEffect } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import { useState } from 'react';
import firebaseConfig from './firebase.config'
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router';
import { useDispatch } from 'react-redux';
import { user_info } from '../../redux/Actions/UserAction';

// // firebase.initializeApp(firebaseConfig);

if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
}
const Login = () => {
    const gProvider = new firebase.auth.GoogleAuthProvider();
    const ghProvider = new firebase.auth.GithubAuthProvider();

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [userInfo, setUserInfo] = useState({});
    const disPatch = useDispatch()
    //log in page redirect
    let history = useHistory();
    let location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

    useEffect(() => {
        disPatch(user_info(userInfo))
    }, [userInfo])

    const [newUser, setNewUser] = useState(false);
    const [user, setUser] = useState({
        isSignedIn: false,
        name: '',
        email: '',
        password: '',
        photo: '',
        error: '',
        success: false
    })

    const authSignIn = (props) => {
        //AuthProvider
        firebase.auth()
            .signInWithPopup(props)
            .then(res => {
                const { displayName, email, photoURL } = res.user
                const isSignInUser = {
                    isSignedIn: true,
                    name: displayName,
                    email: email,
                    photo: photoURL
                }
                setUser(isSignInUser);
                setUserInfo(isSignInUser)
                userIdToken()
                history.replace('/shipment')
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                var email = error.email;
                console.log(errorCode, errorMessage, email);
            });
    }

    const handleSignInGoogle = () => {
        authSignIn(gProvider)
    }
    const userIdToken = () => {
        firebase.auth().currentUser.getIdToken(/* forceRefresh */ true)
        .then(function(idToken) {
            sessionStorage.setItem('token', idToken)
          })
          .catch(function(error) {
            console.log(error);
          });
    }
    const handleSignInGithub = () => {
        authSignIn(ghProvider);
    }
    const handleSignOut = () => {
        firebase.auth().signOut()
            .then(() => {
                setUser({})
            })
            .catch((error) => {
            });
    }

    const handleBlur = (e) => {
        let isFieldValid;
        if (e.target.name === 'email') {
            const isEmailValid = /\S+@\S+\.\S+/.test(e.target.value)
            isFieldValid = isEmailValid;
        }
        if (e.target.name === 'password') {
            const isPassword = e.target.value.length > 6;
            const isPasswordNumber = /\d{1}/.test(e.target.value);
            isFieldValid = isPasswordNumber && isPassword
        }
        if (isFieldValid) {
            const newUserInfo = { ...user }
            newUserInfo[e.target.name] = e.target.value;
            setUser(newUserInfo)
        }
    }


    //submit signin/signup button
    const handleSubmit = (e) => {
        if (newUser && user.email && user.password) {
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    const newUserInfo = { ...user }
                    newUserInfo.error = '';
                    newUserInfo.success = true
                    setUser(newUserInfo);
                    setLoggedInUser(newUserInfo)
                    updateProfile(user.name);

                })
                .catch(error => {
                    const newUserInfo = { ...user }
                    newUserInfo.error = error.message;
                    newUserInfo.success = false
                    setUser(newUserInfo)
                });
        }
        if (!newUser && user.email && user.password) {
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    const newUserInfo = { ...user }
                    newUserInfo.error = '';
                    newUserInfo.success = true
                    setUser(newUserInfo);
                    setLoggedInUser(newUserInfo);
                    history.replace(from);
                })
                .catch(error => {
                    const newUserInfo = { ...user }
                    newUserInfo.error = error.message;
                    newUserInfo.success = false
                    setUser(newUserInfo)
                });
        }
        e.preventDefault();

    }

    const updateProfile = name => {
        const user = firebase.auth().currentUser;
        user.updateProfile({
            displayName: name,
            photoURL: "https://example.com/jane-q-user/profile.jpg"
        }).then(res => {
            console.log(user.displayName);
        }).catch(function (error) {
            // An error happened.
        });
    }

    return (
        <div style={{ textAlign: 'center' }}>
            {
                user.isSignedIn ? <button onClick={handleSignOut}>Sign Out</button> : <button onClick={handleSignInGoogle}>Sign In Using Google</button>
            } <br />
            {
                user.isSignedIn ? <button onClick={handleSignOut}>Sign Out</button> : <button onClick={handleSignInGithub}>Sign In Using Git Hub</button>
            }
            {
                user.isSignedIn &&
                <div>
                    <p>Welcome {user.name}</p>
                    <p>{user.email}</p>
                    <img src={user.photo} alt="" />
                </div>
            }
            <h2>Login Form: </h2>
            <input type="checkbox" name="newUser" onChange={() => setNewUser(!newUser)} id="" />
            <label htmlFor="newUser">New User Sign Up</label>
            <form onSubmit={handleSubmit}>
                {
                    newUser && <input type="text" name="name" id="" placeholder="Enter Your Name" />
                }
                <br />
                <input type="text" name="email" onBlur={handleBlur} placeholder='Enter Your Email' required /> <br />
                <input type="password" name="password" onBlur={handleBlur} id="" placeholder="Enter Your Password" required /> <br />
                {newUser ? <input type="submit" value="Sign Up" /> : <input type="submit" value="Sign In" />}
            </form>
            <p style={{ color: 'red' }}>{user.error}</p>
            {
                user.success && <p style={{ color: 'green' }}>User {newUser ? 'Create' : 'Logged In'} Successfully</p>
            }
        </div>
    );
};

export default Login;