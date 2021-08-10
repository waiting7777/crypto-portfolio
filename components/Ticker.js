import React, { memo } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import { formatPercentage, formatChangeColor } from '../utils'

const Ticker = ({ change }) => {
  return (
    <View style={[styles.ticker, { backgroundColor: formatChangeColor(change) }]}>
      <Text style={styles.text}>{formatPercentage(change)}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  ticker: {
    borderRadius: 5,
    width: 75,
    height: 32,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8
  },
  text: {
    color: '#fff',
    fontSize: 14,
  }
})

export default memo(Ticker)
