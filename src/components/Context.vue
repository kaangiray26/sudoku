<template>
    <div ref="contextMenu" id="contextMenu" v-show="isContextMenuVisible" :style="{'top':posY+'px', 'left':posX+'px'}">
        <ul id="dropDown" class="dropdown-menu border border-dark show p-0">
            <li>
                <div id="contextBlock" class="context-block border-0">
                    <button class="btn btn-dark mt-1 mx-1" type="button" @click="emit('press', 1)">1</button>
                    <button class="btn btn-dark mt-1" type="button" @click="emit('press', 2)">2</button>
                    <button class="btn btn-dark mt-1 mx-1" type="button" @click="emit('press', 3)">3</button>
                    <button class="btn btn-dark m-1 mx-1" type="button" @click="emit('press', 4)">4</button>
                    <button class="btn btn-dark mt-1" type="button" @click="emit('press', 5)">5</button>
                    <button class="btn btn-dark mt-1 mx-1" type="button" @click="emit('press', 6)">6</button>
                    <button class="btn btn-dark mt-1 mx-1" type="button" @click="emit('press', 7)">7</button>
                    <button class="btn btn-dark mt-1" type="button" @click="emit('press', 8)">8</button>
                    <button class="btn btn-dark mt-1 mx-1" type="button" @click="emit('press', 9)">9</button>
                </div>
                <div class="btn-group m-1" role="group" aria-label="Basic example">
                    <button type="button" class="btn btn-outline-primary" @click="emit('press', 0)">Erase</button>
                    <button type="button" class="btn btn-outline-primary" @click="hide">Close</button>
                    <button type="button" class="btn btn-outline-primary">Right</button>
                </div>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { ref, nextTick } from "vue";
const emit = defineEmits(['press']);

let contextMenu = ref(null);
const isContextMenuVisible = ref(false);

const posX = ref(0);
const posY = ref(0);

async function show(event) {
    isContextMenuVisible.value = true;
    await nextTick();

    let box = event.target.getBoundingClientRect();
    let context_x = document.getElementById("contextBlock").offsetWidth;
    let context_y = document.getElementById("contextBlock").offsetHeight;

    let mouse_x = box.x + box.width / 2 - context_x / 2;
    let mouse_y = box.y + box.height / 2 - context_y / 2;

    if (mouse_x + context_x >= window.innerWidth) {
        posX.value = window.innerWidth - context_x;
    } else if (mouse_x < 0) {
        posX.value = 0;
    } else {
        posX.value = mouse_x;
    }

    if (mouse_y + context_y >= window.innerHeight) {
        posY.value = window.innerHeight - document.getElementById('dropDown').offsetHeight;
    } else if (mouse_y < 0) {
        posY.value = 0;
    } else {
        posY.value = mouse_y;
    }
}

async function hide() {
    isContextMenuVisible.value = false;
}

defineExpose({
    show,
    hide
});
</script>