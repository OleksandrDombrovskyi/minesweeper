import React from "react";
import './body.style.css';
import GridComponent from "../grid/grid.component";
import {isMobileDevice} from "../../utils/detectmobilebrowser";

export const Body = () => {
    return (
        <div className="body_container">
            <div className="body" style={isMobileDevice() ? {marginBottom: "91px"} : {}}>
                <GridComponent/>
            </div>
        </div>
    )
}