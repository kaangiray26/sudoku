<template>
    <div class="h-100 w-100 d-flex justify-content-center p-2">
        <div class="d-flex flex-fill" style="max-width: 100vh;">
            <div class="row h-100 w-100 d-flex flex-column justify-content-center align-items-center g-0">
                <div class="col mh-100 d-flex flex-column col-12 col-sm-11 col-md-10 col-lg-8 col-xl-8 col-xxl-8
                    justify-content-center">
                    <Sudoku ref="thisSudokuObj" @options="thisOptionsModal.show()" />
                </div>
            </div>
        </div>
    </div>
    <OptionsModal @reset="thisSudokuObj.reset()" @solve="thisSudokuObj.solve()" ref="thisOptionsModal" />
</template>

<script setup>
import { ref } from "vue";
import Sudoku from '/components/Sudoku.vue';
import OptionsModal from '/components/SingleplayerOptions.vue';

let thisOptionsModal = ref(null);
let thisSudokuObj = ref(null);
</script>