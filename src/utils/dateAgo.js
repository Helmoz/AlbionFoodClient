export function getTimeAgo(sDate) {
  sDate = new Date(sDate)
  let sourceDateUTC = Date.UTC(sDate.getFullYear(), sDate.getMonth(), sDate.getDate(), sDate.getHours(), sDate.getMinutes(), sDate.getSeconds())
  let nowUTC = new Date()
  sourceDateUTC = new Date(sourceDateUTC)
  let tdelta = new Date(nowUTC - sourceDateUTC).getTime() / 1000

  let timeString = ''

  let decCache = []
  let decCases = [2, 0, 1, 1, 1, 2]
  function decOfNum(number, titles) {
    if (!decCache[number]) decCache[number] = number % 100 > 4 && number % 100 < 20 ? 2 : decCases[Math.min(number % 10, 5)]
    return titles[decCache[number]]
  }

  const hours = ['час', 'часа', 'часов']
  const minutes = ['минуту', 'минуты', 'минут']
  const seconds = ['секунду', 'секунды', 'секунд']

  if (tdelta >= 94608000) {
    timeString = 'давно'
  } else if (tdelta >= 3600) {
    let amount = Math.round(tdelta / 3600)
    timeString = `${amount} ${decOfNum(amount, hours)} назад`
  } else if (tdelta >= 60) {
    let amount = Math.round(tdelta / 60)
    timeString = `${amount} ${decOfNum(amount, minutes)} назад`
  } else {
    let amount = Math.round(tdelta)
    timeString = `${amount} ${decOfNum(amount, seconds)} назад`
  }

  return timeString
}
