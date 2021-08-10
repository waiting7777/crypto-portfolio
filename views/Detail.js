import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { StyleSheet, Text, View, Image, StatusBar, useWindowDimensions, ScrollView } from 'react-native';
import { formatNumber, formatPercentage, formatChangeColor, formatSatoshi } from '../utils'
import RenderHtml from 'react-native-render-html';

const Detail = ({ route }) => {
  const [data, setData] = useState({})
  const { width } = useWindowDimensions()

  useEffect(() => {
    let ignore = false

    async function fetchData() {
      const result = await axios(`https://api.coingecko.com/api/v3/coins/${route.params.id}`);

      if (!ignore) setData(result.data);
    }

    fetchData();

    return () => {
      ignore = true;
    }
  }, [])

  if (Object.keys(data).length > 0) {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.rankContain}>
          <Text style={styles.rank}>RANK #{data.market_cap_rank}</Text>
        </View>
        <View style={styles.titleContain}>
          <Image style={styles.icon} source={{ uri: data.image.small }} />
          <Text style={styles.title}>{data.name} ({data.symbol})</Text>
        </View>
        <View style={styles.priceContain}>
          <Text style={styles.price}>${formatNumber(data.market_data.current_price.usd)}</Text>
          <Text style={[styles.priceChange, { color: formatChangeColor(data.market_data.price_change_percentage_24h) }]}>{formatPercentage(data.market_data.price_change_percentage_24h)}</Text>
        </View>
        <View style={styles.subPriceContain}>
          <Text style={styles.subPrice}>{formatSatoshi(data.market_data.current_price.btc)} BTC</Text>
          <Text style={styles.subPrice}>{formatSatoshi(data.market_data.current_price.eth)} ETH</Text>
        </View>
        <View style={styles.descContain}>
          <Text style={styles.subTitle}>關於</Text>
          <RenderHtml contentWidth={width} source={{ html: `<div>${data.description.en}</div>` }} />
        </View>
      </ScrollView>
    )
  } else {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.text}>Loading...</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    flex: 1,
    marginTop: StatusBar.currentHeight,
    maxWidth: 480,
  },
  container: {
    backgroundColor: '#fff',
    marginTop: StatusBar.currentHeight,
    maxWidth: 480,
    padding: 16,
    flex: 1
  },
  rankContain: {
    width: 95,
    justifyContent: 'center',
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 10,
    backgroundColor: '#000',
  },
  rank: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold'
  },
  titleContain: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textTransform: 'uppercase'
  },
  subTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 9
  },
  icon: {
    width: 32,
    height: 32,
    marginRight: 5
  },
  priceContain: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginTop: 8
  },
  price: {
    fontSize: 28
  },
  priceChange: {
    marginLeft: 10,
    marginBottom: 2
  },
  subPriceContain: {
    marginTop: 5
  },
  subPrice: {
    color: '#374151',
    fontSize: 14,
  },
  descContain: {
    marginTop: 12
  }
});

export default Detail