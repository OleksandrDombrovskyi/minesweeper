import {Grid} from "../reducers/game/game.reducer";

export enum ActionTypes {
    startGame
}

export interface StartGame {
    type: ActionTypes.startGame,
    payload: Grid
}

export type Action = StartGame;