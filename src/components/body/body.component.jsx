import React from "react";
import './body.style.css';
import GridComponent from "../grid/grid.component";

export const Body = () => {
    // const grid = useSelector(selectGameGrid)
    return (
        <div className="body_container">
            <div className="body">
                <GridComponent/>
            </div>
        </div>
    )
}