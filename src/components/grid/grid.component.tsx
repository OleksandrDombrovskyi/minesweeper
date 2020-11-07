import React, {useEffect} from "react";
import GridCell, {CellProps} from "../cell/cell.component";
import './grid.style.css';
import {GameState} from "../../reducers/game/game.reducer";
import {createStructuredSelector} from "reselect";
import {
    selectGameGrid,
    selectGameTime,
    selectIsCrossedFlagSelected,
    selectIsFlagSelected,
    selectIsGameFailed,
    selectIsGameWon,
    selectIsGridGenerated,
    selectIsMagicWandSelected,
    selectIsQuestionSelected,
    selectIsRemoveQuestionSelected
} from "../../reducers/game/game.selector";
import {AppState} from "../../reducers/rootReducer";
import {connect, useDispatch} from "react-redux";
import {ActionTypes} from "../../actions/actions";

const GridComponent = (props: GameState) => {

    const dispatch = useDispatch();

    useEffect(() => {
        if (props.isGameWon) {
            dispatch({type: ActionTypes.gameWon})
        }
    })

    return (
        <div className={"grid" + (props.isGameFailed || props.isGameWon ? " disabled" : "")}>
            {
                props.grid.cells.map((cellProps: Array<CellProps>) =>
                    cellProps.map(cellProp => <GridCell
                        key={cellProp.position.x + "x" + cellProp.position.y} {...cellProp}/>))
            }
        </div>
    )
}

const mapStateToProps = createStructuredSelector<AppState, GameState>({
    grid: selectGameGrid,
    isGameFailed: selectIsGameFailed,
    isGameWon: selectIsGameWon,
    isGridCalculated: selectIsGridGenerated,
    gameTime: selectGameTime,
    isFlagSelected: selectIsFlagSelected,
    isFlagCrossedSelected: selectIsCrossedFlagSelected,
    isQuestionSelected: selectIsQuestionSelected,
    isRemoveQuestionSelected: selectIsRemoveQuestionSelected,
    isMagicWandSelected: selectIsMagicWandSelected
})

export default connect(mapStateToProps)(GridComponent)