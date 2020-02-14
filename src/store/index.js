import Vue from 'vue'
import Vuex from 'vuex'

import craftSettings from './CraftSettings'

Vue.use(Vuex)

export default function(/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      craftSettings
    },
    strict: process.env.DEV
  })

  return Store
}
