import { reactive, computed, watch, toRefs } from '@vue/composition-api'

import { computedAction, computedMutation } from 'src/utils/storeGetter'

export function useFoodItemIngridients(store) {
  const columns = [
    {
      name: 'name',
      required: true,
      label: 'Наименование',
      align: 'left',
      field: 'uniquename',
      sortable: false,
      style: 'min-width: 240px'
    },
    {
      name: 'count',
      required: true,
      align: 'center',
      label: 'Количество',
      field: 'count',
      sortable: false
    },
    { name: 'price', align: 'center', label: 'Цена', sortable: false }
  ]
  const item = reactive({
    foodItem: computedAction(store, 'foodType', 'foodItem', 'setFoodItem'),
    city: computedMutation(store, 'craftSettings', 'city', 'setCity'),
    foodItemImage: computed(() => `https://gameinfo.albiononline.com/api/gameinfo/items/${item.foodItem && item.foodItem.uniquename}`),
    loading: computedMutation(store, 'foodType', 'loading', 'setLoading')
  })

  function getIcon(name) {
    return `https://gameinfo.albiononline.com/api/gameinfo/items/${name}`
  }

  watch(
    () => item.city,
    () => (item.foodItem = item.foodItem)
  )

  return { ...toRefs(item), columns, getIcon }
}
