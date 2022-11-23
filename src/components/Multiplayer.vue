<template>
    <div class="h-100 w-100 d-flex justify-content-center p-2">
        <div class="d-flex flex-fill" style="max-width: 100vh;">
            <div class="row h-100 w-100 d-flex flex-column justify-content-center align-items-center g-0">
                <div class="col mh-100 d-flex flex-column col-12 col-sm-11 col-md-10 col-lg-8 col-xl-8 col-xxl-8
                    justify-content-center">
                    <PeerJS ref="thisPeerJS" v-if="peer_init" :peer="peer" :conn="conn" :peer_id="peer_id" />
                    <div class="card d-flex flex-fill border-dark shadow-lg p-2 rounded-3" v-if="!peer_init">
                        <div class="card-body mh-100 d-flex flex-column">
                            <h3>Connect to another player to start a multiplayer match.</h3>
                            <div class="input-group flex-nowrap mb-4">
                                <span class="input-group-text bi bi-link-45deg" id="addon-wrapping"></span>
                                <input type="text" class="form-control" :class="{ 'placeholder': !peer_id }"
                                    placeholder="Username" aria-label="Username" aria-describedby="addon-wrapping"
                                    :value="'https://sudoku.buzl.uk/multiplayer?join=' + peer_id" readonly>
                            </div>
                            <button type="button" class="btn btn-primary mb-1" @click="copy_link">Copy Link</button>
                            <router-link to="/" type="button" class="btn btn-dark">Go Home</router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router'
import { Peer } from "peerjs";

import PeerJS from "/components/PeerJS.vue";

const router = useRouter();

const peer = ref(null);
const conn = ref(null);
const peer_id = ref(null);
const peer_init = ref(false);

const thisPeerJS = ref(null);

async function copy_link() {
    navigator.clipboard.writeText('https://sudoku.buzl.uk/multiplayer?join=' + peer_id.value);
}

async function connect(id) {
    conn.value = peer.value.connect(id);
    peer_init.value = true;
    conn.value.on("open", () => {
        conn.value.send({
            type: 'helo',
            peer_id: peer_id.value,
        });
    });
}

onMounted(() => {
    peer.value = new Peer();

    peer.value.on('open', (id) => {
        peer_id.value = id;
        if (router.currentRoute.value.query.hasOwnProperty('join')) {
            connect(router.currentRoute.value.query.join);
        }
    })

    peer.value.on('connection', connection => {
        conn.value = connection;
        peer_init.value = true;
    });
});
</script>