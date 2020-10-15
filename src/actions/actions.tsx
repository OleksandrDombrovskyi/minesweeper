import {Grid} from "../reducers/game/game.reducer";
import {CellPosition} from "../components/cell/cell.component";

export enum ActionTypes {
    startGame,
    cellClicked,
    cellClickFailed
}

export interface StartGame {
    type: ActionTypes.startGame,
    payload: Grid
}

export interface CellClicked {
    type: ActionTypes.cellClicked,
    payload: CellPosition
}

export interface GameFailed {
    type: ActionTypes.cellClickFailed,
    payload: null
}

export type Action = StartGame | CellClicked | GameFailed;