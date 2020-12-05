import React, {Dispatch} from "react";
import "./header.style.css";
import {CentralNavbar} from "../central-navbar/central-navbar.component";
import {isMobileDevice} from "../../utils/detectmobilebrowser";
import MenuIcon from '@material-ui/icons/Menu';
import {useDispatch} from "react-redux";
import {openMenuAction} from "../../actions/actions";

export const Header = () => {

    const dispatch = useDispatch();

    return (
        <div className="header">
            {
                !isMobileDevice() &&
                <div className="left_box">
                    <MenuIcon
                        fontSize="large"
                        style={{paddingTop: 10, paddingLeft: 10, cursor: "pointer"}}
                        color="action"
                        onClick={() => dispatch(openMenuAction())}/>
                </div>
            }
            <div className="centered_box">
                <CentralNavbar/>
            </div>
            {
                !isMobileDevice() &&
                <div className="right_box">
                </div>
            }
        </div>
    )
}