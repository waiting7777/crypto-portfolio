import React, { memo } from 'react'
import { Text, View, StyleSheet, Image, TouchableHighlight } from 'react-native'
import numeral from 'numeral'
import Ticker from './Ticker'
import { formatNumber } from '../utils'

const Item = ({ item, navigation }) => {
  console.log('item')
  return (
    <TouchableHighlight onPress={() => navigation.navigate('Detail', { name: item.symbol.toUpperCase(), id: item.id })}>
      <View style={styles.item}>
        <View style={styles.left}>
          <Image
            style={styles.icon}
            source={{ uri: item.image }}
          />
          <Text style={styles.title}>{item.symbol}</Text>
        </View>
        <View style={styles.right}>
          <Text style={styles.number}>{numeral(item.total_volume).format('0.0a')}</Text>
          <Text style={styles.number}>{formatNumber(item.current_price)}</Text>
          <Ticker change={item.price_change_percentage_24h} />
        </View>
      </View>
    </TouchableHighlight>
  )
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 16,
    padding: 5,
    height: 64
  },
  title: {
    color: '#000',
    fontSize: 16,
    textTransform: 'uppercase'
  },
  number: {
    color: '#000',
    fontSize: 16,
    textTransform: 'uppercase',
    width: 80,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    paddingRight: 12,
    textAlign: 'right'
  },
  icon: {
    width: 16,
    height: 16,
    marginRight: 8
  },
  left: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    width: 80
  },
  right: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row',
  }
})

export default memo(Item)