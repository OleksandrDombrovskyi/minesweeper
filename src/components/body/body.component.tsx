import React from "react";
import './body.style.css';
import GridComponent from "../grid/grid.component";
import {isMobileDevice} from "../../utils/detectmobilebrowser";

export const Body = () => {
    return (
        <div className="body_container" style={isMobileDevice() ? {marginBottom: "85px"} : {}}>
            <div className="body">
                <GridComponent/>
            </div>
        </div>
    )
}