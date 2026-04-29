<script setup>
import { ref } from 'vue';


let coords = ref({ lat: 0, lng: 0 });

if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition((position) => {
    console.log(position.coords.latitude, position.coords.longitude);
    coords.value.lat = position.coords.latitude;
    coords.value.lng = position.coords.longitude;
  });
} else {
  /* geolocation IS NOT available */
}

</script>

<template>
<h1>Longitude: {{ coords.lng }}</h1>
<h1>Latitude: {{ coords.lat }}</h1>
</template>