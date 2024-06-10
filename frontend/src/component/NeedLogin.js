import React, { useState } from 'react';
import "./NeedLogin.css";

const NeedLogin = () => {
  return (
    <div className='needLogin'>
        <div className='needLogin__textArea'>
            로그인이 필요한 서비스입니다!<br/><br/>
            상단의 로그인 버튼을 통해 로그인을 해주세요.
        </div>
    </div>
  );
};

export default NeedLogin;