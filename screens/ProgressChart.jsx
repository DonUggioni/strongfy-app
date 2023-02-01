import React from 'react';
import { View, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';
import { GlobalStyles } from '../constants/styles';

function ProgressChart() {
  const data = [
    { value: 15 },
    { value: 30 },
    { value: 26 },
    { value: 100 },
    { value: 15 },
    { value: 30 },
    { value: 26 },
    { value: 180 },
  ];
  const data2 = [{ value: 30 }, { value: 40 }, { value: 45 }, { value: 50 }];
  const data3 = [{ value: 25 }, { value: 30 }, { value: 35 }, { value: 50 }];
  return (
    <View style={styles.rootContainer}>
      <View style={styles.chartContainer}>
        <LineChart
          data={data}
          data2={data2}
          data3={data3}
          curved
          color1={GlobalStyles.colors.primary400}
          color2={GlobalStyles.colors.primary500}
          color3={GlobalStyles.colors.accent500}
          dataPointsColor={GlobalStyles.colors.gray200}
          height={250}
          width={320}
          thickness1={2}
          thickness2={2}
          thickness3={2}
          yAxisColor={GlobalStyles.colors.gray200}
          xAxisColor={GlobalStyles.colors.gray200}
          yAxisTextStyle={{ color: 'white' }}
          initialSpacing={0}
          rulesColor={GlobalStyles.colors.gray300}
        />
      </View>
    </View>
  );
}

export default ProgressChart;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chartContainer: {
    padding: 12,
    borderRadius: GlobalStyles.borderRadius,
  },
});
