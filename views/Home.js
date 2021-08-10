import axios from 'axios';
import React, { useEffect, useState, useMemo } from 'react';
import { StyleSheet, View, StatusBar, ActivityIndicator } from 'react-native';
import Lists from '../components/Lists'
import Tabs from '../components/Tabs'

const initSortStatus = {
	symbol: 0,
	total_volume: 0,
	current_price: 0,
	price_change_percentage_24h: 0
}

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
	const [page, setPage] = useState(1)
	const [loading, setLoading] = useState(false)
	const [sortStatus, setSortStatus] = useState(initSortStatus)

	const sortHandle = (key) => {
		const temp = sortData(data, sortStatus[key], key)
		setData(temp)
		setSortStatus({
			...initSortStatus,
			[key]: sortStatus[key] > 0 ? -1 : 1,
		})
	}

	useEffect(() => {
		let ignore = false

		async function fetchData() {
			const result = await axios(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=25&page=${page}&sparkline=false`)
			setData(data.concat(result.data))
			setLoading(false)
		}

		fetchData()

		return () => {
			ignore = true;
		}

	}, [page])

	return (
		<View style={styles.container}>
			<Tabs sortStatus={sortStatus} sortHandle={sortHandle} />
			<Lists data={data} page={page} setPage={setPage} setLoading={setLoading} navigation={navigation} />
			<View style={styles.loading} pointerEvents="none">
				<ActivityIndicator animating={loading} size='large' />
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	loading: {
		position: 'absolute',
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
		alignItems: 'center',
		justifyContent: 'center'
	},
	container: {
		backgroundColor: '#fff',
		flex: 1,
		marginTop: StatusBar.currentHeight,
		maxWidth: 480,
	}
});
