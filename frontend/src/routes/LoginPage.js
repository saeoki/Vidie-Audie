import React, { useEffect, useState } from 'react';
import Header from '../component/Header';
import './LoginPage.css';
import kakaoLogin_ from '../images/kakao_login_medium_wide.png';
import naverLogin from '../images/btnG_완성형.png';
import axios from 'axios';
import KakaoLogin from 'react-kakao-login';

function LoginPage({setUserInfo}){

    const handleSuccess = (response) => {
      console.log('Kakao response:', response);  // 카카오 응답 로그
      axios.post('http://localhost:5000/kakaoLogin', {
        token: response.response.access_token,
      })
      .then((res) => {
        console.log('Server response:', res.data);  // 서버 응답 로그
        setUserInfo(res.data); // 사용자 정보 설정
      })
      .catch((error) => {
        console.error('There was an error!', error);
      });
    };
    
      const handleFailure = (error) => {
        console.error(error);
      };


    return (
        <div className='Login'>

            <div className='Login__container'>
                 <div className='Login__box'>
                    <div className='Login__explain'>
                        <span className='Login__explain__title'>간편하게 로그인</span>
                        <span className='Login__explain__content'>아이디/비밀번호 입력할 필요 없어요!</span>
                        <span className='Login__explain__content'>SNS 아이디로 빠르게 로그인/회원가입 하세요 :)</span>
                    </div>
                    <div className='Login__kakaoLogin__box'>
                    <a className="Login__kakaoLogin" href="https://kauth.kakao.com/oauth/authorize?client_id=8869b2e721fae7a4bc8d282f48dfef0c&redirect_uri=http://localhost:3000/LoginPage/Kakao&response_type=code">
                    <img src={kakaoLogin_}/>
                    </a>
                    </div>
                    <div className='Login__naverLogin__box'>
                    <a className="Login__naverLogin" href="">

                    </a>
                    </div>
                    <div>
      <KakaoLogin
        jsKey="ab9f2e5a4c00992d05662f722f6d28e6"
        onSuccess={handleSuccess}
        onFailure={handleFailure}
        getProfile={true}
      />
    </div>
            
            </div>
        </div>
        </div>
    );
} 

export default LoginPage;