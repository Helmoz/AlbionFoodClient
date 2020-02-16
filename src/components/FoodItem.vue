<template>
  <div>
    <q-item class="q-pa-none">
      <q-item-section top class="col-xs-2">
        <div class="text-h5 text-dark q-pl-sm">{{ foodItem.uniquename }}</div>
        <q-avatar rounded size="150px">
          <q-img transition="fade" :src="foodItemImage">
            <template v-slot:loading>
              <q-spinner-gears size="30px" color="white" />
            </template>
          </q-img>
        </q-avatar>
      </q-item-section>
      <q-item-section top class="col-xs-3 q-mt-xl">
        <q-field outlined label="Минимальная цена продажи" stack-label bottom-slots>
          <template v-slot:hint>
            <div class="text-right">{{ minimalSellPriceDate }}</div>
          </template>
          <template v-slot:control>
            <div class="self-center full-width no-outline" tabindex="0">{{ minimalSellPrice }}</div>
          </template>
        </q-field>
        <q-field outlined label="Максимальная цена покупки" stack-label class="q-mt-md" bottom-slots>
          <template v-slot:hint>
            <div class="text-right">{{ maximumBuyPriceDate }}</div>
          </template>
          <template v-slot:control>
            <div class="self-center full-width no-outline" tabindex="0">{{ maximumBuyPrice }}</div>
          </template>
        </q-field>
      </q-item-section>
      <q-item-section bottom class="q-ml-sm">
        <v-chart theme="custom" autoresize :options="option" />
      </q-item-section>
    </q-item>
  </div>
</template>

<script>
import { useStore } from '../composition/useStore'

import theme from '../assets/chart-theme.json'

import ECharts from 'vue-echarts'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/legend'
ECharts.registerTheme('custom', theme)

import { useFoodItem } from '../composition/FoodItem'
import { useFoodItemChart } from '../composition/FoodItemChart'

export default {
  components: {
    'v-chart': ECharts
  },
  setup() {
    const store = useStore()
    const { foodItem } = useFoodItem(store)

    return {
      ...useFoodItem(store),
      ...useFoodItemChart(store, foodItem)
    }
  }
}
</script>

<style scoped>
.echarts {
  width: 100%;
  height: 350px;
}
</style>
