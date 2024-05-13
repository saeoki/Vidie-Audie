import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import Sidebar from "./SideBar2";
import LoginBtn from "./LoginBtn";


function Header() {
    return (
        <div>
        <div className="header__div">
            <div className="header__div__content">
                <div className="header__div__sidebar"><Sidebar/></div>
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