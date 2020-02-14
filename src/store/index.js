import Vue from 'vue'
import Vuex from 'vuex'

import craftSettings from './CraftSettings'
import foodType from './FoodType'

Vue.use(Vuex)

export default function() {
  const Store = new Vuex.Store({
    modules: {
      craftSettings,
      foodType
    },
    strict: process.env.DEV
  })

  return Store
}
