// Helper functions

// Determine the x-coordinate of the cell
function det_cell_x(i, j) {
    return Math.floor(i / 3) * 3 + Math.floor(j / 3);
}

// Determine the y-coordinate of the cell
function det_cell_y(i, j) {
    return (i % 3) * 3 + (j % 3);
}

// Return non-zero values from a row
function get_row(grid, row) {
    return grid[row].filter(num => num != 0);
}

// Return non-zero values from a column
function get_col(grid, col) {
    let arr = [];
    for (let row = 0; row < 9; row++) {
        let cell = grid[row][col];
        if (cell != 0) {
            arr.push(cell);
        }
    }
    return arr;
}

// Return non-zero values from a block
function get_block(grid, row, col) {
    let arr = [];
    let pos = det_block(row, col);
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            let cell = grid[pos[0] + i][pos[1] + j];
            if (cell != 0) {
                arr.push(cell);
            }
        }
    }
    return arr;
}

// Determine the first cell of the block from position
function det_block(i, j) {
    return [Math.floor(i / 3) * 3, Math.floor(j / 3) * 3];
}

export { det_cell_x, det_cell_y, get_row, get_col, get_block }