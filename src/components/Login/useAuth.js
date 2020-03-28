import React from 'react';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "../../firebase.config"
import { useState, createContext, useContext, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';


firebase.initializeApp(firebaseConfig);

const AuthContext = createContext();

export const AuthContextProvider = (props) => {
    //console.log('Callauth');
    const auth = Auth();
    return <AuthContext.Provider value={auth}> {props.children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext);

export const PrivatrRoute = ({ children, ...rest }) => {
    const auth = useAuth();
    return (
        <Route
            {...rest}
            render={({ location }) =>
                auth.user ? (children) : (<Redirect
                    to={{
                        pathname: "/login",
                        state: { from: location }
                    }} />)
            }></Route>
    )
}

const getUser = user => {
    //console.log('getuser');
    const { displayName, email, photoURL } = user;
    return { name: displayName, email: email, photo: photoURL };

}

const Auth = () => {
    const [user, setUser] = useState(null);

    const signInWithGoogle = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        return firebase.auth().signInWithPopup(provider)
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
       return firebase.auth().signOut().then(function () {
            setUser(null);
            return true;
        })
            .catch(function (error) {
                console.log(error);
                return false;
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
        });
    }, [])
    return {
        user,
        signInWithGoogle,
        signOut
    }
}
export default Auth;
