function round(number, prec) {
  return Math.round(number / prec) * prec
}

function getYAxis(name, label) {
  return {
    type: 'value',
    name: name,
    max: function(value) {
      return round(value.max + value.max * 0.1, 100)
    },
    min: function(value) {
      return round(value.min - value.min * 0.2, 100)
    },
    axisLabel: {
      formatter: label
    }
  }
}

export function getDefaultChart() {
  let chart = {
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: []
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['Средняя цена', 'Продано']
    },
    yAxis: [getYAxis('Средняя цена', ''), getYAxis('Продано', '{value}')],
    series: []
  }

  return chart
}

export function groupSelector(timestamp) {
  let date = new Date(timestamp)
  if (date.getHours() === 0) {
    date.setDate(date.getDate() - 1)
  }
  return date.toLocaleDateString()
}

export function countPriceSelector(item) {
  const count = item.select(x => x.item_count).sum()
  const price = item.aggregate(0, (acc, item) => acc + Math.ceil((item.avg_price / count) * item.item_count))
  return {
    key: item.key,
    count: count,
    price: price
  }
}
