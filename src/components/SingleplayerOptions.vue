<template>
    <div ref="objEle" class="offcanvas offcanvas-bottom" tabindex="-1" id="offcanvasBottom"
        aria-labelledby="offcanvasBottomLabel">
        <div class="offcanvas-header">
            <h2 class="modal-title fw-bolder">Options</h2>
        </div>
        <div class="offcanvas-body d-flex justify-content-center">
            <div class="btn-group-vertical flex-fill" role="group" aria-label="Basic example">
                <button type="button" class="btn btn-outline-dark" @click="new_sudoku">New Sudoku</button>
                <button type="button" class="btn btn-outline-dark" @click="reset">Reset</button>
                <button type="button" class="btn btn-outline-dark" @click="exit">Go Home</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { Offcanvas } from 'bootstrap';
import { useRouter } from 'vue-router'

const router = useRouter();
const emit = defineEmits(['reset']);

let objEle = ref(null);
let thisModalObj = null;

async function _show() {
    thisModalObj.show();
}

async function _hide() {
    thisModalObj.hide();
}

async function exit() {
    thisModalObj.hide();
    router.push('/');
}

async function reset() {
    emit('reset');
    thisModalObj.hide();
}

async function new_sudoku() {
    thisModalObj.hide();
    router.go('/singleplayer');
}

defineExpose({
    show: _show,
    hide: _hide,
});

onMounted(() => {
    thisModalObj = new Offcanvas(objEle.value);
});
</script>