import linqer from '@siderite/linqer'

export async function setFoodItem({ commit, rootState }, payload) {
  commit('setLoading', true)
  const prices = await get(rootState.craftSettings.city, payload.resourses)
  const resourses = linqer.Enumerable.from(payload.resourses)
    .select(x => ({
      uniquename: x.uniquename,
      count: x.count,
      price: prices[x.uniquename]
    }))
    .toArray()

  const foodItem = {
    uniquename: payload.uniquename,
    resourses: resourses,
    craftingFocus: payload.craftingFocus
  }

  commit('setFoodItem', foodItem)
  commit('setLoading', false)
}

async function get(city, resourses) {
  let prices = {}
  for (const resourse of resourses) {
    let response = await fetch(`https://www.albion-online-data.com/api/v2/stats/prices/${resourse.uniquename}?locations=${city}`)
    let data = await response.json()
    prices[resourse.uniquename] = data[0]['sell_price_min']
  }
  return prices
}
