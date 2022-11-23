<template>
    <Sudoku ref="thisSudokuObj" v-if="sudoku_init" @loaded="ehlo" @write="writeCell" />
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import Sudoku from '/components/Sudoku.vue';

const router = useRouter();

let thisSudokuObj = ref(null);
const sudoku_init = ref(false);
const initiator = ref(false);
const board = ref(null);

const match = ref(false);

const recipient = ref({
    id: '',
});

async function writeCell(event) {
    let obj = {
        type: 'write',
        row: event[0],
        col: event[1],
    };
    if (!match.value) {
        obj['key'] = event[2];
    }
    props.conn.send(obj);
}

async function ehlo() {
    if (!initiator.value) {
        thisSudokuObj.value.set_grid(board.value);
        return;
    }

    props.conn.send({
        type: "ehlo",
        peer_id: props.peer_id,
        grid: thisSudokuObj.value.get_grid(),
    });
    return;
}

props.conn.on("data", async function (data) {
    console.log(data);
    if (data.type == "helo") {
        recipient.id = data.peer_id;
        initiator.value = true;
        sudoku_init.value = true;
        return;
    }

    if (data.type == "ehlo") {
        recipient.id = data.peer_id;
        board.value = data.grid;
        sudoku_init.value = true;
        return;
    }

    if (data.type == "write") {
        if (!match.value) {
            thisSudokuObj.value.write(data.row, data.col, data.key);
            return;
        }
    }
});

props.conn.on('close', () => {
    router.go('/');
});

const props = defineProps({
    peer: {
        type: Object,
    },
    conn: {
        type: Object,
    },
    peer_id: {
        type: String,
    }
});
</script>