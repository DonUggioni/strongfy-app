import React from 'react';
import { StyleSheet, View } from 'react-native';
import { GlobalStyles } from '../../constants/styles';
import StyledText from '../UI/text/StyledText';
import Title from '../UI/text/Title';
import StyledInput from '../UI/text/StyledInput';
import useAppContext from '../../store/AppContext';

function Exercise({
  exerciseName,
  title,
  sets,
  reps,
  rpe,
  value,
  onChangeText,
  onBlur,
  weight,
  backdownWeight,
  backdownSets,
  lastSessionWeight,
}) {
  const { backdownWeightCalc } = useAppContext();

  const backdown = backdownWeight ? backdownWeight : backdownWeightCalc;

  const isPrimary =
    exerciseName === 'bench' ||
    exerciseName === 'squat' ||
    exerciseName === 'deadlift';

  const primaryExercise = (
    <View style={styles.innerContainer}>
      <Title style={styles.title}>{title}</Title>
      <View style={styles.setsContainer}>
        <StyledText>
          {sets} x {reps} @ {rpe}RPE
        </StyledText>
        {!weight && (
          <StyledInput
            keyboardType={'decimal-pad'}
            onChangeText={onChangeText}
            onBlur={onBlur}
            value={value}
            returnKeyType={'done'}
          />
        )}
        <StyledText style={styles.weightText}> {weight}kg</StyledText>
      </View>

      <Title style={styles.title}>Backdown Sets</Title>
      <View style={styles.setsContainer}>
        <StyledText>
          {backdownSets} x {reps} @{' '}
          {backdown && `${backdown.min}kg - ${backdown.max}kg`}
        </StyledText>
      </View>
      {lastSessionWeight && (
        <StyledText style={styles.lastSessionText}>
          Last session - {lastSessionWeight}kg
        </StyledText>
      )}
    </View>
  );

  const secondaryExercise = (
    <View style={styles.innerContainer}>
      <Title style={styles.title}>{title}</Title>
      <View style={styles.setsContainer}>
        <View>
          <StyledText>
            {sets} x {reps} @
          </StyledText>
        </View>
        {!weight && (
          <StyledInput
            keyboardType={'decimal-pad'}
            value={value}
            onChangeText={onChangeText}
            onBlur={onBlur}
            returnKeyType={'done'}
          />
        )}
        <StyledText style={styles.weightText}> {weight}kg</StyledText>
      </View>
      {lastSessionWeight && (
        <StyledText style={styles.lastSessionText}>
          Last session - {lastSessionWeight}kg
        </StyledText>
      )}
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
    paddingVertical: 10,
    paddingHorizontal: 18,
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
  weightText: {
    color: GlobalStyles.colors.accent500,
  },
  backdownSetsText: {
    marginVertical: 6,
  },
  lastSessionText: {
    color: GlobalStyles.colors.primary300,
    fontSize: 15,
    opacity: 0.8,
  },
});
