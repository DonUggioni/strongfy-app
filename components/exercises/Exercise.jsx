import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { GlobalStyles } from '../../constants/styles';
import StyledText from '../UI/text/StyledText';
import Title from '../UI/text/Title';
import StyledInput from '../UI/text/StyledInput';

function Exercise({ exerciseName, sets, reps, rpe, value }) {
  const [backdownWeightCalc, setBackdownWeightCalc] = useState(0);
  const [backdownWeight, setBackdownWeight] = useState(0);

  const isPrimary =
    exerciseName === 'Bench Press' ||
    exerciseName === 'Squat' ||
    exerciseName === 'Deadlift';

  function calcBackdown(num) {
    const backdown = num - 30;
    setBackdownWeightCalc(backdown);
  }

  const primaryExercise = (
    <View style={styles.innerContainer}>
      <View style={styles.setsContainer}>
        <Title style={styles.title}>{exerciseName} - </Title>
        <StyledText>
          {sets} x {reps} @ {rpe}RPE
        </StyledText>
        <StyledInput
          keyboardType={'decimal-pad'}
          onChangeText={(text) => setBackdownWeight(Number(text))}
          onEndEditing={() => calcBackdown(backdownWeight)}
          value={value}
        />
        <StyledText>kg</StyledText>
      </View>
      <View style={styles.setsContainer}>
        <Title style={styles.title}>Backdown Sets - </Title>
        <StyledText>
          {sets} x {reps} @ {backdownWeightCalc}kg
        </StyledText>
      </View>
    </View>
  );

  const secondaryExercise = (
    <View style={styles.innerContainer}>
      <View style={styles.setsContainer}>
        <Title style={styles.title}>{exerciseName} - </Title>
        <StyledText>
          {sets} x {reps} @
        </StyledText>
        <StyledInput keyboardType={'decil-pad'} value={value} />
        <StyledText>kg</StyledText>
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
