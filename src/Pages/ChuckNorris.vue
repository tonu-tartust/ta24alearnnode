<script setup>
import axios from 'axios';
import { ref } from 'vue';


let joke = ref('');

let res = await axios.get('https://api.chucknorris.io/jokes/random');
joke.value = res.data.value;


</script>

<template>
  
<div class="conteiner content">
  <h1>{{ joke }}</h1>
</div>

</template>