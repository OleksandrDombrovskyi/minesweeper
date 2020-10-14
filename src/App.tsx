import React from 'react';
import './App.css';
import {
    useSelector,
} from 'react-redux';
import {selectGameGridBombs} from "./reducers/game/game.selector";
import {CellProps, GridCell} from "./components/cell/cell.component";
import {Grid} from "./components/grid/grid.component";

export const App = () => {
    const cellsProps = useSelector(selectGameGridBombs)

    return (
        <div className="App">
            <Grid/>
        </div>
    );
}