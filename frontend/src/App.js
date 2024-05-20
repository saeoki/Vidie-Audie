import './App.css';
import "./component/SearchBar.module.css";

import React from 'react';
import {BrowserRouter, Route, Routes, Link} from "react-router-dom"
import Summary from './routes/Summary';
import MainPage from './routes/MainPage';
import Recommend from './routes/Recommend';
import History from './routes/History';
import HistoryDetail from './routes/HistoryDetail';
import LoginPage from './routes/LoginPage';

function App() {

  return (
    <BrowserRouter>
    <div>
        <Routes>
          <Route path="/" exact={true} element={<MainPage />}></Route>
          <Route path="/summary/:vid" exact={true} element={<Summary />}></Route>
          <Route path="/recommend" exact={true} element={<Recommend/>}></Route>
          <Route path="/history" exact={true} element={<History/>}></Route>
          <Route path="/historyDetail" exact={true} element={<HistoryDetail/>}></Route>
        </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;