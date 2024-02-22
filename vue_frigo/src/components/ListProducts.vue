<script setup>
import {ref} from "vue";
import Image from "@/components/Image.vue";

defineProps(["product"])
defineEmits(["deleteProduct", "changeProduct"]);

</script>

<template>
  <v-row>
    <Image :product="product"></Image>

    <v-btn @click="$emit('changeProduct',product,'-')" class="but">-</v-btn>
    <v-btn @click="$emit('changeProduct',product,'+')" class="but">+</v-btn>
    <v-btn @click="$emit('deleteProduct',product.id)" class="but"><img src="../pics/Bin.png" alt="../pics/Bin.png"
                                                                       height="15"/></v-btn>
  </v-row>



</template>

<style scoped>


.but {
//background-color: ;
  border: 1px solid;
  cursor: pointer;
  height: 30px;
  width: 30px;
}
</style>
