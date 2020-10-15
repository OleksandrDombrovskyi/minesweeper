import React from "react";
import './body.style.css';
import {useSelector} from "react-redux";
import {selectGameGrid, selectGameGridBombs} from "../../reducers/game/game.selector";
import GridComponent from "../grid/grid.component";

export const Body = () => {
    // const grid = useSelector(selectGameGrid)
    return (
        <div className="body">
            <GridComponent/>
        </div>
    )
}