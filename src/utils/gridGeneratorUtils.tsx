import {CellPosition, CellProps} from "../components/cell/cell.component";
import {isPositionOutOfBound} from "./gridUtils";

export function generatedDefaultGrid(): Array<Array<CellProps>> {
    return generateGrid({x: 0, y: 0}, 10, 10);
}

export function generateGrid(position: CellPosition, width: number, height: number): Array<Array<CellProps>> {
    let booleanArray = generateBooleanArray(width, height);
    let shuffledBooleanArray = shuffle(booleanArray);
    let booleanGrid = convertArrayIntoGrid(shuffledBooleanArray, width, height);
    let numberGrid = convertBooleanGridToNumber(booleanGrid);
    let cellPropsGridWithZeros = convertNumbersIntoCellProps(numberGrid);
    let gridWithEmptyClickedCell = moveBombsFromClickedCellArea(position, cellPropsGridWithZeros)
    return calculateCellBombNumbers(gridWithEmptyClickedCell);
}

export function moveBombsFromClickedCellArea(position: CellPosition, grid: Array<Array<CellProps>>): Array<Array<CellProps>> {
    for (let i = position.x - 1; i <= position.x + 1; i++) {
        for (let j = position.y - 1; j <= position.y + 1; j++) {
            if (isPositionOutOfBound(grid, {x: j, y: i})) {
                continue;
            }

            const cell = grid[j][i];
            if (cell.number === -1) {
                let newX;
                let newY;
                do {
                    newX = randomInt(0, grid[0].length - 1);
                    newY = randomInt(0, grid.length - 1);
                } while(isNewPositionInClickedCellArea(newX, newY, position) || isBombCell(newX, newY, grid))
                cell.number = 0;
                grid[newY][newX].number = -1;
            }
        }
    }
    return grid;
}

function isBombCell(x: number, y: number, grid: Array<Array<CellProps>>) {
    return grid[y][x].number === -1;
}

function isNewPositionInClickedCellArea(newX: number, newY: number, position: CellPosition) {
    return (newX >= position.x - 1 && newX <= position.x + 1) && (newY >= position.y - 1 && newY <= position.y + 1);
}

function randomInt(min: number, max: number): number {
    return min + Math.floor((max - min) * Math.random());
}

export function generateBooleanArray(width: number, height: number): Array<boolean> {
    const arrayLength = width * height;
    const bombAmount = Math.floor(arrayLength / 4);
    const booleanArray = new Array<boolean>();

    for (let i = 0; i < arrayLength; i++) {
        if (i < bombAmount) {
            booleanArray.push(true);
        } else {
            booleanArray.push(false);
        }
    }

    return booleanArray;
}

function shuffle(array: Array<boolean>): Array<boolean> {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

export function convertArrayIntoGrid<T>(array: Array<T>, width: number, height: number): Array<Array<T>> {
    const grid = new Array<Array<T>>();

    for (let i = 0; i < height; i++) {
        grid.push(array.slice(width * i, width * (i + 1)));
    }

    return grid;
}

export function convertBooleanGridToNumber(booleanGrid: Array<Array<boolean>>): Array<Array<number>> {
    return booleanGrid.map((array: Array<boolean>) => array.map((cell: boolean) => cell ? -1 : 0));
}

export function convertNumbersIntoCellProps(numberGrid: Array<Array<number>>): Array<Array<CellProps>> {
    const cellGrid = new Array<Array<CellProps>>();

    for (let i = 0; i < numberGrid.length; i++) {
        let row = new Array<CellProps>();
        for (let j = 0; j < numberGrid[0].length; j++) {
            row.push(new CellProps({x: j, y: i}, numberGrid[i][j]))
        }
        cellGrid.push(row);
    }

    return cellGrid;
}

export function calculateCellBombNumbers(grid: Array<Array<CellProps>>): Array<Array<CellProps>> {
    grid.forEach((array: Array<CellProps>) => array.forEach((cell: CellProps) => {
        if (cell.number === -1) {
            plusOneToEveryoneAroundBomb(cell.position, grid)
        }
    }))

    return grid;
}

export function plusOneToEveryoneAroundBomb(cellPosition: CellPosition, grid: Array<Array<CellProps>>) {
    for (let i = cellPosition.x - 1; i <= cellPosition.x + 1; i++) {
        for (let j = cellPosition.y - 1; j <= cellPosition.y + 1; j++) {
            if (i === cellPosition.x && j === cellPosition.y) {
                continue;
            }

            if (isPositionOutOfBound(grid, {x: j, y: i})) {
                continue;
            }

            const cell = grid[j][i];
            if (cell.number !== -1) {
                cell.number += 1;
            }
        }
    }
}

