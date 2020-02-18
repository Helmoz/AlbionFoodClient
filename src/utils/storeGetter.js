import { computed } from '@vue/composition-api'

export function computedMutation(store, moduleName, propertyName, mutationName, getFunction) {
  const defaultGetFunction = () => store.state[moduleName][propertyName]
  const property = computed({
    get: getFunction || defaultGetFunction,
    set: value => store.commit(`${moduleName}/${mutationName}`, value)
  })

  return property
}

export function computedAction(store, moduleName, propertyName, actionName) {
  const property = computed({
    get: () => store.state[moduleName][propertyName],
    set: value => {
      store.dispatch(`${moduleName}/${actionName}`, value)
    }
  })

  return property
}
