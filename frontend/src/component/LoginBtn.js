import React from "react";
import "./LoginBtn.css";

const handleLogin = () => {
    console.log("로그인 클릭");
    window.open("https://developers.kakao.com/product/kakaoLogin");
  };
  
function LoginBtn() {
    return (
        <button className='log-in' onClick={handleLogin}>Log in</button>
    );
}

export default LoginBtn;