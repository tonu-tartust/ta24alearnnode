<script setup>
import { ref } from 'vue';
import Modal from "../Components/Modal.vue"
import ImgModal from '../Components/imgModal.vue';
let modalActive = ref(false)
let modal2Active = ref(false)

</script>
<template>
    <div class="container">
        <button class="button is-primary" @click="modalActive = true">Open modal</button>
        <button class="button is-link" @click="modal2Active = true">Open modal 2</button>

        <Modal :active="modalActive" @close="modalActive = false">Im in a box
        </Modal>
        <ImgModal :active="modal2Active" @close="modal2Active = false" url="https://picsum.photos/1280/960?r=2">
        </ImgModal>

    </div>
</template>