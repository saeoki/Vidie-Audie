import React from 'react';
import Header from '../component/Header';
import './LoginPage.css';
import kakaoLogin from '../images/kakao_login_medium_wide.png';
import naverLogin from '../images/btnG_완성형.png'

function LoginPage(){
    return (
        <div className='Login'>
            <Header />
            <div className='Login__container'>

                 <div className='Login__box'>
                    <div className='Login__explain'>
                        <span className='Login__explain__title'>간편하게 로그인</span>
                        <span className='Login__explain__content'>아이디/비밀번호 입력할 필요 없어요!</span>
                        <span className='Login__explain__content'>SNS 아이디로 빠르게 로그인/회원가입 하세요 :)</span>
                    </div>
                    <div className='Login__kakaoLogin__box'>
                    <a className="Login__kakaoLogin" href="/https://developers.kakao.com/product/kakaoLogin">
                    <img src={kakaoLogin}/>
                    </a>
                    </div>
                    <div className='Login__naverLogin__box'>
                    <a className="Login__naverLogin" href="">

                    </a>
                    </div>
            
            </div>
        </div>
        </div>
    );
} 

export default LoginPage;