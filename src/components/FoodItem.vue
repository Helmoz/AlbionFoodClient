<template>
  <q-card>
    <q-card-section>
      <q-item class="q-pa-none">
        <q-item-section side class="q-pr-none">
          <q-avatar rounded size="70px">
            <q-img transition="fade" :src="state.foodItemImage">
              <template v-slot:loading>
                <q-spinner-gears size="30px" color="white" />
              </template>
            </q-img>
          </q-avatar>
        </q-item-section>
        <q-item-section side>
          <div class="text-h6 text-dark q-pl-sm">{{ state.foodItem.uniquename }}</div>
        </q-item-section>
        <q-item-section side>
          <q-input
            :loading="state.loading"
            type="number"
            stack-label
            :value="state.minPrice"
            label="Цена"
            :hint="state.dateAgo"
            dense
          />
        </q-item-section>
      </q-item>
    </q-card-section>

    <!-- <q-separator inset /> -->
  </q-card>
</template>

<script>
import { useStore } from '../composition/use-store'

import { useFoodItem } from '../composition/FoodItem'

export default {
  setup() {
    const store = useStore()

    return {
      ...useFoodItem(store)
    }
  }
}
</script>
