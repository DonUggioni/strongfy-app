import React from 'react';
import { View, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';
import { GlobalStyles } from '../constants/styles';
import SvgLine from '../components/UI/SvgLine';
import Title from '../components/UI/text/Title';
import useAppContext from '../store/AppContext';

function ProgressChart() {
  const { repMaxTrackerValues } = useAppContext();

  const data = repMaxTrackerValues?.squat.slice(1);
  const data2 = repMaxTrackerValues?.bench.slice(1);
  const data3 = repMaxTrackerValues?.deadlift.slice(1);

  return (
    <View style={styles.rootContainer}>
      <Title style={styles.title}>1RM Tracker</Title>
      <View>
        <LineChart
          data={data}
          data2={data2}
          data3={data3}
          curved
          color1={GlobalStyles.colors.primary500}
          color2={GlobalStyles.colors.accent500}
          color3={GlobalStyles.colors.blue500}
          dataPointsColor={GlobalStyles.colors.gray200}
          height={320}
          width={320}
          thickness1={2}
          thickness2={2}
          thickness3={2}
          yAxisColor={GlobalStyles.colors.gray200}
          xAxisColor={GlobalStyles.colors.gray200}
          yAxisTextStyle={{ color: 'white' }}
          initialSpacing={0}
          rulesColor={GlobalStyles.colors.gray300}
          spacing={35}
        />
      </View>
      <View style={styles.legendContainer}>
        <SvgLine text='Squat' lineColor={GlobalStyles.colors.primary500} />
        <SvgLine text='Bench' lineColor={GlobalStyles.colors.accent500} />
        <SvgLine text='Deadlift' lineColor={GlobalStyles.colors.blue500} />
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
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  legendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: '100%',
    marginTop: -25,
  },
});
