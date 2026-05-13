<script setup>

  import * as L from 'leaflet';
  import 'leaflet/dist/leaflet.css';
  import { onMounted, ref } from 'vue';

  let map;

  onMounted(() => {
    // Initialize map FIRST
    map = L.map('map').setView([59.42688887801166, 24.74410854714832], 18);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    let coords = ref({ lat: 0, lng: 0 });
    let location = null;

    if ("geolocation" in navigator) {

      setInterval(() => { 
          navigator.geolocation.getCurrentPosition((position) => {
            console.log(position.coords.latitude, position.coords.longitude);
            coords.value.lat = position.coords.latitude;
            coords.value.lng = position.coords.longitude;
            if (location) {
              location.setLatLng([coords.value.lat, coords.value.lng]).update();
            } else {
              location = L.marker([coords.value.lat, coords.value.lng]).addTo(map);
            }
            
          });
      }, 1000);

    } else {
      /* geolocation IS NOT available */
    }

   // L.marker([59.42688887801166, 24.74410854714832]).addTo(map);
    

  });

</script>

<template>

   <div id="map"></div>

</template>
<style>

  #map {
    height: 800px;
    
  }
  </style>