<template>
  <q-page>
    <q-card square bordered flat>
      <q-card-section>
        <CraftSettings />
      </q-card-section>
    </q-card>
    <q-card square bordered flat style="margin-top: -1px">
      <q-card-section>
        <FoodType />
      </q-card-section>
    </q-card>
    <q-card square bordered flat style="margin-top: -1px">
      <q-card-section>
        <q-tabs
          v-model="tab"
          dense
          active-color="primary"
          indicator-color="primary"
          align="justify"
          narrow-indicator
        >
          <q-tab name="price" label="Цена" />
          <q-tab name="ingridients" label="Ингридиенты" />
        </q-tabs>
        <q-separator />
        <q-tab-panels
          transition-prev="fade"
          transition-next="fade"
          keep-alive
          v-model="tab"
          animated
        >
          <q-tab-panel name="price">
            <transition name="fade">
              <div class="loading" v-if="loading">
                <q-spinner-bars color="primary" size="5em" />
              </div>
            </transition>
            <FoodItem />
          </q-tab-panel>
          <q-tab-panel name="ingridients">
            <transition name="fade">
              <div class="loading" v-if="loading">
                <q-spinner-bars color="primary" size="5em" />
              </div>
            </transition>
            <FoodItemIngridients />
          </q-tab-panel>
        </q-tab-panels>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import CraftSettings from '@/components/CraftSettings'
import FoodType from '@/components/FoodType'
import FoodItem from '@/components/FoodItem'
import FoodItemIngridients from '@/components/FoodItemIngridients'

import { useStore } from '@/composition/useStore'

import { computedMutation } from 'src/utils/storeGetter'

import { ref, toRefs, reactive } from '@vue/composition-api';

export default {
  name: 'PageIndex',
  components: {
    CraftSettings,
    FoodType,
    FoodItem,
    FoodItemIngridients
  },
  setup () {
    const store = useStore()
    const ap = reactive({
      loading: computedMutation(store, 'foodType', 'loading', 'setLoading')
    })
    const tab = ref('price')
    return {
      tab, ...toRefs(ap)
    }
  }
}
</script>

<style>
.loading {
  background: rgba(255, 255, 255, 1);
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  position: absolute;
  transition: 1s;
  top: 0;
  left: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>