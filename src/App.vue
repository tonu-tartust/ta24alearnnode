<script setup>
import { computed, ref } from 'vue';
import ItemList from './ItemList.vue';
let i = 1;
let items = ref([
  {id: i++, text: 'sai', isDone: false},
  {id: i++, text: 'piim', isDone: false},
  {id: i++, text: 'viin',  isDone: false},
  {id: i++, text: 'olu', isDone: false},
  ]);
let newItem = ref('');

let doneItems = computed(() => items.value.filter(i => i.isDone));
let toDoItems = computed(() => items.value.filter(i => !i.isDone));

function add(){
  if (newItem.value.trim() !== '') {
     items.value.push({id: i++, text: newItem.value.trim(), isDone: false});
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
    <div class="content">
      <ItemList :items="items"  title="All items"></ItemList>
      <ItemList :items="doneItems" title="Done items"></ItemList>
      <ItemList :items="toDoItems" title="ToDo items"></ItemList>
    
    </div>
  </div>
  
</template>

<style></style>