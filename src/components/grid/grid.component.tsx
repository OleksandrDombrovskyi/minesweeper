import React from "react";
import {CellProps, GridCell} from "../cell/cell.component";
import './grid.style.css';
import {GameState, Grid} from "../../reducers/game/game.reducer";
import {createStructuredSelector} from "reselect";
import {selectGameGrid} from "../../reducers/game/game.selector";
import {AppState} from "../../reducers/rootReducer";
import {connect} from "react-redux";

const GridComponent = (props: GameState) => {

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