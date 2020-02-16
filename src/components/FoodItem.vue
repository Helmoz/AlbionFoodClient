<template>
  <div>
    <q-item class="q-pa-none">
      <q-item-section top class="col-xs-2">
        <div class="text-h5 text-dark q-pl-sm">{{ foodItem.uniquename }}</div>
        <FoodItemImage :foodItemImage="foodItemImage" :size="150" />
      </q-item-section>
      <q-item-section top class="col-xs-3 q-mt-xl">
        <FoodItemPrice
          :label="`Минимальная цена продажи`"
          :price="minimalSellPrice"
          :date="minimalSellPriceDate"
        />
        <FoodItemPrice
          :label="`Максимальная цена покупки`"
          :price="maximumBuyPrice"
          :date="maximumBuyPriceDate"
          class="q-mt-md"
        />
      </q-item-section>
      <q-item-section>
        <FoodItemChart />
      </q-item-section>
    </q-item>
  </div>
</template>

<script>
import { useStore } from '../composition/useStore'

import FoodItemImage from '../components/FoodItemImage';
import FoodItemPrice from '../components/FoodItemPrice';
import FoodItemChart from '../components/FoodItemChart';

import { useFoodItem } from '../composition/FoodItem'

export default {
  components: {
    FoodItemImage,
    FoodItemPrice,
    FoodItemChart
  },
  setup () {
    const store = useStore()
    const { foodItem } = useFoodItem(store)

    return {
      ...useFoodItem(store)
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
