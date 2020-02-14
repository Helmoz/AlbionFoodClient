<template>
  <q-page><CraftSettings /></q-page>
</template>

<script>
import items from '../statics/items.json'
import CraftSettings from '../components/CraftSettings'
import { useStore } from '../composition/use-store'

export default {
  name: 'PageIndex',
  components: {
    CraftSettings
  },
  setup() {
    const store = useStore()
    return {}
  }
}
</script>
