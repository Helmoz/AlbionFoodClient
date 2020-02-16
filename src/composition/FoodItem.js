import { reactive, computed, watch, toRefs } from '@vue/composition-api'

import { getter } from '../utils/storeGetter'
import { getTimeAgo } from '../utils/dateAgo'

import { useApi } from './useApi'

export function useFoodItem(store) {
  const item = reactive({
    foodItem: getter(store, 'foodType', 'foodItem', 'setFoodItem'),
    foodItemImage: computed(() => `https://gameinfo.albiononline.com/api/gameinfo/items/${item.foodItem.uniquename}`)
  })
  const prices = reactive({
    currentPrice: null,
    minimalSellPrice: computed(() => prices.currentPrice && prices.currentPrice['sell_price_min']),
    minimalSellPriceDate: computed(() => {
      let date = prices.currentPrice && prices.currentPrice['sell_price_min_date']
      return `обновлена ${getTimeAgo(date)}`
    }),
    maximumBuyPriceDate: computed(() => {
      let date = prices.currentPrice && prices.currentPrice['buy_price_max_date']
      return `обновлена ${getTimeAgo(date)}`
    }),
    maximumBuyPrice: computed(() => prices.currentPrice && prices.currentPrice['buy_price_max'])
  })

  watch([() => item.foodItem.uniquename, () => store.state.craftSettings.city], () => {
    const { data: currentPriceData } = useApi(
      `https://www.albion-online-data.com/api/v2/stats/prices/${item.foodItem.uniquename}?locations=${store.state.craftSettings.city}`
    )
    prices.currentPrice = currentPriceData
  })

  return { ...toRefs(item), ...toRefs(prices) }
}
