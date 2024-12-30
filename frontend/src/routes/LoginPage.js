import React from 'react';
import KakaoLogin from 'react-kakao-login';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LoginPage.css';

const apiUrl = process.env.REACT_APP_API_BASE_URL;



function LoginPage({ setUserInfo }) {

  const navigate = useNavigate();
  const handleSuccess = (data) => {
    console.log('Kakao response:', data);  // 카카오 응답 로그

    axios.post(`${apiUrl}/kakaoLogin`, {
      token: data.response.access_token,
    })
    .then((res) => {
      console.log('Server response:', res.data);  // 서버 응답 로그
      setUserInfo(res.data); // 사용자 정보 설정
      localStorage.setItem('userInfo', JSON.stringify(res.data)); // 로컬 스토리지에 사용자 정보 저장
      navigate('/'); // MainPage로 이동
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
            <KakaoLogin
              jsKey={process.env.REACT_APP_KAKAO_JSKEY}
              onSuccess={handleSuccess}
              onFailure={handleFailure}
              getProfile={true}
            />
          </div>
          <div className='Login__naverLogin__box'>
            <a className="Login__naverLogin" href=""></a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
