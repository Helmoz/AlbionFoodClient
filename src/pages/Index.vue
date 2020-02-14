<template>
  <q-page>
    <CraftSettings />
    <FoodType />
    <FoodItem />
  </q-page>
</template>

<script>
import CraftSettings from '../components/CraftSettings'
import FoodType from '../components/FoodType'
import FoodItem from '../components/FoodItem'

import { useStore } from '../composition/use-store'

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
