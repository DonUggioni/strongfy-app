import React, { useEffect, useState } from 'react';
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
}) {
  const { backdownWeightCalc } = useAppContext();
  const isPrimary =
    exerciseName === 'bench press' ||
    exerciseName === 'squat' ||
    exerciseName === 'deadlift';

  const primaryExercise = (
    <View style={styles.innerContainer}>
      <View style={styles.setsContainer}>
        <Title style={styles.title}>{title} - </Title>
        <StyledText>
          {sets} x {reps} @ {rpe}RPE
        </StyledText>
        {!weight && (
          <StyledInput
            keyboardType={'decimal-pad'}
            onChangeText={onChangeText}
            onBlur={onBlur}
            value={value}
          />
        )}
        <StyledText style={styles.weightText}> - {weight}kg</StyledText>
      </View>
      <View style={styles.setsContainer}>
        <Title style={styles.title}>Backdown Sets - </Title>
        {backdownWeightCalc && (
          <StyledText>
            {sets} x {reps} @{' '}
            {`${backdownWeightCalc.min} - ${backdownWeightCalc.max}`}kg
          </StyledText>
        )}
      </View>
    </View>
  );

  const secondaryExercise = (
    <View style={styles.innerContainer}>
      <View style={styles.setsContainer}>
        <Title style={styles.title}>{title} - </Title>
        <StyledText>
          {sets} x {reps} @
        </StyledText>
        {!weight && (
          <StyledInput
            keyboardType={'decimal-pad'}
            value={value}
            onChangeText={onChangeText}
            onBlur={onBlur}
          />
        )}
        <StyledText style={styles.weightText}> - {weight}kg</StyledText>
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
  weightText: {
    color: GlobalStyles.colors.accent500,
  },
});
