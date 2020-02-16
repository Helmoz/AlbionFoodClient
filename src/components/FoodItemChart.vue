<template>
  <v-chart theme="custom" autoresize :options="option" />
</template>

<script>
import ECharts from 'vue-echarts'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/legend'
import theme from '../assets/chart-theme.json'
ECharts.registerTheme('custom', theme)

import { useStore } from '../composition/useStore'
import { useFoodItemChart } from '../composition/FoodItemChart'

export default {
  components: {
    'v-chart': ECharts,
  },
  props: {
    foodItemImage: String,
    size: Number
  },
  setup () {
    const store = useStore()

    return {
      ...useFoodItemChart(store)
    }
  }
}
</script>

<style>
</style>