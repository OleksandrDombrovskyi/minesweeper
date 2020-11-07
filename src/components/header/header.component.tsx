import React from "react";
import "./header.style.css";
import {CentralNavbar} from "../central-navbar/central-navbar.component";
import {MenuButton} from "../menu-button/menu-button.component";
import {isMobileDevice} from "../../utils/detectmobilebrowser";

export const Header = () => {
    return (
        <div className="header">
            <div className="left_box">
                {
                    !isMobileDevice() && <MenuButton/>
                }
            </div>
            <div className="centered_box">
                <CentralNavbar/>
            </div>
            <div className="right_box">
            </div>
        </div>
    )
}