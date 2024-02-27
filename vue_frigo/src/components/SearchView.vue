<script setup>
import {ref, watch} from "vue";

defineProps(["product"])
const emit = defineEmits(["getProduct", "updateResearch"]);

const search = ref("");

function emitSearchProduct(search){
  emit('updateResearch',search);
}

watch(search,(newSearch)=>{emitSearchProduct(newSearch);})

function resetFields () {
  search.value = "";
}

</script>
<template>


  <v-sheet class="searchClass">
    <form @submit.prevent="$event => emitSearchProduct(search)">
      <h4>Rechercher un produit</h4><br>
      <v-col>
        <v-row>
          <v-text-field v-model="search" label="Rechercher" ></v-text-field>
          <v-btn icon="mdi-magnify" type="submit"></v-btn>
          <v-btn icon="mdi-close" @click="$event => resetFields()"></v-btn>
      </v-row>
      </v-col>

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
