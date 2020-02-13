<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
import { provideStore } from "./composition/use-store";

export default {
  setup(_, { root: { $store } }) {
    provideStore($store);
  },
  name: "App"
};
</script>
