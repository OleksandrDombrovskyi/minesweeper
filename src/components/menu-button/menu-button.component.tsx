import React, {Dispatch} from "react";
import './menu-button.style.css';
import {useDispatch} from "react-redux";
import {Action} from "../../actions/actions";
import {isMobileDevice} from "../../utils/detectmobilebrowser";

export const MenuButton = () => {

    const dispatch = useDispatch();

    return (
        <div className="menu_button_container">
            <img className="menu_image" src="menu-icon.png" onClick={openMenu(dispatch)} alt="Menu" style={isMobileDevice() ? {} : {paddingLeft: "20px"}}/>
        </div>
    )
}

function openMenu(dispatch: Dispatch<Action>) {
    return () => console.log("Implement me!");
}