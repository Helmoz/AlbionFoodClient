<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
import { provideStore } from './composition/useStore'

export default {
  setup(_, { root: { $store } }) {
    provideStore($store)
  },
  name: 'App'
}
</script>
