
<script setup>
defineProps(["product"])

</script>

<template v-slot:activator="{ props: activatorProps }">

  <v-img v-if="product.havePic()"
         :src="`${product.picture}`"
         :alt="`${product.name}`"

         aspect-ratio="1"
         cover
         class="bg-grey-lighten-2"
  ></v-img>
  <v-card class="nameCard" v-if="!product.havePic()">{{ product.name }}</v-card>

</template>

<style scoped>
.bg-grey-lighten-2{
  height :60px;
  width: 60px;
}

.nameCard{
  width: 60px;
}

</style>



