<script setup>
import {ref} from "vue";

defineProps(["product"])
defineEmits(["addProduct", "deleteProduct", "changeProduct"]);

const name = ref("");
const qty = ref("");
const picture = ref("");
</script>
<template>


  <v-sheet class="mx-auto">
    <form @submit.prevent="$event => $emit('addProduct',name,qty,picture)">
      <h4>Nouveau Produit</h4><br>
      <v-text-field v-model="name" label="nom *" required></v-text-field>
      <v-text-field
        v-model="qty"
        type="number"
        style="width: 80px"
        density="compact"
        hide-details
        variant="outlined"
        label="qte *" required
      ></v-text-field>
      <br>
      <v-text-field v-model="picture" label="photo"></v-text-field>
      <v-btn type="submit">Submit</v-btn>
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
</style>
