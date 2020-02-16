import { reactive, computed, watch, toRefs } from '@vue/composition-api'

import { useApi } from './useApi'

import { getter } from '../utils/storeGetter'
import { getDefaultChart, groupSelector, countPriceSelector } from '../utils/chart'

import linqer from '@siderite/linqer'

export function useFoodItemChart(store) {
  const data = reactive({
    historyData: null,
    foodItem: getter(store, 'foodType', 'foodItem', 'setFoodItem'),
    option: computed(() => {
      let chart = getDefaultChart()

      if (data.historyData) {
        const grouped = linqer.Enumerable.from(data.historyData.data)
          .groupBy(x => groupSelector(x.timestamp))
          .select(item => countPriceSelector(item))
          .skipLast(1)
          .toList()

        chart.xAxis.data = grouped.select(x => x.key).toArray()
        chart.series = []
        chart.series.push({
          name: 'Средняя цена',
          type: 'line',
          data: grouped.select(x => x.price).toArray(),
          smooth: true,
          areaStyle: {}
        })
        chart.series.push({
          name: 'Продано',
          type: 'line',
          smooth: true,
          yAxisIndex: 1,
          data: grouped.select(x => x.count).toArray()
        })
      }

      return chart
    })
  })

  watch([() => data.foodItem.uniquename, () => store.state.craftSettings.city], () => {
    let currentDate = new Date()
    currentDate.setDate(currentDate.getDate() - 14)
    let formattedDate = currentDate.toISOString().substring(0, 10)
    const { data: historyData } = useApi(
      `https://www.albion-online-data.com/api/v2/stats/history/${data.foodItem.uniquename}?locations=${store.state.craftSettings.city}&date=${formattedDate}&time-scale=6`
    )
    data.historyData = historyData
  })

  return { ...toRefs(data) }
}
