// Sudoku Solver Script
import { get_row, get_col, get_block } from "/js/helper.js";

let moves = [];
let board = [];

function get_solution(grid) {
    moves = [];
    board = grid;
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (board[i][j] != 0) {
                continue;
            }
            tryout(i, j);
        }
    }
}

function tryout(row, col) {
    let arr = find_candidates(row, col);
    decide(arr, row, col);
}

function decide(arr, row, col) {
    if (arr.length) {
        board[row][col] = arr[0];
        moves.push({
            "row": row,
            "col": col,
            "opt": arr,
        });
    } else {
        let last = moves.pop();
        board[last.row][last.col] = 0;
        decide(last.opt.slice(1), last.row, last.col);
        decide(find_candidates(row, col), row, col);
    }
}

function find_candidates(row, col) {
    let candidates = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    let used = [...get_row(board, row), ...get_col(board, col), ...get_block(board, row, col)];
    return candidates.filter(num => !used.includes(num));
}

export { get_solution }