import {CellPosition} from "../components/cell/cell.component";
import {GameLevel} from "../components/level-dialog/level-dialog.component";
import {LevelParams} from "../reducers/game/data";
import {createAction} from "typesafe-actions";

export const startGame = createAction('startGame')<LevelParams>();
export const cellClicked = createAction('cellClicked')<CellPosition>();
export const cellRightClicked = createAction('cellRightClicked')<CellPosition>();
export const cellClickFailed = createAction('cellClickFailed')<void>();
export const gameWon = createAction('gameWon')<void>();
export const incrementTime = createAction('incrementTime')<void>();
export const dragNDropFlag = createAction('dragNDropFlag')<MoveFlagProps>();
export const selectFlag = createAction('selectFlag')<void>();
export const selectCrossedFlag = createAction('selectCrossedFlag')<void>();
export const selectQuestion = createAction('selectQuestion')<void>();
export const selectCrossedQuestion = createAction('selectCrossedQuestion')<void>();
export const selectMagicWand = createAction('selectMagicWand')<void>();
export const openMenuAction = createAction('openMenuAction')<void>();
export const closeMenuAction = createAction('closeMenuAction')<void>();
export const openLevelDialog = createAction('openLevelDialog')<void>();
export const closeLevelDialog = createAction('closeLevelDialog')<void>();
export const changeLevel = createAction('changeLevel')<GameLevel>();

export interface MoveFlagProps {
    cellToAddFlag?: CellPosition,
    cellToRemoveFlag?: CellPosition
}