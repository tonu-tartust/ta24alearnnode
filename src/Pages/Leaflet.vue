<script setup>
import { ref } from 'vue'
import LeafletMap from '../Components/LeafletMap.vue'

let center = ref([59.42699, 24.74368]);

let coords = ref([0, 0]);
if ("geolocation" in navigator) {
    setInterval(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            console.log(position.coords.latitude, position.coords.longitude);
            coords.value = [position.coords.latitude, position.coords.longitude]
        });
    }, 1000);
} else {
    /* geolocation IS NOT available */
}

</script>

<template>
  <button class="button is-primary" @click="center = [57.76174545532467, 26.62421834241272]">Go to Lits</button>
  <button class="button is-primary" @click="center = [59.42686455556196, 24.74402846621822]">Go to Pommi auk</button>
  <button class="button is-primary" @click="center = [58.8737829402902, 24.502557851331385]">Go to Maaka kodu</button>

  <LeafletMap :center="center" :zoom="18" :marker="coords"></LeafletMap>
</template>

<style>
</style>


