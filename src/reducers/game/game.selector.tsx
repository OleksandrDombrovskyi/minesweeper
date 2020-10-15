import {createSelector} from 'reselect';
import {AppState} from "../rootReducer";
import {GameState, Grid} from "./game.reducer";
import {CellPosition, CellProps, CellState} from "../../components/cell/cell.component";

const selectGameState = (state: AppState): GameState => state.gameState;

export const selectGameGrid = createSelector<AppState, GameState, Grid>(
    [selectGameState],
    (gameState: GameState) => gameState.grid
);

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