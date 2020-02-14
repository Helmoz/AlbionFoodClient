import { reactive, computed, watch } from '@vue/composition-api'

import { getter } from '../utils/storeGetter'
import { getTimeAgo } from '../utils/dateAgo'

import { useApi } from './useApi'

export function useFoodItem(store) {
  const state = reactive({
    foodItem: getter(store, 'foodType', 'foodItem', 'setFoodItem'),
    foodItemImage: computed(
      () => `https://gameinfo.albiononline.com/api/gameinfo/items/${state.foodItem.uniquename}`
    ),
    currentPriceData: null,
    loading: false,
    dateAgo: computed(() => {
      let date = state.currentPriceData && state.currentPriceData['sell_price_min_date']
      return `обновлена ${getTimeAgo(date)}`
    }),
    minPrice: computed(() => {
      return state.currentPriceData && state.currentPriceData['sell_price_min']
    })
  })

  watch([() => state.foodItem, () => store.state.craftSettings.city], () => {
    const { data, loading } = useApi(
      `https://www.albion-online-data.com/api/v2/stats/prices/${state.foodItem.uniquename}?locations=${store.state.craftSettings.city}`
    )
    state.currentPriceData = data
    state.loading = loading
  })

  return { state }
}
