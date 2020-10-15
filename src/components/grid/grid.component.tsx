import React from "react";
import GridCell, {CellProps} from "../cell/cell.component";
import './grid.style.css';
import {GameState} from "../../reducers/game/game.reducer";
import {createStructuredSelector} from "reselect";
import {selectGameGrid} from "../../reducers/game/game.selector";
import {AppState} from "../../reducers/rootReducer";
import {connect} from "react-redux";

const GridComponent = (props: GameState) => {

    console.log("Render grid");
    return (
        <div className="grid">
            {
                props.grid.cells.map((cellProps: Array<CellProps>) =>
                    cellProps.map(cellProp => <GridCell key={cellProp.position.x + "x" + cellProp.position.y} {...cellProp}/>))
            }
        </div>
    )
}

const mapStateToProps = createStructuredSelector<AppState, GameState>({
        grid: selectGameGrid
})

export default connect(mapStateToProps)(GridComponent)