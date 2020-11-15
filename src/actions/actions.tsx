import {GameState} from "../reducers/game/game.reducer";
import {CellPosition} from "../components/cell/cell.component";
import {GameLevel} from "../components/level-dialog/level-dialog.component";

export enum ActionTypes {
    startGame,
    cellClicked,
    cellClickFailed,
    gameWon,
    cellRightClicked,
    incrementTime,
    dragNDropFlag,
    selectFlag,
    selectCrossedFlag,
    selectQuestion,
    selectCrossedQuestion,
    selectMagicWand,
    openMenuAction,
    closeMenuAction,
    openLevelDialog,
    closeLevelDialog,
    changeLevel,
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

export interface DragNDropFlag {
    type: ActionTypes.dragNDropFlag,
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

export interface SelectQuestionAction {
    type: ActionTypes.selectQuestion
}

export interface SelectCrossedQuestion {
    type: ActionTypes.selectCrossedQuestion
}

export interface SelectMagicWand {
    type: ActionTypes.selectMagicWand
}

export interface OpenMenuAction {
    type: ActionTypes.openMenuAction
    payload: null
}

export interface CloseMenuAction {
    type: ActionTypes.closeMenuAction
    payload: null
}

export interface OpenLevelDialog {
    type: ActionTypes.openLevelDialog
    payload: null
}

export interface CloseLevelDialog {
    type: ActionTypes.closeLevelDialog
    payload: null
}

export interface ChangeLevel {
    type: ActionTypes.changeLevel
    payload: GameLevel
}

export type Action = StartGame | CellClicked | GameFailed | GameWon | CellRightClicked | IncrementTime | DragNDropFlag | SelectFlagAction | SelectCrossedFlagAction | SelectQuestionAction | SelectCrossedQuestion | SelectMagicWand | OpenMenuAction | CloseMenuAction | OpenLevelDialog | CloseLevelDialog | ChangeLevel;