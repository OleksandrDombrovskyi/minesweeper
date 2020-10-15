import {Grid} from "../reducers/game/game.reducer";
import {CellPosition, CellProps, CellState} from "../components/cell/cell.component";

export function handleOnClick(grid: Grid, cellPosition: CellPosition) {
    const clickedCell = grid.cells[cellPosition.y][cellPosition.x];

    if (clickedCell.state === CellState.FLAGGED) {
        return;
    }

    if (clickedCell.number === -1) {
        clickedCell.isFailed = true;
    }

    openCell(grid, clickedCell.position)
}

export function openAllBombs(grid: Grid): void {
    grid.cells.forEach(cellArray => cellArray.forEach(cell => {
        if (cell.number === -1 && cell.state !== CellState.FLAGGED) {
            cell.state = CellState.OPEN;
        }
    }));
}

export function isAllCellsOpened(cells: Array<Array<CellProps>>) {
    return cells.flat()
        .filter(cell => cell.number !== -1)
        .every(cell => cell.state === CellState.OPEN)
}

function openCell(grid: Grid, cellPosition: CellPosition) {
    if (isPositionOutOfBound(grid, cellPosition)) {
        return;
    }

    const cell = grid.cells[cellPosition.y][cellPosition.x];
    cell.state = CellState.OPEN;

    // open all cells around
    if (cell.number === 0) {
        for (let i = cellPosition.x - 1; i <= cellPosition.x + 1; i++) {
            for (let j = cellPosition.y - 1; j <= cellPosition.y + 1; j++) {
                if (i === cellPosition.x && j === cellPosition.y) {
                    continue;
                }

                openCell(grid, {x: i, y: j})
            }
        }
    }
}

function isPositionOutOfBound(grid: Grid, cellPosition: CellPosition) {
    return cellPosition.x < 0 || cellPosition.y < 0
        || cellPosition.x >= grid.cells.length || cellPosition.y >= grid.cells[0].length;
}
