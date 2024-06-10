import './App.css';
import "./component/SearchBar.module.css";
import {React, useState, useEffect} from 'react';
import {BrowserRouter, Route, Routes,} from "react-router-dom"
import Summary from './routes/Summary';
import MainPage from './routes/MainPage';
import History from './routes/History';
import HistoryDetail from './routes/HistoryDetail';
import LoginPage from './routes/LoginPage';
import Header from './component/Header';
import Recommend from './routes/Recommend';


function App() {

  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const storedUserInfo = localStorage.getItem('userInfo');
    if (storedUserInfo) {
      setUserInfo(JSON.parse(storedUserInfo));
    }
  }, []);

  return (
    <BrowserRouter>
    <div>
    <Header userInfo={userInfo} /> {/* Header에 userInfo prop 전달 */}
        <Routes>
        <Route path="/" exact={true} element={<MainPage userInfo={userInfo} />}></Route>
          <Route path="/summary" exact={true} element={<Summary userInfo={userInfo}/>}></Route>
          <Route path="/LoginPage" exact={true} element={<LoginPage setUserInfo={setUserInfo} />}></Route>
          <Route path="/summary/:vid" exact={true} element={<Summary />}></Route>
          <Route path="/recommend/:uid" exact={true} element={<Recommend userInfo={userInfo}/>} ></Route>
          <Route path="/history/:uid" exact={true} element={<History userInfo={userInfo}/>}></Route>
          <Route path="/historyDetail/:uid/:vid" exact={true} element={<HistoryDetail userInfo={userInfo}/>}></Route>
        </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;