<script setup>
import { ref } from 'vue';


let joke = ref('');

let req = fetch('https://api.chucknorris.io/jokes/random').then(res => {  
    return res.json();
}).then(data => {
    joke.value = data.value;
});

</script>

<template>
  
<div class="conteiner content">
  <h1>{{ joke }}</h1>
</div>

</template>