import numeral from 'numeral'

export const sortData = (data) => {
  const sortedData = [...data]

  return sortedData.sort((a, b) => (a.cases > b.cases ? -1 : 1))
}

export const prettyPrintStat = (stat) => {
  if (stat >= 1000) {
    return `${numeral(stat).format('0.0a')}`
  } else if (!stat) {
    return '0'
  } else {
    return stat
  }
}
