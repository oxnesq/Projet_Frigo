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


  <v-sheet class="style-class">
    <form @submit.prevent="$event => handleSubmit()" >
      <h4>Ajouter une photo à un produit</h4><br>
      <v-text-field v-model="product" label="nom" required variant="outlined"></v-text-field>
      <v-text-field v-model="picture" label="photo" variant="outlined"></v-text-field>
      <v-btn type="submit" append-icon="mdi-camera-outline">Ajouter</v-btn>
      <v-btn append-icon="mdi-close" @click="$event => resetFields()">Annuler</v-btn>
    </form>
  </v-sheet>


</template>

<style scoped>


</style>
