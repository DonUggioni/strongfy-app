import React, { useEffect } from 'react';
import { Button, FlatList, StyleSheet, View } from 'react-native';
import SelectWorkout from '../components/SelectWorkout';
import FlatButton from '../components/UI/buttons/FlatButton';
import { GlobalStyles } from '../constants/styles';
import { WORKOUT_DATA } from '../data/Data';

function WorkoutSelection({ navigation }) {
  const filteredWorkouts = WORKOUT_DATA.filter(
    (item) => item.type === 'strength'
  );
  filteredWorkouts
    .flatMap((item) => item.workouts)
    .flatMap((item) => item.workout);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <FlatButton
          style={styles.headerButton}
          onPress={() => navigation.replace('WorkoutsScreen')}
        >
          Cancel
        </FlatButton>
      ),
    });
  }, []);

  function previewHandler(item) {
    navigation.navigate('PreviewModal');
  }

  function selectWorkoutHandler() {
    navigation.replace('WorkoutsScreen');
  }

  return (
    <View style={styles.rootContainer}>
      <FlatList
        data={WORKOUT_DATA}
        renderItem={({ item }) => (
          <SelectWorkout
            name={item.title}
            onSelect={selectWorkoutHandler}
            onShowPreview={() => previewHandler(item)}
          />
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

export default WorkoutSelection;

const styles = StyleSheet.create({
  rootContainer: {
    backgroundColor: GlobalStyles.colors.background,
    flex: 1,
  },
  headerButton: {
    textDecorationLine: 'none',
    marginRight: 24,
    fontSize: 16,
    fontFamily: 'open-sans-semi-bold',
  },
});
