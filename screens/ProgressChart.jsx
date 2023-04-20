import React from 'react';
import { View, StyleSheet } from 'react-native';
import {
  VictoryLine,
  VictoryChart,
  VictoryTheme,
  VictoryAxis,
} from 'victory-native';
import { GlobalStyles } from '../constants/styles';
import Title from '../components/UI/text/Title';
import useAppContext from '../store/AppContext';
import MessageScreen from '../components/MessageScreen';
import LegendLine from '../components/UI/LegendLine';

function ProgressChart() {
  const { repMaxTrackerValues } = useAppContext();

  const data = repMaxTrackerValues.squat.slice(1);
  const data2 = repMaxTrackerValues.bench.slice(1);
  const data3 = repMaxTrackerValues.deadlift.slice(1);

  const dataLength = repMaxTrackerValues.squat.length <= 1;
  const data2Length = repMaxTrackerValues.bench.length <= 1;
  const data3Length = repMaxTrackerValues.deadlift.length <= 1;
  // const [maxValue] = repMaxTrackerValues.deadlift.slice(-1);

  if (dataLength || data2Length || data3Length) {
    return <MessageScreen message={'Not enough data yet!'} />;
  }

  // const dataTest1 = [
  //   { quarter: 1, value: 120 },
  //   { quarter: 2, value: 123 },
  //   { quarter: 3, value: 127 },
  //   { quarter: 4, value: 127 },
  // ];
  // const dataTest2 = [
  //   { quarter: 1, value: 100 },
  //   { quarter: 2, value: 103 },
  //   { quarter: 3, value: 102 },
  //   { quarter: 4, value: 105 },
  // ];
  // const dataTest3 = [
  //   { quarter: 1, value: 140 },
  //   { quarter: 2, value: 145 },
  //   { quarter: 3, value: 146 },
  //   { quarter: 4, value: 150 },
  // ];

  return (
    <View style={styles.rootContainer}>
      <Title style={styles.title}>1RM Tracker</Title>
      <View style={styles.chartContainer}>
        <VictoryChart
          width={380}
          height={400}
          theme={VictoryTheme.material}
          domain={{ y: [0, 500] }}
        >
          <VictoryAxis
            dependentAxis
            style={{
              grid: {
                stroke: GlobalStyles.colors.gray300,
                strokeWidth: 0.5,
                strokeDasharray: 5,
              },
              axis: { stroke: GlobalStyles.colors.gray600 },
              ticks: { stroke: GlobalStyles.colors.gray300 },
            }}
          />
          <VictoryAxis
            crossAxis
            style={{
              grid: {
                stroke: GlobalStyles.colors.gray300,
                strokeWidth: 0.5,
                strokeDasharray: 5,
              },
              axis: { stroke: GlobalStyles.colors.gray600 },
              ticks: { display: 'none' },
              tickLabels: { display: 'none' },
              axisLabel: { stroke: GlobalStyles.colors.gray500 },
            }}
          />
          <VictoryLine
            data={data}
            y='value'
            interpolation={'monotoneX'}
            style={{
              data: { stroke: GlobalStyles.colors.primary500 },
            }}
          />
          <VictoryLine
            data={data2}
            y='value'
            interpolation={'monotoneX'}
            style={{
              data: { stroke: GlobalStyles.colors.accent500 },
            }}
          />
          <VictoryLine
            data={data3}
            y='value'
            interpolation={'monotoneX'}
            style={{
              data: { stroke: GlobalStyles.colors.blue500 },
            }}
          />
        </VictoryChart>
      </View>
      <View style={styles.legendContainer}>
        <LegendLine color={GlobalStyles.colors.primary500}>Squat</LegendLine>
        <LegendLine color={GlobalStyles.colors.accent500}>Bench</LegendLine>
        <LegendLine color={GlobalStyles.colors.blue500}>Deadlift</LegendLine>
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
    height: 340,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 0,
  },
  legendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: '100%',
    marginTop: -23,
  },
});
