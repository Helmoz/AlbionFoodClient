import { reactive } from '@vue/composition-api'
import { getter } from '../utils/storeGetter'

export function useCraftSettings(store) {
  const state = reactive({
    city: getter(store, 'craftSettings', 'city', 'setCity'),
    focusUsage: getter(store, 'craftSettings', 'focusUsage', 'setFocusUsage'),
    focusPoints: getter(store, 'craftSettings', 'focusPoints', 'setFocusPoints'),
    itemsCount: getter(store, 'craftSettings', 'itemsCount', 'setItemsCount', () => {
      if (store.state.craftSettings.focusUsage) {
        return Math.floor(
          store.state.craftSettings.focusPoints /
            store.state.foodType.foodItem.craftingrequirements.craftingfocus
        )
      }
      return store.state.craftSettings.itemsCount
    })
  })
  return {
    state
  }
}
