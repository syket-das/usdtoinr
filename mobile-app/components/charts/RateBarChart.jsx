import { View, Text, Dimensions } from 'react-native';
import React, { useEffect } from 'react';
import { BarChart } from 'react-native-gifted-charts';
import useExchangeRateStore from '../../store/exchangeRateStore';

const RateBarChart = () => {
  const { exchangeRates, getExchangeRates } = useExchangeRateStore(
    (state) => state
  );

  useEffect(() => {
    getExchangeRates();
  }, []);

  let lastIndex = exchangeRates.length - 1;
  const barData = exchangeRates.map((rate, index) => {
    return {
      value: rate.rate,
      // label: new Date(rate.createdAt).toLocaleDateString(),
      frontColor: index === lastIndex ? 'red' : 'lightgray',

      topLabelComponent: () => (
        <Text style={{ color: 'blue', fontSize: 10, marginBottom: 2 }}>
          {rate.rate}
        </Text>
      ),
    };
  });

  return (
    <View>
      <BarChart
        scrollToIndex={exchangeRates.length - 1}
        width={Dimensions.get('window').width - 100}
        barWidth={30}
        barBorderRadius={4}
        frontColor="lightgray"
        data={barData}
        yAxisThickness={0}
        xAxisThickness={0}
        autoShiftLabels
      />
    </View>
  );
};

export default RateBarChart;
