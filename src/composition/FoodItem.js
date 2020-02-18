import { reactive, computed, watch, toRefs } from '@vue/composition-api'
import { useFetch } from '@/statics/async-function'

import { computedMutation } from 'src/utils/storeGetter'
import { getTimeAgo } from '@/utils/dateAgo'

export function useFoodItem(store) {
  const item = reactive({
    foodItem: computedMutation(store, 'foodType', 'foodItem', 'setFoodItem'),
    foodItemImage: computed(() => `https://gameinfo.albiononline.com/api/gameinfo/items/${item.foodItem.uniquename}`),
    city: computedMutation(store, 'craftSettings', 'city', 'setCity')
  })
  const prices = reactive({
    currentPrice: null,
    minimalSellPrice: computed(() => prices.currentPrice && prices.currentPrice[0]['sell_price_min']),
    minimalSellPriceDate: computed(() => {
      let date = prices.currentPrice && prices.currentPrice[0]['sell_price_min_date']
      return `обновлена ${getTimeAgo(date)}`
    }),
    maximumBuyPriceDate: computed(() => {
      let date = prices.currentPrice && prices.currentPrice[0]['buy_price_max_date']
      return `обновлена ${getTimeAgo(date)}`
    }),
    maximumBuyPrice: computed(() => prices.currentPrice && prices.currentPrice[0]['buy_price_max'])
  })

  watch([() => item.foodItem.uniquename, () => item.city], () => {
    const url = `https://www.albion-online-data.com/api/v2/stats/prices/${item.foodItem.uniquename}?locations=${item.city}`
    const { data } = useFetch(url)
    prices.currentPrice = data
  })

  return { ...toRefs(item), ...toRefs(prices) }
}
