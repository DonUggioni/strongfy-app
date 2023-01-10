import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import NoWorkouts from '../components/NoWorkouts';
import { GlobalStyles } from '../constants/styles';

const data = [
  {
    title: 'workout 1',
  },
  {
    title: 'workout 2',
  },
];

function WorkOutsScreen() {
  const [workouts, setWorkouts] = useState(false);

  if (!workouts) {
    return <NoWorkouts />;
  }

  return (
    <View style={styles.rootContainer}>
      <Text>Workouts screen</Text>
    </View>
  );
}

export default WorkOutsScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.background,
  },
});
