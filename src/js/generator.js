// Sudoku Generator Script
import { randoSequence } from '/js/rando-min.mjs';

function generate() {
    var grid = [];

    // Fill the grid with zeros
    for (let i = 0; i < 9; i++) {
        let arr = Array(9);
        grid.push(arr.fill(0));
    }

    // Generate the blocks
    for (let i = 0; i < 3; i++) {
        grid = rand_block(grid, i, i);
    }

    // Use the backtracking algorithm and fill the cells
    // grid = backtrack(grid);

    // Verify the filled puzzle
    // if (verify(grid)) {
    //     return grid;
    // }

    // return null;
    return grid;
}

function rand_block(grid, x, y) {
    let seq = rand_seq();
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            grid[x * 3 + i][y * 3 + j] = seq[i * 3 + j];
        }
    }
    return grid;
}

// Return non-zero values from a column
function get_col(grid, j) {
    let arr = [];
    for (let i = 0; i < 9; i++) {
        let cell = grid[i][j];
        if (cell != 0) {
            arr.push(cell);
        }
    }
    return arr;
}

// function verify(grid) {

// }

function fill_row(grid, i) {
    let used = [];
    let start = 0;

    // Determine used numbers
    for (let j = 0; j < 9; j++) {
        if (grid[i][j] != 0) {
            used.push(grid[i][j]);
        } else {
            start = j;
            break;
        }
    }

    for (let j = start; j < 9; j++) {
        let col = get_col(grid, j);
        let selection = exclude(used.concat(col));

        grid[i][j] = selection;
        used.push(selection);
    }
    return grid;
}

// Generates a random sequence
function rand_seq() {
    return randoSequence(1, 9);
}

function exclude(used) {
    let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9].filter((num) => !used.includes(num));
    if (arr.length) {
        return randoSequence(arr)[0].value;
    }
    return 0;
}

export { generate }