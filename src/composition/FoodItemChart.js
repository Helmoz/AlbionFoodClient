import { reactive, computed, watch, toRefs } from '@vue/composition-api'

import { useApi } from './useApi'

import { getDefaultChart, groupSelector, countPriceSelector } from '../utils/chart'

import linqer from '@siderite/linqer'

export function useFoodItemChart(store, foodItem) {
  const data = reactive({
    historyData: null,
    option: computed(() => {
      let chart = getDefaultChart()

      if (data.historyData) {
        const grouped = linqer.Enumerable.from(data.historyData.data)
          .groupBy(x => groupSelector(x.timestamp))
          .select(item => countPriceSelector(item))
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

  watch([() => foodItem.value.uniquename, () => store.state.craftSettings.city], () => {
    let currentDate = new Date()
    currentDate.setDate(currentDate.getDate() - 14)
    let formattedDate = currentDate.toISOString().substring(0, 10)
    const { data: historyData } = useApi(
      `https://www.albion-online-data.com/api/v2/stats/history/${foodItem.value.uniquename}?locations=${store.state.craftSettings.city}&date=${formattedDate}&time-scale=6`
    )
    data.historyData = historyData
  })

  return { ...toRefs(data) }
}
