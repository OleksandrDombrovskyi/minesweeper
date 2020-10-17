import {Grid} from "../reducers/game/game.reducer";
import {CellPosition, CellProps, CellState} from "../components/cell/cell.component";

export function handleOnClick(cells: CellProps[][], cellPosition: CellPosition) {
    const clickedCell = cells[cellPosition.y][cellPosition.x];

    if (clickedCell.state === CellState.FLAGGED || clickedCell.state === CellState.QUESTIONED) {
        return;
    }

    if (clickedCell.number === -1) {
        clickedCell.isFailed = true;
    }

    openCell(cells, clickedCell.position)
}

export function handleOnRightClick(cells: CellProps[][], cellPosition: CellPosition) {
    const clickedCell = cells[cellPosition.y][cellPosition.x];
    switch (clickedCell.state) {
        case CellState.INITIAL:
            clickedCell.state = CellState.FLAGGED;
            break;
        case CellState.FLAGGED:
            clickedCell.state = CellState.QUESTIONED;
            break;
        case CellState.QUESTIONED:
            clickedCell.state = CellState.INITIAL;
    }
}

export function handleOnDragNDroppedFlag(cells: CellProps[][], cellPosition: CellPosition) {
    const droppedCell = cells[cellPosition.y][cellPosition.x];
    if (droppedCell.state === CellState.INITIAL || droppedCell.state === CellState.QUESTIONED) {
        droppedCell.state = CellState.FLAGGED;
    }
}

export function handleOnDragNDroppedRemoveFlag(cells: CellProps[][], cellPosition: CellPosition) {
    const removeFlagCell = cells[cellPosition.y][cellPosition.x];
    if (removeFlagCell.state !== CellState.OPEN) {
        removeFlagCell.state = CellState.INITIAL;
    }
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

function openCell(cells: CellProps[][], cellPosition: CellPosition) {
    if (isPositionOutOfBound(cells, cellPosition)) {
        return;
    }

    const cell = cells[cellPosition.y][cellPosition.x];
    if (cell.state === CellState.OPEN) {
        return; // to avoid looping on neighbouring empty cells
    }
    cell.state = CellState.OPEN;

    // open all cells around
    if (cell.number === 0) {
        for (let i = cellPosition.x - 1; i <= cellPosition.x + 1; i++) {
            for (let j = cellPosition.y - 1; j <= cellPosition.y + 1; j++) {
                if (i === cellPosition.x && j === cellPosition.y) {
                    continue;
                }

                openCell(cells, {x: i, y: j})
            }
        }
    }
}

export function isPositionOutOfBound(grid: Array<Array<CellProps>>, cellPosition: CellPosition) {
    return cellPosition.x < 0 || cellPosition.y < 0
        || cellPosition.x >= grid.length || cellPosition.y >= grid[0].length;
}
