import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, VirtualizedList, StatusBar, TouchableOpacity, RefreshControl } from 'react-native';
import Item from '../components/Item'
import Arrow from '../components/Arrow'

const initSortStatus = {
	symbol: 0,
	total_volume: 0,
	current_price: 0,
	price_change_percentage_24h: 0
}

const getItem = (data, index) => data[index]

const getItemCount = (data) => data.length;

const sortData = (target, direction, key) => {
	const temp = [...target]

	if (key == 'symbol') {
		if (direction <= 0) {
			return temp.sort((a, b) => a.symbol.localeCompare(b.symbol))
		} else {
			return temp.sort((a, b) => b.symbol.localeCompare(a.symbol))
		}
	} else {
		if (direction <= 0) {
			return temp.sort((a, b) => b[key] - a[key])
		} else {
			return temp.sort((a, b) => a[key] - b[key])
		}
	}
}

export default function Hone({ navigation }) {
  const [data, setData] = useState([])
	const [page, setPage] = useState(25)
	const [refreshing, setRefreshing] = useState(false)
	const [sortStatus, setSortStatus] = useState(initSortStatus)

	const sortHandle = (key) => {
		const temp = sortData(data, sortStatus[key], key)
		setData(temp)
		setSortStatus({
			...initSortStatus,
			[key]: sortStatus[key] > 0 ? -1 : 1,
		})
	}

	async function fetchData(addPage = true) {
		if (page <= 250) {
			const result = await axios(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${page}&page=1&sparkline=false`);
			console.log(result.data)
			setData(result.data)
			setRefreshing(false)
			if (addPage) {
				setPage(page + 25)
			}
		}
	}

	function onRefresh() {
		setRefreshing(true)
		fetchData(false)
	}

  useEffect(() => {
    fetchData();
  }, [])

  return (
    <View style={styles.container}>
			<View style={styles.tab}>
				<View style={styles.left}>
					<TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => sortHandle('symbol')}>
						<Text style={styles.tabTitle}>名稱</Text>
						<View style={styles.iconContain}>
							<Arrow status={sortStatus.symbol} />
						</View>
					</TouchableOpacity>
				</View>
				<View style={styles.right}>
					<TouchableOpacity style={{ flexDirection: 'row', width: 75 }} onPress={() => sortHandle('total_volume')}>
						<Text style={styles.tabName}>成交量</Text>
						<View style={styles.iconContain}>
							<Arrow status={sortStatus.total_volume} />
						</View>
					</TouchableOpacity>
					<TouchableOpacity style={{ flexDirection: 'row', width: 75 }} onPress={() => sortHandle('current_price')}>
						<Text style={styles.tabName}>價格($)</Text>
						<View style={styles.iconContain}>
							<Arrow status={sortStatus.current_price} />
						</View>
					</TouchableOpacity>
					<TouchableOpacity style={{ flexDirection: 'row', width: 75 }} onPress={() => sortHandle('price_change_percentage_24h')}>
						<Text style={styles.tabName}>24h漲跌</Text>
						<View style={styles.iconContain}>
							<Arrow status={sortStatus.price_change_percentage_24h} />
						</View>
					</TouchableOpacity>
				</View>
			</View>
      <VirtualizedList
        data={data}
        renderItem={({ item }) => <Item item={item} navigation={navigation} />}
        keyExtractor={item => item.id}
        getItemCount={getItemCount}
        getItem={getItem}
				onEndReached={() => {
					fetchData()
				}}
				refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    marginTop: StatusBar.currentHeight,
    maxWidth: 480,
  },
	tab: {
		display: 'flex',
		flexDirection: 'row',
		marginTop: 12,
		marginHorizontal: 16,
		paddingBottom: 16
	},
	tabTitle: {
		color: 'gray',
	},
	tabName: {
		color: 'gray',
		textAlign: 'center'
	},
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
	iconContain: {
		marginLeft: 4
	}
});
