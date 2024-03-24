import { View, Text, Dimensions } from 'react-native';
import React, { useEffect } from 'react';
import { LineChart } from 'react-native-gifted-charts';
import useExchangeRateStore from '../../store/exchangeRateStore';

const RateLineChart = () => {
  const { exchangeRates, getExchangeRates } = useExchangeRateStore(
    (state) => state
  );

  useEffect(() => {
    getExchangeRates();
  }, []);
  let lastIndex = exchangeRates.length - 1;

  return (
    <LineChart
      width={Dimensions.get('window').width - 100}
      areaChart
      data={exchangeRates.map((rate, index) => {
        return {
          value: rate.rate,
          label: new Date(rate.createdAt).toLocaleDateString(),
          frontColor: index === lastIndex ? 'red' : 'lightgray',
        };
      })}
    />
  );
};

export default RateLineChart;
