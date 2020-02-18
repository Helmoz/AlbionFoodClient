<template>
  <div class="row">
    <div class="col-xs-5" style="min-height: 350px">
      <q-table
        :data="foodItem.resourses"
        :columns="columns"
        row-key="uniquename"
        hide-bottom
        flat
        bordered
        dense
      >
        <template v-slot:body-cell-name="props">
          <q-td :props="props">
            <div class="text-h6">
              <FoodItemImage :foodItemImage="getIcon(props.row.uniquename)" :size="50" />
              {{ props.row.uniquename }}
            </div>
          </q-td>
        </template>
        <template v-slot:body-cell-price="props">
          <q-td :props="props">
            <span>{{ props.row.price }}</span>
          </q-td>
        </template>
      </q-table>
    </div>
  </div>
</template>

<script>
import { useStore } from '@/composition/useStore'
import { useFoodItemIngridients } from '@/composition/FoodItemIngridients'
import FoodItemImage from '@/components/FoodItemImage'

export default {
  components: {
    FoodItemImage
  },
  setup () {
    const store = useStore()

    return {
      ...useFoodItemIngridients(store)
    }
  }
}
</script>

