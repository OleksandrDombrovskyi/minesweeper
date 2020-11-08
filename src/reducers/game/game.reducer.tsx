import {Action, ActionTypes} from "../../actions/actions";
import {CellPosition, CellProps} from "../../components/cell/cell.component";
import {
    addFlag,
    handleOnClick,
    handleOnDragNDroppedFlag,
    handleOnDragNDroppedRemoveFlag,
    handleOnRightClick,
    isAllCellsOpened,
    openAllBombs,
    removeFlag
} from "../../utils/gridUtils";
import {generateDefaultGrid, moveBombsFromClickedCellAndCalculateGrid} from "../../utils/gridGeneratorUtils";

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
    isMenuOpened: boolean;
    grid: Grid;
}

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
    isMenuOpened: false,
    grid: {
        cells: generateDefaultGrid(10, 10)
    }
}

export const gameReducer = (state: GameState = INITIAL_STATE, action: Action): GameState => {
    switch (action.type) {
        case ActionTypes.startGame:
            return action.payload;
        case ActionTypes.cellClicked:
            let cells = rerenderGridOnClick(state, action.payload);
            return {
                ...state,
                grid: {
                    cells: cells
                },
                isGameWon: isGameWon(cells),
                isFlagSelected: false,
                isFlagCrossedSelected: false
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
                isFlagCrossedSelected: false,
                isFlagSelected: !state.isFlagSelected
            }
        case ActionTypes.selectCrossedFlag:
            return {
                ...state,
                isFlagSelected: false,
                isFlagCrossedSelected: !state.isFlagCrossedSelected
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
        default:
            return INITIAL_STATE;
    }
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
        addFlag(gridCells, cellPosition)
    } else if (state.isFlagCrossedSelected) {
        removeFlag(gridCells, cellPosition)
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
