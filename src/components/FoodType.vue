<template>
  <q-card square bordered flat style="margin-top: -1px">
    <q-card-section>
      <div class="row q-gutter-md items-center">
        <div class="col-xs-12 col-sm-3">
          <q-select outlined v-model="state.foodType" :options="foodOptions" label="Категория" />
        </div>
        <div class="col-xs-12 col-sm-3">
          <q-select
            outlined
            v-model="state.foodItem"
            option-value="uniquename"
            :options="state.foodItems"
            option-label="uniquename"
            label="Предмет"
          />
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import { useStore } from '../composition/use-store'

import { useFoodType } from '../composition/FoodType'

export default {
  setup() {
    const store = useStore()

    return { ...useFoodType(store) }
  }
}
</script>
