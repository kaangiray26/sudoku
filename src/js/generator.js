// Sudoku Generator Script
import { randoSequence } from "/js/rando-min.mjs";
import { backtrack } from "/js/solver.js";
function generate() {
    var grid = [];

    // Fill the grid with zeros
    for (let i = 0; i < 9; i++) {
        let arr = Array(9);
        grid.push(arr.fill(0));
    }

    backtrack(grid);
    remove_cells(grid, 26);
    return grid;
}

function remove_cells(grid, lim) {
    let removed = [];
    let cells = 81 - lim;
    for (let i = 0; i < cells; i++) {
        let opt = randoSequence(0, 80).filter(num => !removed.includes(num))[0];
        removed.push(opt);
        grid[Math.floor(opt / 9)][opt % 9] = 0;
    }
}

export { generate }