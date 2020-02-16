export function getTimeAgo(sourceDate) {
  let date = new Date(sourceDate)
  var date_utc = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds())

  let now = new Date()
  var dateUtc = new Date(date_utc)
  let tdelta = new Date(now - dateUtc).getTime() / 1000

  let timeString = ''

  var decCache = [],
    decCases = [2, 0, 1, 1, 1, 2]
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
