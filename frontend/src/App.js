import './App.css';
import "./component/SearchBar.module.css";

import React from 'react';
import {BrowserRouter, Route, Routes, Link} from "react-router-dom"
import Summary from './routes/Summary';
import MainPage from './routes/MainPage';
import LoginPage from './routes/LoginPage';

function App() {

  return (
    <BrowserRouter>
    <div>
        <Routes>
          <Route path="/" exact={true} element={<MainPage />}></Route>
          <Route path="/summary" exact={true} element={<Summary />}></Route>
          <Route path="/LoginPage" exact={true} element={<LoginPage />}></Route>
        </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
