import React from 'react';
import logo from '../../images/logo.png';
import './header.css';
import { useAuth } from '../Login/useAuth';


const Header = () => {
  const auth=useAuth();
  //console.log(auth);
  
    return (
        <div className="header">
            <img src={logo} alt="" />
            <nav>
                <a href="/shop"> Shop  </a>
                <a href="/review">Order Review </a>
                <a href="/manage">Manage Inventory</a>
                {
                    auth.user &&
                     <span style={{color:'yellow'}}> WelCome {auth.user.name}</span> 
                   
                }
                {
                auth.user? <a href="/Login"> SignOut</a>
                : <a href="/Login"> SignIn</a>
                }
            </nav>
        </div>
    );
};

export default Header;