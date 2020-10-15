import {Action, ActionTypes} from "../../actions/actions";
import {CellPosition, CellProps, CellState} from "../../components/cell/cell.component";

export interface Grid {
    cells: Array<Array<CellProps>>
}

export interface GameState {
    grid: Grid
}

export const INITIAL_STATE: GameState = {
    grid: {
        cells: [
            [{position: {x: 0, y: 0}, number: 2, state: CellState.INITIAL}, {position: {x: 1, y: 0}, number: -1, state: CellState.INITIAL}, {position: {x: 2, y: 0}, number: 1, state: CellState.INITIAL}],
            [{position: {x: 0, y: 1}, number: -1, state: CellState.INITIAL}, {position: {x: 1, y: 1}, number: 2, state: CellState.INITIAL}, {position: {x: 2, y: 1}, number: 1, state: CellState.INITIAL}],
            [{position: {x: 0, y: 2}, number: 1, state: CellState.INITIAL}, {position: {x: 1, y: 2}, number: 1, state: CellState.INITIAL}, {position: {x: 2, y: 2}, number: 0, state: CellState.INITIAL}]
        ]
        // cells: [
        //     [{position: {x: 0, y: 0}, number: -1, state: CellState.FLAGGED}]
        // ]
    }
}

export const gameReducer = (state: GameState = INITIAL_STATE, action: Action) => {
    switch (action.type) {
        case ActionTypes.startGame:
            return {
                ...state,
                grid: action.payload
            }
        case ActionTypes.cellClicked:
            return {
                ...state,
                grid: getNewGrid(state.grid, action.payload)
            }
        default:
            return INITIAL_STATE;
    }
}

function getNewGrid(currentGrid: Grid, cellPosition: CellPosition) {
    currentGrid.cells[cellPosition.y][cellPosition.x].state = CellState.OPEN
    return currentGrid;
}
