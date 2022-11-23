<template>
    <div class="card d-flex flex-fill border-dark shadow-lg p-2 m-1 rounded-3">
        <div class="card-body d-flex flex-column justify-content-center p-0">
            <div class="ratio ratio-1x1">
                <div class="sudoku-puzzle rounded" v-if="sudoku_loaded">
                    <div class="sudoku-block" v-for="(n, i) in 9">
                        <div class="sudoku-cell border d-flex justify-content-center clickable" v-for="(n, j) in 9">
                            <img class="img-fluid cell"
                                :src="'/numbers/' + grid[det_cell_x(i, j)][det_cell_y(i, j)] + '.svg'"
                                :class="{ 'selected-cell': selected_cell == String(i).concat(j) }" @click="select_cell"
                                :pos="String(i).concat(j)">
                        </div>
                    </div>
                </div>
            </div>
            <div class="btn-group my-2">
                <button class="btn btn-outline-primary" @click="solve">Solve</button>
                <button class="btn btn-outline-primary" @click="reset">Reset</button>
            </div>
            <div class="d-flex justify-content-start">
                <span class="text-primary">{{ output }}</span>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { generate } from "/js/generator.js";
import { det_cell_x, det_cell_y } from "/js/helper.js";
import { backtrack } from "/js/solver.js";

var arr = null;
const grid = ref(null);
const genesis = ref(null);

const sudoku_loaded = ref(false);
const selected_cell = ref(null);
const output = ref(null);

async function solve() {
    console.log("Solving...");
    let start = new Date().getTime();
    let history = backtrack(arr);
    let end = new Date().getTime();
    output.value = "> Solved in " + (end - start) + "ms.";

    history.forEach(function (obj, index, collection) {
        setTimeout(function () {
            do_op(obj);
        }, index * 10);
    });

}

function do_op(obj) {
    if (obj.op == "add") {
        grid.value[obj.row][obj.col] = obj.val;
        return;
    } else if (obj.op == "remove") {
        grid.value[obj.row][obj.col] = 0;
        return;
    }
}

async function reset() {
    // grid.value = JSON.parse(JSON.stringify(genesis.value));
    window.location.reload();
}

async function select_cell(ev) {
    selected_cell.value = ev.target.attributes.pos.value;
    // console.log(ev.target.currentSrc.split(".svg")[0].slice(-1));
}

async function click_event(ev) {
    if (!ev.target.classList.contains("cell")) {
        selected_cell.value = null;
    }
}

async function key_event(ev) {
    if (!selected_cell.value) {
        return;
    }

    if (49 <= ev.keyCode <= 57) {
        let i = parseInt(selected_cell.value[0]);
        let j = parseInt(selected_cell.value[1]);
        grid.value[det_cell_x(i, j)][det_cell_y(i, j)] = ev.keyCode - 48;
        selected_cell.value = null;
    }
}

onMounted(() => {
    arr = generate();
    genesis.value = JSON.parse(JSON.stringify(arr));
    grid.value = JSON.parse(JSON.stringify(arr));

    window.addEventListener("click", click_event);
    window.addEventListener("keyup", key_event);
    sudoku_loaded.value = true;
});
</script>
