<template>
    <div class="row h-100 w-100 d-flex flex-column justify-content-center align-items-center g-0 p-2">
        <div class="col mh-100 d-flex col-12 col-sm-12 col-md-10 col-lg-6 col-xl-6 col-xxl-6 justify-content-center">
            <div class="card d-flex flex-fill border-dark shadow-lg p-2 rounded-3">
                <div class="card-body mh-100 d-flex flex-column">
                    <h3>Connect to another player to start a multiplayer match.</h3>
                    <div class="input-group flex-nowrap mb-4">
                        <span class="input-group-text bi bi-link-45deg" id="addon-wrapping"></span>
                        <input type="text" class="form-control" placeholder="Username" aria-label="Username"
                            aria-describedby="addon-wrapping" :value="'https://sudoku.buzl.uk/join?code=' + peer_id">
                    </div>
                    <button type="button" class="btn btn-primary mb-1" @click="copy_link">Copy Link</button>
                    <router-link to="/" type="button" class="btn btn-dark">Go Home</router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router'
import { Peer } from "peerjs";

const router = useRouter();

const peer = ref(null);
const conn = ref(null);
const peer_id = ref(null);

async function copy_link() {
    navigator.clipboard.writeText('https://sudoku.buzl.uk/join?code=' + peer_id.value);
}

onMounted(() => {
    peer.value = new Peer();

    peer.value.on('open', (id) => {
        peer_id.value = id;
        if (router.currentRoute.value.params.hasOwnProperty('id')) {
            connect(router.currentRoute.value.params.id);
        }
    })

    peer.value.on('connection', connection => {
        conn.value = connection;
        peer_init.value = true;
    });
});
</script>