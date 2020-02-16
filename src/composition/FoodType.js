import { reactive, computed, ref, watch, toRefs } from '@vue/composition-api'

import { getter } from '../utils/storeGetter'

import items from '../statics/items.json'

export function useFoodType(store) {
  const foodOptions = Object.keys(items)

  const data = reactive({
    foodType: ref(foodOptions[0]),
    foodItems: computed(() => items[data.foodType]),
    foodItem: getter(store, 'foodType', 'foodItem', 'setFoodItem')
  })

  watch(
    () => data.foodType,
    () => (data.foodItem = data.foodItems[0])
  )

  return { ...toRefs(data), foodOptions }
}
