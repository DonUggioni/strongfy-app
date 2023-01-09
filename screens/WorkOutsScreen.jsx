import React, { useState } from 'react';
import { Text, View } from 'react-native';
import NoWorkouts from '../components/NoWorkouts';

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
    <View>
      <Text>Workouts screen</Text>
    </View>
  );
}

export default WorkOutsScreen;
