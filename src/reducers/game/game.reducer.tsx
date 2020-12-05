import * as actions from "../../actions/actions";
import {CellPosition, CellProps} from "../../components/cell/cell.component";
import {
    addFlag,
    addQuestion,
    handleOnClick,
    handleOnDragNDroppedFlag,
    handleOnDragNDroppedRemoveFlag,
    handleOnRightClick,
    isAllCellsOpened,
    openAllBombs,
    openCellSafely,
    removeFlag,
    removeQuestion
} from "../../utils/gridUtils";
import {generateDefaultGrid, moveBombsFromClickedCellAndCalculateGrid} from "../../utils/gridGeneratorUtils";
import {LevelParams, levelsTable} from "./data";
import {ActionType, getType, Reducer} from "typesafe-actions";

type Actions = ActionType<typeof actions>

export interface Grid {
    cells: Array<Array<CellProps>>
}

export interface GameState {
    isGameWon: boolean;
    isGameFailed: boolean
    isGridCalculated: boolean;
    gameTime: number;
    isFlagSelected: boolean;
    isFlagCrossedSelected: boolean;
    isQuestionSelected: boolean;
    isRemoveQuestionSelected: boolean;
    isMagicWandSelected: boolean;
    magicWandCounter: number;
    isMenuOpened: boolean;
    isLevelDialogOpened: boolean;
    level: LevelParams,
    grid: Grid;
}

export const INITIAL_LEVEL_PARAMS: LevelParams = levelsTable.get("small")?.get("easy") as LevelParams;

export const INITIAL_STATE: GameState = {
    isGameWon: false,
    isGameFailed: false,
    isGridCalculated: false,
    gameTime: 0,
    isFlagSelected: false,
    isFlagCrossedSelected: false,
    isQuestionSelected: false,
    isRemoveQuestionSelected: false,
    isMagicWandSelected: false,
    magicWandCounter: INITIAL_LEVEL_PARAMS.magicWandAmount,
    isMenuOpened: false,
    isLevelDialogOpened: false,
    level: INITIAL_LEVEL_PARAMS,
    grid: {
        cells: generateDefaultGrid(INITIAL_LEVEL_PARAMS)
    }
}

export const gameReducer: Reducer<GameState, Actions> = (state: GameState = INITIAL_STATE, action: Actions): GameState => {
    switch (action.type) {
        case getType(actions.startGame):
            return createNewGameState(action.payload);
        case getType(actions.cellClicked):
            let cells = rerenderGridOnClick(state, action.payload);
            return {
                ...state,
                grid: {
                    cells: cells
                },
                isGameWon: isGameWon(cells),
                isFlagSelected: false,
                isFlagCrossedSelected: false,
                isQuestionSelected: false,
                isRemoveQuestionSelected: false,
                isMagicWandSelected: false
            }
        case getType(actions.cellClickFailed):
            return {
                ...state,
                grid: openAllBombsGrid(state.grid),
                isGameFailed: true,
            }
        case getType(actions.cellRightClicked):
            return {
                ...state,
                grid: {
                    cells: rerenderGridOnRightClick(state.grid.cells, action.payload),
                }
            }
        case getType(actions.gameWon):
            return {
                ...state,
                grid: openAllBombsGrid(state.grid),
            }
        case getType(actions.incrementTime):
            return {
                ...state,
                gameTime: isGameInProcess(state) ? state.gameTime + 1 : state.gameTime,
            }
        case getType(actions.dragNDropFlag):
            return {
                ...state,
                grid: {
                    cells: rerenderGridOnDragNDroppedFlag(state.grid.cells, action.payload.cellToAddFlag, action.payload.cellToRemoveFlag),
                }
            }
        case getType(actions.selectFlag):
            return {
                ...state,
                isFlagSelected: !state.isFlagSelected,
                isFlagCrossedSelected: false,
                isQuestionSelected: false,
                isRemoveQuestionSelected: false,
                isMagicWandSelected: false
            }
        case getType(actions.selectCrossedFlag):
            return {
                ...state,
                isFlagCrossedSelected: !state.isFlagCrossedSelected,
                isFlagSelected: false,
                isQuestionSelected: false,
                isRemoveQuestionSelected: false,
                isMagicWandSelected: false
            }
        case getType(actions.selectQuestion):
            return {
                ...state,
                isQuestionSelected: !state.isQuestionSelected,
                isFlagSelected: false,
                isFlagCrossedSelected: false,
                isRemoveQuestionSelected: false,
                isMagicWandSelected: false
            }
        case getType(actions.selectCrossedQuestion):
            return {
                ...state,
                isRemoveQuestionSelected: !state.isRemoveQuestionSelected,
                isFlagSelected: false,
                isFlagCrossedSelected: false,
                isQuestionSelected: false,
                isMagicWandSelected: false
            }
        case getType(actions.selectMagicWand):
            return {
                ...state,
                isMagicWandSelected: state.isMagicWandSelected ? false : state.isGridCalculated && state.magicWandCounter > 0,
                isFlagSelected: false,
                isFlagCrossedSelected: false,
                isQuestionSelected: false,
                isRemoveQuestionSelected: false
            }
        case getType(actions.openMenuAction):
            return {
                ...state,
                isMenuOpened: true
            }
        case getType(actions.closeMenuAction):
            return {
                ...state,
                isMenuOpened: false
            }
        case getType(actions.openLevelDialog):
            return {
                ...state,
                isLevelDialogOpened: true,
                isMenuOpened: false
            }
        case getType(actions.closeLevelDialog):
            return {
                ...state,
                isLevelDialogOpened: false
            }
        case getType(actions.changeLevel):
            const levelParams: LevelParams = levelsTable.get(action.payload.scale)?.get(action.payload.complexity) as LevelParams;
            return createNewGameState(levelParams)
        default:
            return INITIAL_STATE;
    }
}

