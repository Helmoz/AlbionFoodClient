<template>
  <q-page>
    <CraftSettings />
    <FoodType />
  </q-page>
</template>

<script>
import CraftSettings from '../components/CraftSettings'
import FoodType from '../components/FoodType'

import { useStore } from '../composition/use-store'

export default {
  name: 'PageIndex',
  components: {
    CraftSettings,
    FoodType
  },
  setup() {
    const store = useStore()
    return {}
  }
}
</script>
