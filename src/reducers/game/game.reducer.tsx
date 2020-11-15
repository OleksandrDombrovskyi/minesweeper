import {Action, ActionTypes} from "../../actions/actions";
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

export const gameReducer = (state: GameState = INITIAL_STATE, action: Action): GameState => {
    switch (action.type) {
        case ActionTypes.startGame:
            return createNewGameState(action.payload);
        case ActionTypes.cellClicked:
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
        case ActionTypes.cellClickFailed:
            return {
                ...state,
                grid: openAllBombsGrid(state.grid),
                isGameFailed: true,
            }
        case ActionTypes.cellRightClicked:
            return {
                ...state,
                grid: {
                    cells: rerenderGridOnRightClick(state.grid.cells, action.payload),
                }
            }
        case ActionTypes.gameWon:
            return {
                ...state,
                grid: openAllBombsGrid(state.grid),
            }
        case ActionTypes.incrementTime:
            return {
                ...state,
                gameTime: isGameInProcess(state) ? state.gameTime + 1 : state.gameTime,
            }
        case ActionTypes.dragNDropFlag:
            return {
                ...state,
                grid: {
                    cells: rerenderGridOnDragNDroppedFlag(state.grid.cells, action.payload.cellToAddFlag, action.payload.cellToRemoveFlag),
                }
            }
        case ActionTypes.selectFlag:
            return {
                ...state,
                isFlagSelected: !state.isFlagSelected,
                isFlagCrossedSelected: false,
                isQuestionSelected: false,
                isRemoveQuestionSelected: false,
                isMagicWandSelected: false
            }
        case ActionTypes.selectCrossedFlag:
            return {
                ...state,
                isFlagCrossedSelected: !state.isFlagCrossedSelected,
                isFlagSelected: false,
                isQuestionSelected: false,
                isRemoveQuestionSelected: false,
                isMagicWandSelected: false
            }
        case ActionTypes.selectQuestion:
            return {
                ...state,
                isQuestionSelected: !state.isQuestionSelected,
                isFlagSelected: false,
                isFlagCrossedSelected: false,
                isRemoveQuestionSelected: false,
                isMagicWandSelected: false
            }
        case ActionTypes.selectCrossedQuestion:
            return {
                ...state,
                isRemoveQuestionSelected: !state.isRemoveQuestionSelected,
                isFlagSelected: false,
                isFlagCrossedSelected: false,
                isQuestionSelected: false,
                isMagicWandSelected: false
            }
        case ActionTypes.selectMagicWand:
            return {
                ...state,
                isMagicWandSelected: state.isMagicWandSelected ? false : state.isGridCalculated && state.magicWandCounter > 0,
                isFlagSelected: false,
                isFlagCrossedSelected: false,
                isQuestionSelected: false,
                isRemoveQuestionSelected: false
            }
        case ActionTypes.openMenuAction:
            return {
                ...state,
                isMenuOpened: true
            }
        case ActionTypes.closeMenuAction:
            return {
                ...state,
                isMenuOpened: false
            }
        case ActionTypes.openLevelDialog:
            return {
                ...state,
                isLevelDialogOpened: true,
                isMenuOpened: false
            }
        case ActionTypes.closeLevelDialog:
            return {
                ...state,
                isLevelDialogOpened: false
            }
        case ActionTypes.changeLevel:
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
