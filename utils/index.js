import numeral from 'numeral'

export const formatNumber = (num) => {
    if (num < 1) {
      return numeral(num).format('0.0000')
    } else if (num >= 1 && num < 10000) {
      return numeral(num).format('0,0.00')  
    } else {
      return numeral(num).format('0,0')
    }
}

export const formatSatoshi = (num) => {
    return numeral(num).format('0.00000000')
}

export const formatPercentage = (num) => {
    return `${numeral(num).format('+0.00')}%`
}

export const formatChangeColor = (change) => {
    return change > 0 ? '#02C77A' : '#FF3B69'
}