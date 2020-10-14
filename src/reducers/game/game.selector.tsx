import {createSelector} from 'reselect';
import {AppState} from "../rootReducer";
import {GameState, Grid} from "./game.reducer";
import {CellProps} from "../../components/cell/cell.component";

const selectGameState = (state: AppState): GameState => state.gameState;

export const selectGameGrid = createSelector<AppState, GameState, Grid>(
    [selectGameState],
    (gameState: GameState) => gameState.grid
);

export const selectGameGridBombs = createSelector<AppState, Grid, CellProps[][]>(
    [selectGameGrid],
    (grid: Grid) => grid.cells
)