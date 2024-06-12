import React from "react";
import {Link} from 'react-router-dom';
import "./LoginBtn.css";

  


function LoginBtn({userInfo, setUserInfo }) {
    const handleLogin = () => {
        console.log("로그인 클릭");
      };
    const handleLogout = () => {
        setUserInfo(null);
        window.localStorage.removeItem("userInfo");
    };
    return (
        <div>
        {userInfo ? <button className='log-in' onClick={handleLogout}>Log out</button> : <Link to={`/LoginPage`}><button className='log-in' onClick={handleLogin}>Log in</button></Link>}
        
        </div>
    );
}

export default LoginBtn;