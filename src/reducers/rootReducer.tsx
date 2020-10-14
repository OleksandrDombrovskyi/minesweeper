import {combineReducers} from "redux";
import {gameReducer, GameState} from "./game/game.reducer";

export interface AppState {
    gameState: GameState
}

export const reducers = combineReducers<AppState>({
    gameState: gameReducer
})