function createNewGameState(levelParams: LevelParams) {
    return {
        ...INITIAL_STATE,
        magicWandCounter: levelParams.magicWandAmount,
        level: levelParams,
        grid: {
            cells: generateDefaultGrid(levelParams)
        }
    };
}

function rerenderGridOnDragNDroppedFlag(cells: Array<Array<CellProps>>, cellToAddFlag?: CellPosition, cellToRemoveFlag?: CellPosition): Array<Array<CellProps>> {
    if (cellToRemoveFlag) {
        handleOnDragNDroppedRemoveFlag(cells, cellToRemoveFlag);
    }
    if (cellToAddFlag) {
        handleOnDragNDroppedFlag(cells, cellToAddFlag);
    }
    return cells;
}

function isGameInProcess(state: GameState) {
    return state.isGridCalculated && !state.isGameFailed && !state.isGameWon;
}

function isGameWon(cells: CellProps[][]) {
    return isAllCellsOpened(cells);
}

function openAllBombsGrid(grid: Grid) {
    openAllBombs(grid)
    return grid;
}

function rerenderGridOnClick(state: GameState, cellPosition: CellPosition): CellProps[][] {
    let gridCells = state.grid.cells;

    if (state.isFlagSelected) {
        addFlag(gridCells, cellPosition);
    } else if (state.isFlagCrossedSelected) {
        removeFlag(gridCells, cellPosition);
    } else if (state.isQuestionSelected) {
        addQuestion(gridCells, cellPosition);
    } else if (state.isRemoveQuestionSelected) {
        removeQuestion(gridCells, cellPosition);
    } else if (state.isMagicWandSelected) {
        const isUsed = openCellSafely(gridCells, cellPosition);
        if (isUsed) {
            state.magicWandCounter--;
        }
    } else {
        if (!state.isGridCalculated) {
            gridCells = moveBombsFromClickedCellAndCalculateGrid(gridCells, cellPosition);
            state.isGridCalculated = true;
        }
        handleOnClick(gridCells, cellPosition);
    }
    return gridCells;
}

function rerenderGridOnRightClick(cells: CellProps[][], cellPosition: CellPosition): CellProps[][] {
    handleOnRightClick(cells, cellPosition);
    return cells;
}
