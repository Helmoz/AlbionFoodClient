import { reactive, toRefs } from '@vue/composition-api'

export function useApi(url, options = {}) {
  const state = reactive({
    data: null,
    loading: ''
  })

  const initFetch = async () => {
    try {
      state.loading = true
      const response = await fetch(url)
      const data = await response.json()
      state.data = data[0]
      state.loading = false
    } catch (error) {
      console.log(error)
      state.data = 'error'
      state.loading = false
    }
  }

  initFetch()

  return {
    ...toRefs(state),
    initFetch
  }
}
