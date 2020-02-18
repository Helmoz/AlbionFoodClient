import { reactive, toRefs, watch } from '@vue/composition-api'
import { computedMutation } from 'src/utils/storeGetter'

export function useCraftSettings(store) {
  const data = reactive({
    city: computedMutation(store, 'craftSettings', 'city', 'setCity'),
    focusUsage: computedMutation(store, 'craftSettings', 'focusUsage', 'setFocusUsage'),
    focusPoints: computedMutation(store, 'craftSettings', 'focusPoints', 'setFocusPoints'),
    itemsCount: computedMutation(store, 'craftSettings', 'itemsCount', 'setItemsCount', () => {
      if (store.state.craftSettings.focusUsage) {
        return Math.floor(store.state.craftSettings.focusPoints / store.state.foodType.foodItem.craftingFocus)
      }
      return store.state.craftSettings.itemsCount
    })
  })

  return {
    ...toRefs(data)
  }
}
