import React from 'react';
import { View, StyleSheet } from 'react-native';

import { GlobalStyles } from '../constants/styles';
import Title from '../components/UI/text/Title';
import useAppContext from '../store/AppContext';
import MessageScreen from '../components/MessageScreen';
import StyledText from '../components/UI/text/StyledText';
import LegendLine from '../components/UI/LegendLine';

function ProgressChart() {
  const { repMaxTrackerValues } = useAppContext();

  // const data = repMaxTrackerValues.squat.slice(1);
  // const data2 = repMaxTrackerValues.bench.slice(1);
  // const data3 = repMaxTrackerValues.deadlift.slice(1);

  const dataLength = repMaxTrackerValues.squat.length <= 1;
  const data2Length = repMaxTrackerValues.bench.length <= 1;
  const data3Length = repMaxTrackerValues.deadlift.length <= 1;
  const [maxValue] = repMaxTrackerValues.deadlift.slice(-1);

  // if (dataLength || data2Length || data3Length) {
  //   return <MessageScreen message={'Not enough data yet!'} />;
  // }

  return (
    <View style={styles.rootContainer}>
      <Title style={styles.title}>1RM Tracker</Title>

      {/* <View style={styles.legendContainer}>
        <LegendLine color={GlobalStyles.colors.primary500}>Squat</LegendLine>
        <LegendLine color={GlobalStyles.colors.accent500}>Bench</LegendLine>
        <LegendLine color={GlobalStyles.colors.blue500}>Deadlift</LegendLine>
      </View> */}
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
    height: 320,
    width: 300,
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
    marginTop: -23,
  },
});
