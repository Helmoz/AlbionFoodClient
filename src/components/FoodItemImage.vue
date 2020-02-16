<template>
  <q-avatar rounded :size="`${size}px`">
    <q-img transition="fade" :src="foodItemImage">
      <template v-slot:loading>
        <q-spinner-gears size="30px" color="white" />
      </template>
    </q-img>
  </q-avatar>
</template>

<script>
export default {
  props: {
    foodItemImage: String,
    size: Number
  }
}
</script>

<style>
</style>