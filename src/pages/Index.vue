<template>
  <q-page>
    <q-card square bordered flat>
      <q-card-section>
        <CraftSettings />
      </q-card-section>
    </q-card>
    <q-card square bordered flat style="margin-top: -1px">
      <q-card-section>
        <FoodType />
      </q-card-section>
    </q-card>
    <q-card square bordered flat style="margin-top: -1px">
      <q-card-section>
        <FoodItem />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import CraftSettings from '../components/CraftSettings'
import FoodType from '../components/FoodType'
import FoodItem from '../components/FoodItem'

import { useStore } from '../composition/useStore'

export default {
  name: 'PageIndex',
  components: {
    CraftSettings,
    FoodType,
    FoodItem
  },
  setup() {
    const store = useStore()
    return {}
  }
}
</script>
