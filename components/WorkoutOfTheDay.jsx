import React, { useEffect, useState } from 'react';
import { Alert, Keyboard, ScrollView } from 'react-native';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { View, StyleSheet } from 'react-native';
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
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [emptyFieldCheck, setEmptyFieldCheck] = useState([]);

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

  // Listens if keyboard is open or closed
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      }
    );

    const currentExerciseWeights = workoutOfTheDay
      .flatMap((workouts) => workouts.data)
      .map((exer) => exer.weight);

    const weightsArr = [];
    // Gets total inputs for the current workout
    currentExerciseWeights.forEach((weight) => weightsArr.push(weight));
    setEmptyFieldCheck(weightsArr);

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  // This function updates the emptyFieldCheck state, which takes in the total number of weight inputs for the current workout and updates the weight for each input so I can check if all inputs are filled in before updating to the database.
  function updateEmptyFields(index) {
    const update = emptyFieldCheck.map((curr, i) => {
      if (index === i) {
        return (curr = weight);
      } else {
        return curr;
      }
    });

    setEmptyFieldCheck(update);
  }

  // Calculates the deload weights based off of the 3rd week weights
  function calcDeloadWeights(weight, index) {
    if (weekNumber !== 3) return;

    const minPerc = +weight / 2;
    const maxPerc = +weight / 3;
    const deload = {
      min: +weight - minPerc.toFixed(1),
      max: +weight - maxPerc.toFixed(1),
    };

    setCurrentWorkout((draft) => {
      draft[0].workouts[3].workout[currentDayIndex].data[
        index
      ].weight = `${deload.min} - ${deload.max}`;
    });
  }

  // Handles Done button function calls
  function workoutDoneHandler() {
    const noEmptyFields = emptyFieldCheck.every((weight) => weight !== '');

    if (!noEmptyFields) {
      return Alert.alert('Wait!', 'Make sure you have all weights filled in.');
    }

    setCurrentWorkout((draft) => {
      draft[0].workouts[currentWeekIndex].workout[
        currentDayIndex
      ].isComplete = true;
    });

    setBackdownWeightCalc(null);
    setTimeout(() => {
      update1RMTrackerValuesToDB();
      updateWorkoutDataInFirestore();
      updateNumberOfCompletedWorkouts();
    }, 2000);

    navigation.navigate('WorkoutsScreen');
  }

  // This functions checks if all inputs are filled in, if they are it sets the workout as completed so when user click the done button it updates correctly to Firebase
  function markWorkoutAsComplete() {
    const noEmptyFields = emptyFieldCheck.every((weight) => weight !== '');

    if (!noEmptyFields) {
      setCurrentWorkout((draft) => {
        draft[0].workouts[currentWeekIndex].workout[
          currentDayIndex
        ].isComplete = true;
      });
    } else {
      setCurrentWorkout((draft) => {
        draft[0].workouts[currentWeekIndex].workout[
          currentDayIndex
        ].isComplete = false;
      });
    }
  }

  // This function updates the weights the user inputs.
  function updateWeight(currentExercise, exerciseIndex) {
    updateEmptyFields(exerciseIndex);
    markWorkoutAsComplete();

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
    calcDeloadWeights(+weight, exerciseIndex);
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

  function getLastSessionWeight(exerciseIndex) {
    const data = currentWorkout?.flatMap((item) => item.workouts);

    if (currentWeekIndex === 0 || currentWeekIndex === 3) {
      return;
    }

    const weightData =
      data[currentWeekIndex - 1]?.workout[currentDayIndex]?.data[exerciseIndex]
        .weight;

    return weightData;
  }

  // Handles Done button visibility
  function buttonVisible() {
    if (!isComplete && !keyboardVisible) {
      return (
        <View style={styles.buttonContainer}>
          <Button type={'full'} onPress={workoutDoneHandler}>
            Done!
          </Button>
        </View>
      );
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.rootContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={116}
    >
      <ScrollView style={!keyboardVisible ? styles.innerContainer : ''}>
        <View style={styles.listContainer}>
          {workout.map((item, index) => {
            return (
              <Exercise
                key={item.title}
                exerciseName={item.exercise}
                title={item.title}
                sets={item.sets}
                reps={item.reps}
                rpe={item.rpe}
                backdownSets={item.backdownSets}
                backdownWeight={item.backdownWeight}
                weight={item.weight}
                onBlur={() => updateWeight(item, index)}
                onChangeText={(text) => setWeight(text)}
                lastSessionWeight={getLastSessionWeight(index)}
              />
            );
          })}
        </View>
        {buttonVisible()}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default WorkoutOfTheDay;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  innerContainer: {
    marginTop: 24,
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
    marginBottom: 24,
  },
  listContainer: {
    width: '100%',
  },
});
