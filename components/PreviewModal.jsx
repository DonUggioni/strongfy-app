import React, { useState } from 'react';
import { SectionList, StyleSheet, View } from 'react-native';
import { GlobalStyles } from '../constants/styles';
import Exercise from './exercises/Exercise';
import Button from './UI/buttons/Button';
import Title from './UI/text/Title';
import { WORKOUT_DATA } from '../data/Data';

function PreviewModal() {
  const [workoutPreviewData, setWorkoutPreviewData] = useState({});
  const filteredWorkouts = WORKOUT_DATA.filter(
    (item) => item.type === 'hypertrophy'
  );

  const workout = filteredWorkouts
    .flatMap((item) => item.workouts)
    .flatMap((item) => item.workout);

  function DayOfWeek({ day }) {
    return <Title style={styles.workoutDay}>{day}</Title>;
  }

  return (
    <View style={styles.rootContainer}>
      <View style={styles.headerContainer}>
        <Title style={styles.header}>Workout 1</Title>
        <Button type='full'>Select</Button>
      </View>
      <SectionList
        sections={workout}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => (
          <Exercise
            exerciseName={item.name}
            sets={item.sets}
            reps={item.reps}
            rpe={item.rpe}
            weight={item.weight}
          />
        )}
        renderSectionHeader={({ section }) => <DayOfWeek day={section.day} />}
        stickySectionHeadersEnabled={false}
      />
    </View>
  );
}

export default PreviewModal;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.background,
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
  workoutDataContainer: {
    padding: 24,
  },
  workoutDay: {
    textAlign: 'left',
    fontFamily: 'open-sans-semi-bold',
  },
});
