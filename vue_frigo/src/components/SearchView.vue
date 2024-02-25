<script setup>
import {ref, watch} from "vue";

defineProps(["product"])
const emit = defineEmits(["getProduct", "updateResearch"]);

const search = ref("");

function emitSearchProduct(search){
  emit('updateResearch',search);
  emit('getProduct',search);
}

watch(search,(newSearch)=>{emitSearchProduct(newSearch);})

</script>
<template>


  <v-sheet class="searchClass">
    <form @submit.prevent="$event => emitSearchProduct(search)">
      <h4>Rechercher un produit</h4><br>
      <v-text-field v-model="search" label="Rechercher" ></v-text-field>
      <v-btn icon="mdi-magnify" type="submit"></v-btn>
    </form>
  </v-sheet>


</template>

<style scoped>

h4{
  background-color: #E0F2F1;
}


.searchClass {
  position: fixed;
  left: 50px;
  top: 410px;
  width: 300px;
}
</style>
