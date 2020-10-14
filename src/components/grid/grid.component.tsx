import React from "react";
import {useSelector} from "react-redux";
import {selectGameGridBombs} from "../../reducers/game/game.selector";
import {CellProps, GridCell} from "../cell/cell.component";
import './grid.style.css';

export const Grid = () => {

    const cellsProps = useSelector(selectGameGridBombs)

    return (
        <div className="grid">
            {
                cellsProps.map((cellProps: Array<CellProps>) =>
                    cellProps.map(cellProp => <GridCell key={cellProp.position.x + "x" + cellProp.position.y} {...cellProp}/>))
            }
        </div>
    )
}