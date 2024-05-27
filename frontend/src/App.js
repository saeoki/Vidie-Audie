import './App.css';
import "./component/SearchBar.module.css";

import {React, useState} from 'react';
import {BrowserRouter, Route, Routes, Link} from "react-router-dom"
import Summary from './routes/Summary';
import MainPage from './routes/MainPage';
import LoginPage from './routes/LoginPage';
import Header from './component/Header';
import Recommend from './routes/Recommend';
import History from './routes/History';
import HistoryDetail from './routes/HistoryDetail';

function App() {

  const [userInfo, setUserInfo] = useState(null);

  return (
    <BrowserRouter>
    <div>
    <Header userInfo={userInfo} /> {/* Header에 userInfo prop 전달 */}
        <Routes>
          <Route path="/" exact={true} element={<MainPage />}></Route>
          <Route path="/summary" exact={true} element={<Summary />}></Route>
          <Route path="/LoginPage" exact={true} element={<LoginPage setUserInfo={setUserInfo} />}></Route>
          <Route path="/recommend" exact={true} element={<Recommend/>}></Route>
          <Route path="/history" exact={true} element={<History/>}></Route>
          <Route path="/historyDetail" exact={true} element={<HistoryDetail/>}></Route>
        </Routes>

    </div>
    </BrowserRouter>
    
  );
}

export default App;
