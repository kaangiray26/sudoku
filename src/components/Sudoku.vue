<template>
    <div class="card mh-100 d-flex flex-fill border-dark shadow-lg rounded-3 p-1"
        style="position: relative;z-index: 0;">
        <div class="card-body mh-100 d-flex flex-column justify-content-center">
            <div ref="thisObj" class="ratio ratio-1x1">
                <div class="sudoku-puzzle rounded" v-if="sudoku_loaded">
                    <div class="sudoku-block" v-for="(n, i) in 9">
                        <div class="sudoku-cell border d-flex justify-content-center clickable" v-for="(n, j) in 9">
                            <img class="img-fluid cell"
                                :src="'/numbers/' + grid[det_cell_x(i, j)][det_cell_y(i, j)] + '.svg'"
                                :class="{ 'selected-cell': selected_cell == String(i).concat(j), 'glow': changed.includes(String(i).concat(j)) }"
                                @click="select_cell" :pos="String(i).concat(j)">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <Context ref="thisContext" @press="insert_key" />
</template>
<script setup>
import { ref, onMounted } from "vue";
import Context from "/components/Context.vue";

import { generate } from "/js/generator.js";
import { get_solution } from "/js/stepsolver.js";

import { det_cell_x, det_cell_y } from "/js/helper.js";
import Hammer from "hammerjs";

const emit = defineEmits(['options', 'loaded', 'write', 'erase']);

const grid = ref(null);
const genesis = ref(null);

const device = ref(null);

const moves = ref([]);
const changed = ref([]);

const sudoku_loaded = ref(false);
const selected_cell = ref(null);

let thisObj = ref(null);
let thisContext = ref(null);


async function reset() {
    grid.value = JSON.parse(JSON.stringify(genesis.value));
}

async function solve() {
    let start = new Date().getTime();
    get_solution(grid.value);
    let end = new Date().getTime();
    console.log("> Steps:", history.length);
    console.log("> Solved in " + (end - start) + "ms.");
}

async function select_cell(ev) {
    selected_cell.value = ev.target.attributes.pos.value;
}


async function insert_key(key) {
    let i = parseInt(selected_cell.value[0]);
    let j = parseInt(selected_cell.value[1]);

    let row = det_cell_x(i, j);
    let col = det_cell_y(i, j);

    // Check if the cell is editable
    if (genesis.value[row][col] != 0) {
        return;
    }

    grid.value[row][col] = key;
    moves.value.push([row, col]);
    selected_cell.value = null;
    emit('write', [i, j, key]);
}

// For mobile devices
async function click_event(ev) {
    if (!ev.target.classList.contains("cell")) {
        selected_cell.value = null;
        thisContext.value.hide();
        return;
    }

    if (device.value == "mobile") {
        thisContext.value.show(ev);
        return;
    }
}

// For desktop
async function key_event(ev) {
    if (!selected_cell.value) {
        shortcuts(ev);
        return;
    }

    if (ev.key == "Backspace") {
        insert_key(0);
        return;
    }

    if (49 <= ev.keyCode && ev.keyCode <= 57) {
        insert_key(ev.keyCode - 48);
        return;
    }

}

// Keyboard Shortcuts for desktop
async function shortcuts(ev) {
    if (ev.key == "Backspace") {
        if (moves.value.length) {
            let last_move = moves.value.pop();
            grid.value[last_move[0]][last_move[1]] = 0;
            emit('write', [last_move[0], last_move[1], 0]);
        }
        return;
    }

    if (ev.key == "h") {
        emit('options');
        return;
    }
}

function get_grid() {
    return grid.value;
}

function set_grid(board) {
    genesis.value = JSON.parse(JSON.stringify(board));
    grid.value = JSON.parse(JSON.stringify(board));
}

async function write(i, j, key) {
    let row = det_cell_x(i, j);
    let col = det_cell_y(i, j);

    changed.value.push(String(i).concat(j));
    grid.value[row][col] = key;
}

defineExpose({
    reset,
    solve,
    get_grid,
    set_grid,
    write
});

onMounted(() => {
    var hammertime = new Hammer(thisObj.value);
    hammertime.get('swipe').set({ direction: Hammer.DIRECTION_VERTICAL });
    hammertime.on("swipeup", function () {
        emit('options');
    });

    window.addEventListener("click", click_event);
    window.addEventListener("keyup", key_event);

    if (navigator.userAgent.toLowerCase().includes("mobile")) {
        device.value = "mobile";
    } else {
        device.value = "desktop";
    }

    let arr = generate();
    genesis.value = JSON.parse(JSON.stringify(arr));
    grid.value = JSON.parse(JSON.stringify(arr));
    emit('loaded');
    sudoku_loaded.value = true;
});
</script>
