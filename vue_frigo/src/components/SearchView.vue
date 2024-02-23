<script setup>
import {ref} from "vue";

defineProps(["product"])
defineEmits(["addProduct", "deleteProduct", "changeProduct"]);

const search = ref("");
</script>
<template>


  <v-sheet class="searchClass">
    <form @submit.prevent="$event => $emit('',search)">
      <h4>Rechercher un produit</h4><br>
      <v-text-field prepend-icon="mdi-magnify" v-model="search" label="Rechercher" required></v-text-field>
      <v-btn type="submit">Submit</v-btn>
    </form>
  </v-sheet>


</template>

<style>


.searchClass {
  position: fixed;
  left: 50px;
  top: 410px;
  width: 300px;
}
</style>
