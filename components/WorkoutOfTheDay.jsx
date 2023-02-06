import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView } from 'react-native';
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
    backdownWeightCalc,
    currentWeekIndex,
    update1RMTrackerValues,
    update1RMTrackerValuesToDB,
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
      draft[0].workouts[currentWeekIndex].workout[
        currentDayIndex
      ].isComplete = true;
    });
    update1RMTrackerValuesToDB();
    updateWorkoutDataInFirestore();
    navigation.navigate('WorkoutsScreen');
  }

  function updateWeight(currentExercise) {
    const exerciseIndex = workout.findIndex(
      (item) => item.exercise === currentExercise.exercise
    );

    const squat =
      currentExercise.exercise === 'squat' && currentExercise.rpe === 10;
    const bench =
      currentExercise.exercise === 'bench' && currentExercise.rpe === 10;
    const deadlift =
      currentExercise.exercise === 'deadlift' && currentExercise.rpe === 10;

    if (squat || bench || deadlift) {
      update1RMTrackerValues(
        currentExercise.exercise,
        +weight,
        currentExercise.reps
      );
    }

    calcBackdown(+weight, currentExercise.exercise);

    setCurrentWorkout((draft) => {
      draft[0].workouts[currentWeekIndex].workout[currentDayIndex].data[
        exerciseIndex
      ].weight = weight;
      draft[0].workouts[currentWeekIndex].workout[
        currentDayIndex
      ].data[0].backdownWeight = backdownWeightCalc;
    });
  }
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.rootContainer}
    >
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
              onBlur={() => updateWeight(item)}
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
    </KeyboardAvoidingView>
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
