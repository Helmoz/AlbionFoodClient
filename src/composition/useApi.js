import { reactive, toRefs } from '@vue/composition-api'

export function useApi(url) {
  const state = reactive({
    data: null
  })

  const initFetch = async () => {
    try {
      const response = await fetch(url, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      })
      const data = await response.json()
      state.data = data[0]
    } catch (error) {
      console.log(error)
    }
  }

  initFetch()

  return {
    ...toRefs(state)
  }
}
