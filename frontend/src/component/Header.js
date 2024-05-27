import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import Sidebar from "./SideBar2";
import LoginBtn from "./LoginBtn";
import { TfiLayoutSidebar2 } from "react-icons/tfi";


function Header({userInfo}) {
    return (
        <div>
        <div className="header__div">
            <div className="header__div__content">
                <div className="header__div__sidebar"><Sidebar userInfo={userInfo}/></div>
                <div className="header__div__name">
                    <div className="header__div__name__text">
            <Link to="/"style={{ textDecoration: "none", color:"inherit"}}>
                <div>Vidie Audie</div></Link></div>
                </div>
            </div>
                <div className="header__div__login">
                    <LoginBtn/>
                </div>
        </div>
        <div className="divSpace"></div>
        </div>
    );
}

export default Header;