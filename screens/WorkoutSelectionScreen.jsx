import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import SelectWorkout from '../components/SelectWorkout';
import { GlobalStyles } from '../constants/styles';
import { WORKOUT_DATA } from '../data/Data';

function WorkoutSelectionScreen({ navigation }) {
  const filteredWorkouts = WORKOUT_DATA.filter(
    (item) => item.type === 'hypertrophy'
  );
  filteredWorkouts
    .flatMap((item) => item.workouts)
    .flatMap((item) => item.workout);

  function previewHandler(item) {
    navigation.navigate('PreviewModal');
  }

  function selectHandler() {
    navigation.replace('WorkoutsScreen');
  }

  return (
    <View style={styles.rootContainer}>
      <FlatList
        data={WORKOUT_DATA}
        renderItem={({ item }) => (
          <SelectWorkout
            name={item.title}
            onSelect={selectHandler}
            onShowPreview={() => previewHandler(item)}
          />
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

export default WorkoutSelectionScreen;

const styles = StyleSheet.create({
  rootContainer: {
    backgroundColor: GlobalStyles.colors.background,
    flex: 1,
  },
});
