import React from 'react';
import Auth from './useAuth';

const Login = () => {
    console.log('this is login');
    const auth = Auth();
    console.log(auth.user);
    return (
        <div>
            <h2>WelCome to Login </h2>
            {
                auth.user ? <button>Sign Out</button> :
                    <button onClick={auth.signInWithGoogle} >Sign in With Google</button>
            }
        </div>
    )
}

export default Login
