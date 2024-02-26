<script setup>
import {ref} from "vue";

const emit = defineEmits(["changeProduct"]);

const product = ref("");
const picture = ref("");

function handleSubmit ()  {
  emit("changeProduct", product.value, picture.value);
  resetFields();
}

function resetFields () {
  product.value = "";
  picture.value = "";
}

</script>
<template>


  <v-sheet class="mx-auto">
    <form @submit.prevent="$event => handleSubmit()" >
      <h4>Ajouter une photo à un produit</h4><br>
      <v-text-field v-model="product" label="nom" required></v-text-field>
      <v-text-field v-model="picture" label="photo"></v-text-field>
      <v-btn type="submit" append-icon="mdi-check">Ajouter</v-btn>
    </form>
  </v-sheet>


</template>

<style scoped>

.mx-auto {
  position: fixed;
  left: 60px;
  top: 410px;
  width: 300px;
}


</style>
