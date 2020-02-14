import { computed } from '@vue/composition-api'

export function useCraftSettings(store) {
  const city = computed({
    get: () => store.state.craftSettings.city,
    set: value => store.commit('craftSettings/setCity', value)
  })
  const focusUsage = computed({
    get: () => store.state.craftSettings.focusUsage,
    set: value => store.commit('craftSettings/setFocusUsage', value)
  })
  const focusPoints = computed({
    get: () => store.state.craftSettings.focusPoints,
    set: value => store.commit('craftSettings/setFocusPoints', value)
  })
  const itemsCount = computed({
    get: () => store.state.craftSettings.itemsCount,
    set: value => store.commit('craftSettings/setItemsCount', value)
  })

  return {
    city,
    focusUsage,
    focusPoints,
    itemsCount
  }
}
