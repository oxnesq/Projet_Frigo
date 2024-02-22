<template>

  <v-img v-if="product.havePic()"
         :src="`${product.picture}`"
         :alt="`${product.name}`"
         height="55px"
         width="55px"
         aspect-ratio="1"
         cover
         class="bg-grey-lighten-2"
  ></v-img>
  <p v-if="!product.havePic()">{{ product.name }}</p>
</template>

<script setup>


defineProps(["product"])

</script>


