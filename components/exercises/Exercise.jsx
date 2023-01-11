import React from 'react';
import { StyleSheet, View } from 'react-native';
import { GlobalStyles } from '../../constants/styles';
import Button from '../UI/buttons/Button';
import StyledText from '../UI/text/StyledText';
import Title from '../UI/text/Title';

function Exercise({ workoutName, exerciseName, sets, reps, rpe, selected }) {
  const isPrimary =
    exerciseName === 'Bench Press' ||
    exerciseName === 'Squat' ||
    exerciseName === 'Deadlift';

  if (!isPrimary) {
    return (
      <View style={styles.rootContainer}>
        <View style={styles.innerContainer}>
          <View style={styles.setsContainer}>
            <Title style={styles.title}>Incline Dumbell Press - </Title>
            <StyledText>5 x 10 @ 70kg</StyledText>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.rootContainer}>
      <View style={styles.headerContainer}>
        <Title style={styles.header}>Workout 1</Title>
        <Button type='full'>Select</Button>
      </View>
      <View style={styles.innerContainer}>
        <View style={styles.setsContainer}>
          <Title style={styles.title}>Bench Press - </Title>
          <StyledText>1 x 10 @ 8RPE</StyledText>
        </View>
        <View style={styles.setsContainer}>
          <Title style={styles.title}>Backdown Sets - </Title>
          <StyledText>5 x 10 @ 70kg</StyledText>
        </View>
      </View>
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
  headerContainer: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  header: {
    fontSize: 24,
    fontFamily: 'open-sans-bold',
    letterSpacing: 0.5,
    marginVertical: 24,
    textAlign: 'left',
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
