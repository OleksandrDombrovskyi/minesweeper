import {GameState} from "../reducers/game/game.reducer";
import {CellPosition} from "../components/cell/cell.component";

export enum ActionTypes {
    startGame,
    cellClicked,
    cellClickFailed,
    gameWon,
    cellRightClicked,
    incrementTime,
    dragNDroppedFlag,
    selectFlag,
    selectCrossedFlag,
}

export interface StartGame {
    type: ActionTypes.startGame,
    payload: GameState
}

export interface CellClicked {
    type: ActionTypes.cellClicked,
    payload: CellPosition
}

export interface CellRightClicked {
    type: ActionTypes.cellRightClicked,
    payload: CellPosition
}

export interface GameFailed {
    type: ActionTypes.cellClickFailed,
    payload: null
}

export interface GameWon {
    type: ActionTypes.gameWon,
    payload: null
}

export interface IncrementTime {
    type: ActionTypes.incrementTime,
    payload: null
}

export interface DragNDroppedFlag {
    type: ActionTypes.dragNDroppedFlag,
    payload: {
        cellToAddFlag?: CellPosition,
        cellToRemoveFlag?: CellPosition
    }
}

export interface SelectFlagAction {
    type: ActionTypes.selectFlag,
    payload: null
}

export interface SelectCrossedFlagAction {
    type: ActionTypes.selectCrossedFlag,
    payload: null
}

export type Action = StartGame | CellClicked | GameFailed | GameWon | CellRightClicked | IncrementTime | DragNDroppedFlag | SelectFlagAction | SelectCrossedFlagAction;