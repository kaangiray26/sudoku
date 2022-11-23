<template>
    <div class="vh-100 vw-100 d-flex justify-content-center">
        <div class="d-flex flex-fill" style="max-width: 100vh;">
            <div class="row w-100 d-flex flex-column justify-content-center align-items-center g-0 py-2">
                <div class="col d-flex flex-column col-12 col-sm-11 col-md-10 col-lg-8 col-xl-8 col-xxl-8
                    justify-content-center">
                    <Sudoku></Sudoku>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Sudoku from '/components/Sudoku.vue';
</script>