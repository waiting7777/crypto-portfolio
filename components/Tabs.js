import React, { memo } from 'react'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'
import Arrow from '../components/Arrow'

const Tabs = ({ sortStatus, sortHandle }) => {
  return (
    <View style={styles.tab}>
      <View style={styles.left}>
        <TouchableOpacity style={styles.leftTab} onPress={() => sortHandle('symbol')}>
          <Text style={styles.tabTitle}>名稱</Text>
          <View style={styles.iconContain}>
            <Arrow status={sortStatus.symbol} />
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.right}>
        <TouchableOpacity style={styles.rightTab} onPress={() => sortHandle('total_volume')}>
          <Text style={styles.tabName}>成交量</Text>
          <View style={styles.iconContain}>
            <Arrow status={sortStatus.total_volume} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.rightTab} onPress={() => sortHandle('current_price')}>
          <Text style={styles.tabName}>價格($)</Text>
          <View style={styles.iconContain}>
            <Arrow status={sortStatus.current_price} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.rightTab} onPress={() => sortHandle('price_change_percentage_24h')}>
          <Text style={styles.tabName}>24h漲跌</Text>
          <View style={styles.iconContain}>
            <Arrow status={sortStatus.price_change_percentage_24h} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  left: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    width: 120,
    color: 'gray'
  },
  right: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row',
  },
  tab: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 12,
    marginHorizontal: 16,
    paddingBottom: 16
  },
  leftTab: {
    flexDirection: 'row'
  },
  rightTab: {
    flexDirection: 'row',
    width: 75
  },
  tabTitle: {
    color: 'gray',
  },
  tabName: {
    color: 'gray',
    textAlign: 'center'
  },
  iconContain: {
    marginLeft: 4
  }
})

export default memo(Tabs)