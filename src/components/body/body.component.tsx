import React from "react";
import './body.style.css';
import GridComponent from "../grid/grid.component";

export const Body = () => {
    return (
        <div className="body_container">
            <div className="body">
                <GridComponent/>
            </div>
        </div>
    )
}