import {Action, ActionTypes} from "../../actions/actions";
import {CellPosition, CellProps, CellState} from "../../components/cell/cell.component";
import {handleOnClick, isAllCellsOpened, openAllBombs} from "../../utils/gridUtils";

export interface Grid {
    cells: Array<Array<CellProps>>
}

export interface GameState {
    isGameWon: boolean;
    isGameFailed: boolean
    grid: Grid
}

export const INITIAL_STATE: GameState = {
    isGameWon: false,
    isGameFailed: false,
    grid: {
        cells: [
            [{position: {x: 0, y: 0}, number: 2, state: CellState.INITIAL, isFailed: false}, {position: {x: 1, y: 0}, number: -1, state: CellState.INITIAL, isFailed: false}, {position: {x: 2, y: 0}, number: 1, state: CellState.INITIAL, isFailed: false}],
            [{position: {x: 0, y: 1}, number: -1, state: CellState.FLAGGED, isFailed: false}, {position: {x: 1, y: 1}, number: 2, state: CellState.INITIAL, isFailed: false}, {position: {x: 2, y: 1}, number: 1, state: CellState.INITIAL, isFailed: false}],
            [{position: {x: 0, y: 2}, number: 1, state: CellState.INITIAL, isFailed: false}, {position: {x: 1, y: 2}, number: 1, state: CellState.INITIAL, isFailed: false}, {position: {x: 2, y: 2}, number: 0, state: CellState.INITIAL, isFailed: false}]
        ]
        // cells: [
        //     [{position: {x: 0, y: 0}, number: -1, state: CellState.FLAGGED}]
        // ]
    }
}

export const gameReducer = (state: GameState = INITIAL_STATE, action: Action): GameState => {
    switch (action.type) {
        case ActionTypes.startGame:
            return action.payload;
        case ActionTypes.cellClicked:
            return {
                ...state,
                grid: getNewGrid(state.grid, action.payload),
                isGameWon: isGameWon(state.grid)
            }
        case ActionTypes.cellClickFailed:
            return {
                ...state,
                grid: openAllBombsGrid(state.grid),
                isGameFailed: true,
            }
        case ActionTypes.gameWon:
            return {
                ...state,
                grid: openAllBombsGrid(state.grid),
            }
        default:
            return INITIAL_STATE;
    }
}

function isGameWon(grid: Grid) {
    return isAllCellsOpened(grid.cells);
}

function openAllBombsGrid(grid: Grid) {
    openAllBombs(grid)
    return grid;
}

function getNewGrid(currentGrid: Grid, cellPosition: CellPosition) {
    handleOnClick(currentGrid, cellPosition);
    return currentGrid;
}
