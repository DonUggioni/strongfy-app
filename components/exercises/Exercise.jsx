import React from 'react';
import { StyleSheet, View } from 'react-native';
import { GlobalStyles } from '../../constants/styles';
import StyledText from '../UI/text/StyledText';
import Title from '../UI/text/Title';

function Exercise({ exerciseName, sets, reps, rpe, weight }) {
  const isPrimary =
    exerciseName === 'Bench Press' ||
    exerciseName === 'Squat' ||
    exerciseName === 'Deadlift';

  const primaryExercise = (
    <View style={styles.innerContainer}>
      <View style={styles.setsContainer}>
        <Title style={styles.title}>{exerciseName} - </Title>
        <StyledText>
          {sets} x {reps} @ {rpe}RPE
        </StyledText>
      </View>
      <View style={styles.setsContainer}>
        <Title style={styles.title}>Backdown Sets - </Title>
        <StyledText>
          {sets} x {reps} @ {weight}kg
        </StyledText>
      </View>
    </View>
  );

  const secondaryExercise = (
    <View style={styles.innerContainer}>
      <View style={styles.setsContainer}>
        <Title style={styles.title}>{exerciseName} - </Title>
        <StyledText>
          {sets} x {reps} @ {weight}kg
        </StyledText>
      </View>
    </View>
  );

  return (
    <View style={styles.rootContainer}>
      {isPrimary ? primaryExercise : secondaryExercise}
    </View>
  );
}

export default Exercise;

const styles = StyleSheet.create({
  rootContainer: {
    backgroundColor: GlobalStyles.colors.background,
  },
  innerContainer: {
    padding: 14,
    borderBottomWidth: 2,
    borderBottomColor: GlobalStyles.colors.gray500,
  },
  title: {
    textAlign: 'left',
    fontFamily: 'open-sans-semi-bold',
  },
  setsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
