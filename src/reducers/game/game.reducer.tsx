import {Action, ActionTypes} from "../../actions/actions";
import {CellPosition, CellProps} from "../../components/cell/cell.component";
import {
    addFlag,
    handleOnClick,
    handleOnDragNDroppedFlag,
    handleOnDragNDroppedRemoveFlag,
    handleOnRightClick,
    isAllCellsOpened,
    openAllBombs, removeFlag
} from "../../utils/gridUtils";
import {generatedDefaultGrid, generateGrid} from "../../utils/gridGeneratorUtils";

export interface Grid {
    cells: Array<Array<CellProps>>
}

export interface GameState {
    isGameWon: boolean;
    isGameFailed: boolean
    isGridGenerated: boolean;
    gameTime: number;
    isFlagSelected: boolean;
    isFlagCrossedSelected: boolean;
    grid: Grid
}

export const INITIAL_STATE: GameState = {
    isGameWon: false,
    isGameFailed: false,
    isGridGenerated: false,
    gameTime: 0,
    isFlagSelected: false,
    isFlagCrossedSelected: false,
    grid: {
        cells: generatedDefaultGrid()
    }
}

export const gameReducer = (state: GameState = INITIAL_STATE, action: Action): GameState => {
    switch (action.type) {
        case ActionTypes.startGame:
            return action.payload;
        case ActionTypes.cellClicked:
            let generatedGrid;

            if (!state.isGridGenerated) {
                generatedGrid = generateGrid(action.payload, 10, 10);
                state.isGridGenerated = true;
            } else {
                generatedGrid = state.grid.cells;
            }

            return {
                ...state,
                grid: {
                    cells: rerenderGridOnClick(generatedGrid, action.payload, state.isFlagSelected, state.isFlagCrossedSelected)
                },
                isGameWon: isGameWon(generatedGrid),
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
        case ActionTypes.dragNDroppedFlag:
            return {
                ...state,
                grid: {
                    cells: rerenderGridOnDragNDroppedFlag(state.grid.cells, action.payload.cellToAddFlag, action.payload.cellToRemoveFlag),
                }
            }
        case ActionTypes.selectFlag:
            return {
                ...state,
                isFlagSelected: !state.isFlagSelected
            }
        case ActionTypes.selectCrossedFlag:
            return {
                ...state,
                isFlagCrossedSelected: !state.isFlagCrossedSelected
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
    return state.isGridGenerated && !state.isGameFailed && !state.isGameWon;
}

function isGameWon(cells: CellProps[][]) {
    return isAllCellsOpened(cells);
}

function openAllBombsGrid(grid: Grid) {
    openAllBombs(grid)
    return grid;
}

function rerenderGridOnClick(cells: CellProps[][], cellPosition: CellPosition, isFlagSelected: boolean, isFlagCrossedSelected: boolean) {
    if (isFlagSelected) {
        addFlag(cells, cellPosition)
    } else if (isFlagCrossedSelected) {
        removeFlag(cells, cellPosition)
    } else {
        handleOnClick(cells, cellPosition);
    }
    return cells;
}

function rerenderGridOnRightClick(cells: CellProps[][], cellPosition: CellPosition): CellProps[][]  {
    handleOnRightClick(cells, cellPosition);
    return cells;
}
