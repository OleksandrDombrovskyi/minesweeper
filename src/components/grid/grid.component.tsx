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
    selectIsLevelDialogOpened,
    selectIsMagicWandSelected,
    selectIsMenuOpened,
    selectIsQuestionSelected,
    selectIsRemoveQuestionSelected,
    selectLevelParams,
    selectMagicWandCounter
} from "../../reducers/game/game.selector";
import {AppState} from "../../reducers/rootReducer";
import {connect, useDispatch} from "react-redux";
import {gameWon} from "../../actions/actions";

const GridComponent = (props: GameState) => {

    const {
        isGameWon,
        isGameFailed,
        grid,
        level
    } = props;

    const dispatch = useDispatch();

    useEffect(() => {
        if (isGameWon) {
            dispatch(gameWon())
        }
    }, [dispatch, isGameWon])

    const numberOfColumns = level.width;
    const numberOfRows = level.height;

    return (
        <div className={"grid" + (isGameFailed || isGameWon ? " disabled" : "")}  style={{
            gridTemplateColumns: `repeat(${numberOfColumns}, 33px)`,
            gridTemplateRows: `repeat(${numberOfRows}, 33px)`
        }}>
            {
                grid.cells.map((cellProps: Array<CellProps>) =>
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
    isMagicWandSelected: selectIsMagicWandSelected,
    isMenuOpened: selectIsMenuOpened,
    magicWandCounter: selectMagicWandCounter,
    isLevelDialogOpened: selectIsLevelDialogOpened,
    level: selectLevelParams,
})

export default connect(mapStateToProps)(GridComponent)