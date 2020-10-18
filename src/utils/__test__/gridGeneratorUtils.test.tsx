import React from "react";
import {
    calculateCellBombNumbers,
    convertArrayIntoGrid,
    convertBooleanGridToNumber,
    convertNumbersIntoCellProps,
    generateBooleanArray,
    generateDefaultGrid,
    moveBombsFromClickedCellArea
} from "../gridGeneratorUtils";
import * as assert from "assert";
import {CellProps} from "../../components/cell/cell.component";

describe('should generate grid', function () {
    describe("generate boolean grid", function () {
        it("should generate grid of size 3x3 with 2 bombs", function () {
            const grid = generateBooleanArray(3, 3);

            assert.strictEqual(grid.length, 9);
            assert.strictEqual(grid.filter(item => item).length, 2);
        })

        it("should generate grid of size 100x100 with 2500 bombs", function () {
            const grid = generateBooleanArray(100, 100);

            assert.strictEqual(grid.length, 10_000);
            assert.strictEqual(grid.filter(item => item).length, 2500);
        })
    });

    it('convert array of 20 into grid of 5x4 having width 5 and height 4', function () {
        const grid = convertArrayIntoGrid([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20], 5, 4);

        assert.strictEqual(grid.length, 4);
        assert.strictEqual(grid[0].length, 5)
        assert.strictEqual(grid[1].length, 5)
        assert.strictEqual(grid[2].length, 5)
        assert.strictEqual(grid[3].length, 5)
    })

    it('convert grid [[false, true], [true, false]] into [[0, -1],[-1, 0]]', function () {
        const numberGrid = convertBooleanGridToNumber([[false, true], [true, false]]);

        assert.strictEqual(numberGrid[0][0], 0);
        assert.strictEqual(numberGrid[0][1], -1);
        assert.strictEqual(numberGrid[1][0], -1);
        assert.strictEqual(numberGrid[1][1], 0);
    })

    it('convert 3x4 numbere grid into cell props grid', function () {
        const cellGrid = convertNumbersIntoCellProps([[0, -1, 0], [-1, 0, 0], [0, 0, 0], [-1, 0, -1]]);

        expect(cellGrid[0][0]).toEqual(new CellProps({x: 0, y: 0}, 0))
        expect(cellGrid[0][1]).toEqual(new CellProps({x: 1, y: 0}, -1));
        expect(cellGrid[0][2]).toEqual(new CellProps({x: 2, y: 0}, 0));
        expect(cellGrid[1][0]).toEqual(new CellProps({x: 0, y: 1}, -1));
        expect(cellGrid[1][1]).toEqual(new CellProps({x: 1, y: 1}, 0));
        expect(cellGrid[1][2]).toEqual(new CellProps({x: 2, y: 1}, 0));
        expect(cellGrid[2][0]).toEqual(new CellProps({x: 0, y: 2}, 0));
        expect(cellGrid[2][1]).toEqual(new CellProps({x: 1, y: 2}, 0));
        expect(cellGrid[2][2]).toEqual(new CellProps({x: 2, y: 2}, 0));
        expect(cellGrid[3][0]).toEqual(new CellProps({x: 0, y: 3}, -1));
        expect(cellGrid[3][1]).toEqual(new CellProps({x: 1, y: 3}, 0));
        expect(cellGrid[3][2]).toEqual(new CellProps({x: 2, y: 3}, -1));
    })

    it('calculate cell bombs number for 3x4 grid : [[0, -1, 0], [-1, 0, 0], [0, 0, 0], [0, 0, -1]]', function () {
        const cellGrid = calculateCellBombNumbers([
            [new CellProps({x: 0, y: 0}, 0), new CellProps({x: 1, y: 0}, -1), new CellProps({x: 2, y: 0}, 0)],
            [new CellProps({x: 0, y: 1}, -1), new CellProps({x: 1, y: 1}, 0), new CellProps({x: 2, y: 1}, 0)],
            [new CellProps({x: 0, y: 2}, 0), new CellProps({x: 1, y: 2}, 0), new CellProps({x: 2, y: 2}, 0)],
            [new CellProps({x: 0, y: 3}, 0), new CellProps({x: 1, y: 3}, 0), new CellProps({x: 2, y: 3}, -1)]
        ]);

        expect(cellGrid[0][0]).toEqual(new CellProps({x: 0, y: 0}, 2));
        expect(cellGrid[0][1]).toEqual(new CellProps({x: 1, y: 0}, -1));
        expect(cellGrid[0][2]).toEqual(new CellProps({x: 2, y: 0}, 1));
        expect(cellGrid[1][0]).toEqual(new CellProps({x: 0, y: 1}, -1));
        expect(cellGrid[1][1]).toEqual(new CellProps({x: 1, y: 1}, 2));
        expect(cellGrid[1][2]).toEqual(new CellProps({x: 2, y: 1}, 1));
        expect(cellGrid[2][0]).toEqual(new CellProps({x: 0, y: 2}, 1));
        expect(cellGrid[2][1]).toEqual(new CellProps({x: 1, y: 2}, 2));
        expect(cellGrid[2][2]).toEqual(new CellProps({x: 2, y: 2}, 1));
        expect(cellGrid[3][0]).toEqual(new CellProps({x: 0, y: 3}, 0));
        expect(cellGrid[3][1]).toEqual(new CellProps({x: 1, y: 3}, 1));
        expect(cellGrid[3][2]).toEqual(new CellProps({x: 2, y: 3}, -1));
    })

    it('should generate 50x100 grid', function () {
        const grid = generateDefaultGrid(50, 100);

        expect(grid.length).toEqual(100);
        expect(grid[0].length).toEqual(50);
    })

    it('should move bombs from {x:1,y:0} and {x:0,y:} positions', function () {
        for (let i = 0; i < 10; i++) {
            const cellGrid = moveBombsFromClickedCellArea({x: 1, y: 0}, [
                [new CellProps({x: 0, y: 0}, 0), new CellProps({x: 1, y: 0}, -1), new CellProps({x: 2, y: 0}, 0)],
                [new CellProps({x: 0, y: 1}, -1), new CellProps({x: 1, y: 1}, 0), new CellProps({x: 2, y: 1}, 0)],
                [new CellProps({x: 0, y: 2}, 0), new CellProps({x: 1, y: 2}, 0), new CellProps({x: 2, y: 2}, 0)],
                [new CellProps({x: 0, y: 3}, 0), new CellProps({x: 1, y: 3}, 0), new CellProps({x: 2, y: 3}, -1)]
            ]);

            expect(cellGrid[0][0].number).not.toEqual(-1);
            expect(cellGrid[0][1].number).not.toEqual(-1);
            expect(cellGrid[0][2].number).not.toEqual(-1);
            expect(cellGrid[1][0].number).not.toEqual(-1);
            expect(cellGrid[1][1].number).not.toEqual(-1);
            expect(cellGrid[1][2].number).not.toEqual(-1);
        }
    })
})