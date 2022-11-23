<template>
    <div class="row vh-100 vw-100 d-flex flex-column justify-content-center align-items-center g-0 py-2">
        <div class="col mh-100 d-flex col-11 col-sm-11 col-md-10 col-lg-6 col-xl-6 col-xxl-6 justify-content-center">
            <div class="card d-flex flex-fill border-dark shadow-lg p-2 rounded-3">
                <div class="card-body mh-100 d-flex flex-column">
                    <img class="img-fluid mb-2" src="/assets/favicon.svg" />
                    <div class="btn-group-vertical mb-2" role="group" aria-label="Vertical radio toggle button group">
                        <input ref="singleplayer" type="radio" class="btn-check" name="vbtn-radio" id="vbtn-radio1"
                            autocomplete="off" checked>
                        <label class="btn btn-outline-dark" for="vbtn-radio1">Singleplayer</label>
                        <input ref="multiplayer" type="radio" class="btn-check" name="vbtn-radio" id="vbtn-radio2"
                            autocomplete="off">
                        <label class="btn btn-outline-dark" for="vbtn-radio2">Multiplayer</label>
                    </div>
                    <div class="btn-group" role="group" aria-label="Basic example">
                        <button type="button" class="btn btn-primary" @click="start_game">Start Game</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router'

const router = useRouter()

const singleplayer = ref(null);
const multiplayer = ref(null);

async function start_game() {
    console.log(singleplayer.value.checked);
    console.log(multiplayer.value.checked);
    if (singleplayer.value.checked) {
        router.push('/puzzle/singleplayer');
    } else if (multiplayer.value.checked) {
        router.push('/puzzle/multiplayer');
    }
    return;
}
</script>