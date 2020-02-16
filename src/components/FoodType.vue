<template>
  <div class="row q-gutter-md items-center">
    <div class="col-xs-12 col-sm-3">
      <q-select outlined v-model="foodType" :options="foodOptions" label="Категория" />
    </div>
    <div class="col-xs-12 col-sm-3">
      <q-select
        outlined
        v-model="foodItem"
        option-value="uniquename"
        :options="foodItems"
        option-label="uniquename"
        label="Предмет"
      />
    </div>
  </div>
</template>

<script>
import { useStore } from '../composition/useStore'
import { useFoodType } from '../composition/FoodType'

export default {
  setup () {
    const store = useStore()

    return { ...useFoodType(store) }
  }
}
</script>
