<script setup>
import { ref } from 'vue';

let items = ref(['sai', 'piim', 'vin', 'olu']);
let newItem = ref('');

function add(){
  if (newItem.value.trim() !== '') {
     items.value.push(newItem.value.trim());
  }
  newItem.value = '';
}
</script>


<template>
  <div class="container"> 
      <div class="field has-addons">
      <div class="control">
        <input class="input" type="text" placeholder="Find a repository" v-model="newItem"  @keypress.enter="add">
      </div> 
      <div class="control">
        <button class="button is-info" @click="add">
          Add item
        </button>
      </div>
    </div>
  </div>

  <div class="content">
  <h1>All items</h1>
  <ul>
    <li v-for= "item in items">{{ item }}</li>
  </ul>

  </div>
  


</template>

<style>

</style>