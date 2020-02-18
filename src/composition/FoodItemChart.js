import { reactive, computed, watch, toRefs } from '@vue/composition-api'

import { computedMutation } from 'src/utils/storeGetter'
import { getDefaultChart, groupSelector, countPriceSelector } from '@/utils/chart'

import linqer from '@siderite/linqer'
import { useFetch } from '@/statics/async-function'

export function useFoodItemChart(store) {
  const data = reactive({
    historyData: null,
    foodItem: computedMutation(store, 'foodType', 'foodItem', 'setFoodItem'),
    city: computedMutation(store, 'craftSettings', 'city', 'setCity'),
    option: computed(() => {
      let chart = getDefaultChart()

      if (data.historyData) {
        const grouped = linqer.Enumerable.from(data.historyData[0].data)
          .groupBy(x => groupSelector(x.timestamp))
          .select(item => countPriceSelector(item))
          .skipLast(1)
          .toArray()

        chart.xAxis.data = grouped.map(x => x.key)
        chart.series = []
        chart.series.push({
          name: 'Средняя цена',
          type: 'line',
          data: grouped.map(x => x.price),
          smooth: true,
          areaStyle: {}
        })
        chart.series.push({
          name: 'Продано',
          type: 'line',
          smooth: true,
          yAxisIndex: 1,
          data: grouped.map(x => x.count)
        })
      }

      return chart
    })
  })

  watch([() => data.foodItem.uniquename, () => data.city], () => {
    let currentDate = new Date()
    currentDate.setDate(currentDate.getDate() - 14)
    let formattedDate = currentDate.toISOString().substring(0, 10)
    const url = `https://www.albion-online-data.com/api/v2/stats/history/${data.foodItem.uniquename}?locations=${data.city}&date=${formattedDate}&time-scale=6`
    const { data: historyData } = useFetch(url)
    data.historyData = historyData
  })

  return { ...toRefs(data) }
}
