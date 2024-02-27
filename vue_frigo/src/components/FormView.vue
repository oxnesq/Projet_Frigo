<script setup>
import {ref} from "vue";

defineProps(["product"])
const emit = defineEmits(["addProduct","isALink"]);

const name = ref("");
const qty = ref("");
const picture = ref("https://");

function handleSubmit ()  {
  if(emit("isALink",picture.value)!==false){
    picture.value = "";
  }
  emit("addProduct", name.value, qty.value, picture.value);
  resetFields();
}

function resetFields () {
  name.value = "";
  qty.value = "";
  picture.value = "";
}

</script>
<template>


  <v-sheet class="mx-auto">
    <form @submit.prevent="$event => handleSubmit()" >
      <h4>Nouveau Produit</h4><br>
      <v-text-field v-model="name" label="nom *" required variant="outlined"></v-text-field>
      <v-text-field
        v-model="qty"
        type="number"
        density="compact"
        hide-details
        variant="outlined"
        label="qte *" required
      ></v-text-field>
      <br>
      <v-text-field v-model="picture" label="photo" variant="outlined"></v-text-field>
      <v-btn type="submit" append-icon="mdi-check">Ajouter</v-btn>
      <v-btn append-icon="mdi-close" @click="$event => resetFields()">Annuler</v-btn>
    </form>
  </v-sheet>


</template>

<style>

.mx-auto {
  position: fixed;
  left: 50px;
  top: 60px;
  width: 300px;
}
h4{
  background-color: #E0F2F1;
}

</style>
