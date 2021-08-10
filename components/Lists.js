import React, { useState, memo } from 'react'
import { View, VirtualizedList } from 'react-native';
import Item from '../components/Item'

const getItem = (data, index) => data[index]

const getItemCount = (data) => data.length;

const Lists = ({ data, page, setPage, setLoading, navigation }) => {
  const [momentum, setMomentum] = useState(false)

  const momentumHandle = value => {
    setMomentum(value)
  }

  return (
    <View>
      <VirtualizedList
        data={data}
        getItemCount={getItemCount}
        getItem={getItem}
        renderItem={({ item }) => <Item item={item} navigation={navigation} />}
        keyExtractor={item => item.id}
        onMomentumScrollBegin={() => momentumHandle(true)}
        onMomentumScrollEnd={() => momentumHandle(false)}
        onEndReachedThreshold={0.5}
        onEndReached={() => {
          if (momentum) {
            setPage(page + 1)
            setLoading(true)
          }
        }}
      />
    </View>
  )
}

export default memo(Lists)