import {createSelector} from 'reselect';
import {AppState} from "../rootReducer";
import {GameState, Grid} from "./game.reducer";
import {CellPosition, CellProps, CellState} from "../../components/cell/cell.component";

const selectGameState = (state: AppState): GameState => state.gameState;

export const selectGameGrid = createSelector<AppState, GameState, Grid>(
    [selectGameState],
    (gameState: GameState) => gameState.grid
);

export const selectIsGameFailed = createSelector<AppState, GameState, boolean>(
    [selectGameState],
    (gameState: GameState) => gameState.isGameFailed
)

export const selectIsGameWon = createSelector<AppState, GameState, boolean>(
    [selectGameState],
    (gameState: GameState) => gameState.isGameWon
)

export const selectIsGridGenerated = createSelector<AppState, GameState, boolean>(
    [selectGameState],
    (gameState: GameState) => gameState.isGridCalculated
)

export const selectGameGridBombs = createSelector<AppState, Grid, CellProps[][]>(
    [selectGameGrid],
    (grid: Grid) => grid.cells
)

export const selectClickedCell = (position: CellPosition) => createSelector<AppState, CellProps[][], CellProps>(
    [selectGameGridBombs],
    (cellsProps: CellProps[][]) => cellsProps[position.y][position.x]
)

export const selectCellNumber = (position: CellPosition) => createSelector<AppState, CellProps, number>(
    [selectClickedCell(position)],
    (cellProps: CellProps) => cellProps.number
)

export const selectCellState = (position: CellPosition) => createSelector<AppState, CellProps, CellState>(
    [selectClickedCell(position)],
    (cellProps: CellProps) => cellProps.state
)

export const selectCellIsFailed = (position: CellPosition) => createSelector<AppState, CellProps, boolean>(
    [selectClickedCell(position)],
    (cellProps: CellProps) => cellProps.isFailed
)

export const selectBombAmount = createSelector<AppState, Grid, number>(
    [selectGameGrid],
    (grid: Grid) => grid.cells.flat().filter(cell => cell.number === -1).length
)

export const selectFlagAmount = createSelector<AppState, Grid, number>(
    [selectGameGrid],
    (grid: Grid) => grid.cells.flat().filter(cell => cell.state === CellState.FLAGGED).length
)

export const selectGameTime = createSelector<AppState, GameState, number>(
    [selectGameState],
    (gameState: GameState) => gameState.gameTime
)

export const selectIsFlagSelected = createSelector<AppState, GameState, boolean>(
    [selectGameState],
    (gameState: GameState) => gameState.isFlagSelected
)

export const selectIsCrossedFlagSelected = createSelector<AppState, GameState, boolean>(
    [selectGameState],
    (gameState: GameState) => gameState.isFlagCrossedSelected
)