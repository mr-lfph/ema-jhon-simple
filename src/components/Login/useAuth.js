import React from 'react';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "../../firebase.config"
import { useState, createContext,useContext,useEffect } from 'react';

firebase.initializeApp(firebaseConfig);

const AuthContext = createContext();

export const AuthContextProvider = (props) => {
    const auth = Auth();
    return <AuthContext.Provider value={auth}> {props.children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext);

const getUser = user => {
    const { displayName, email, photoURL } = user;
    console.log(user);
    return { name: displayName, email: email, photo: photoURL };
}

const Auth = () => {
    const [user, setUser] = useState(null);

    const signInWithGoogle = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider)
            .then(res => {
                const signedInUser = getUser(res.user);
                setUser(signedInUser);
                return res.user;
            })
            .catch(er => {
                setUser(null);
                return er.message;
            })
    }
    const signOut = () => {
        firebase.auth().signOut().then(function () {
            setUser(null);
        })
            .catch(function (error) {
                console.log(error);
            })
    }
    useEffect(() => {
        firebase.auth().onAuthStateChanged(function (usr) {
            if (usr) {
                const currUser = getUser(usr);
                setUser(currUser);
            }
            else {
                console.log('no user for login');

            }
        })
    })
    return {
        user,
        signInWithGoogle,
        signOut
    }
}
export default Auth;
