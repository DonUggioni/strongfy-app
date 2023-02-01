import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { GlobalStyles } from '../constants/styles';
import useAppContext from '../store/AppContext';
import Exercise from './exercises/Exercise';
import Button from './UI/buttons/Button';

function WorkoutOfTheDay({ navigation }) {
  const {
    workoutOfTheDay,
    calcBackdown,
    updateWorkoutDataInFirestore,
    setCurrentWorkout,
    currentWorkout,
    currentWorkoutId,
  } = useAppContext();
  const [weight, setWeight] = useState(null);

  const workout = workoutOfTheDay?.flatMap((item) => item.data);
  const [day] = workoutOfTheDay?.flatMap((item) => item.day);
  const currentDayIndex = currentWorkout
    ?.flatMap((item) => item.workouts)
    .flatMap((item) => item.workout)
    .findIndex((item) => item.day === day);

  useEffect(() => {
    navigation.setOptions({
      title: day,
    });
  }, []);

  function workoutDoneHandler() {
    setCurrentWorkout((draft) => {
      draft[0].workouts[0].workout[currentDayIndex].isComplete = true;
    });
    updateWorkoutDataInFirestore();
    navigation.navigate('WorkoutsScreen');
  }

  function updateWeight(currentExercise) {
    const index = workout.findIndex(
      (item) => item.exercise === currentExercise.exercise
    );
    calcBackdown(+weight, currentExercise.exercise);

    setCurrentWorkout((draft) => {
      draft[0].workouts[0].workout[currentDayIndex].data[index].weight = weight;
      draft[0].workouts[0].workout[currentDayIndex].data[index].backdownWeight =
        weight;
    });
  }

  return (
    <View style={styles.rootContainer}>
      <View style={styles.listContainer}>
        <FlatList
          data={workout}
          keyExtractor={(item, index) => index}
          renderItem={({ item }) => (
            <Exercise
              exerciseName={item.exercise}
              title={item.title}
              sets={item.sets}
              reps={item.reps}
              rpe={item.rpe}
              // value={item.weight}
              weight={item.weight}
              onBlur={(index) => updateWeight(item, index)}
              onChangeText={(text) => setWeight(text)}
            />
          )}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button type={'full'} onPress={workoutDoneHandler}>
          Done!
        </Button>
      </View>
    </View>
  );
}

export default WorkoutOfTheDay;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  titleContainer: {
    paddingVertical: 24,
    paddingHorizontal: 20,
    borderBottomWidth: 2,
    borderColor: GlobalStyles.colors.gray500,
  },
  title: {
    textAlign: 'left',
    fontSize: 24,
    fontFamily: 'open-sans-semi-bold',
  },
  buttonContainer: {
    width: '30%',
    alignSelf: 'flex-end',
    marginTop: 30,
    marginRight: 20,
  },
  listContainer: {
    maxHeight: '85%',
  },
});
