import { reactive, computed, ref, watch } from '@vue/composition-api'

import { getter } from '../utils/storeGetter'

import items from '../statics/items.json'

export function useFoodType(store) {
  const foodOptions = Object.keys(items)

  const state = reactive({
    foodType: ref(foodOptions[0]),
    foodItems: computed(() => items[state.foodType]),
    foodItem: getter(store, 'foodType', 'foodItem', 'setFoodItem')
  })

  watch(
    () => state.foodType,
    () => (state.foodItem = state.foodItems[0])
  )

  return { state, foodOptions }
}
