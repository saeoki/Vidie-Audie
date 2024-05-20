import React from "react";
import {Link} from 'react-router-dom';
import "./LoginBtn.css";

const handleLogin = () => {
    console.log("로그인 클릭");
  };
  
function LoginBtn() {
    return (
        <Link to={`/LoginPage`}><button className='log-in' onClick={handleLogin}>Log in</button></Link>
    );
}

export default LoginBtn;