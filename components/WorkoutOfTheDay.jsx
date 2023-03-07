import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { View, StyleSheet, FlatList } from 'react-native';
import { GlobalStyles } from '../constants/styles';
import useAppContext from '../store/AppContext';
import Exercise from './exercises/Exercise';
import Button from './UI/buttons/Button';

function WorkoutOfTheDay({ navigation }) {
  const {
    workoutOfTheDay,
    workoutOfTheWeek,
    calcBackdown,
    updateWorkoutDataInFirestore,
    setCurrentWorkout,
    currentWorkout,
    backdownWeightCalc,
    setBackdownWeightCalc,
    currentWeekIndex,
    update1RMTrackerValues,
    update1RMTrackerValuesToDB,
    updateNumberOfCompletedWorkouts,
  } = useAppContext();
  const [weight, setWeight] = useState(null);

  const workout = workoutOfTheDay?.flatMap((item) => item.data);
  const [day] = workoutOfTheDay?.flatMap((item) => item.day);
  const currentDayIndex = currentWorkout
    ?.flatMap((item) => item.workouts)
    .flatMap((item) => item.workout)
    .findIndex((item) => item.day === day);
  const [isComplete] = workoutOfTheDay.map((item) => item.isComplete);
  const [weekNumber] = workoutOfTheWeek?.flatMap((item) => item.week);

  useEffect(() => {
    navigation.setOptions({
      title: day,
    });
  }, []);

  function calcDeloadWeights(weight) {
    if (weekNumber === 3) {
      const minPerc = +weight / 2;
      const maxPerc = +weight / 2.5;
      const backdown = {
        min: +weight - minPerc.toFixed(1),
        max: +weight - maxPerc.toFixed(1),
      };
      return backdown;
    } else {
      return 0;
    }
  }

  function workoutDoneHandler() {
    setCurrentWorkout((draft) => {
      draft[0].workouts[currentWeekIndex].workout[
        currentDayIndex
      ].isComplete = true;
    });
    update1RMTrackerValuesToDB();
    updateWorkoutDataInFirestore();
    setBackdownWeightCalc(null);
    updateNumberOfCompletedWorkouts();

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
    // console.log(calcDeloadWeights(weight));

    setCurrentWorkout((draft) => {
      draft[0].workouts[currentWeekIndex].workout[currentDayIndex].data[
        exerciseIndex
      ].weight = weight;

      draft[0].workouts[currentWeekIndex].workout[
        currentDayIndex
      ].data[0].backdownWeight = backdownWeightCalc;

      draft[0].workouts[3].workout[currentDayIndex].data[
        exerciseIndex
      ].weight = `${calcDeloadWeights(weight).min} - ${
        calcDeloadWeights(weight).max
      }`;
    });
  }

  return (
    <ScrollView>
      <View style={styles.rootContainer}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <View style={styles.listContainer}>
            {workout.map((item, index) => {
              return (
                <Exercise
                  key={index}
                  exerciseName={item.exercise}
                  title={item.title}
                  sets={item.sets}
                  reps={item.reps}
                  rpe={item.rpe}
                  backdownSets={item.backdownSets}
                  backdownWeight={item.backdownWeight}
                  weight={item.weight}
                  onBlur={() => updateWeight(item)}
                  onChangeText={(text) => setWeight(text)}
                />
              );
            })}
          </View>
        </KeyboardAvoidingView>
        {!isComplete && (
          <View style={styles.buttonContainer}>
            <Button type={'full'} onPress={workoutDoneHandler}>
              Done!
            </Button>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

export default WorkoutOfTheDay;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    paddingVertical: 16,
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
    maxHeight: '100%',
    width: '100%',
  },
});
