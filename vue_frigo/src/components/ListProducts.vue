<script setup>
import {ref} from "vue";
import Image from "@/components/Image.vue";

defineProps(["product"])
defineEmits(["deleteProduct", "changeProduct"]);

</script>

<template>
  <v-col>
    <v-row >
      <Image :product="product" ></Image>

      <v-btn @click="$emit('changeProduct',product,'-')" class="but"  icon="mdi-minus"></v-btn>
      <v-card class="but"> {{ product.qty }} </v-card>
      <v-btn @click="$emit('changeProduct',product,'+')" class="but" icon="mdi-plus"></v-btn>
      <v-btn @click="$emit('deleteProduct',product.id)" class="but" icon="mdi-delete-outline"></v-btn>
    </v-row><br>
  </v-col>


</template>

<style scoped>

.but {
  background-color: #E0F2F1;
  text-align: center;
  cursor: pointer;
  height: 30px;
  width: 30px;
}

</style>
