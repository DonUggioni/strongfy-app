import React from 'react';
import { SectionList, StyleSheet, View } from 'react-native';
import { GlobalStyles } from '../constants/styles';
import Exercise from './exercises/Exercise';
import Button from './UI/buttons/Button';
import Title from './UI/text/Title';
import useAppContext from '../store/AppContext';

function PreviewModal({ navigation }) {
  const {
    workoutPreviewData,
    workoutPreviewTitle,
    setCurrentWorkout,
    filteredWorkouts,
  } = useAppContext();

  const workout = workoutPreviewData.flatMap((item) => item.workout);
  const [relatedId] = workoutPreviewData.flatMap((item) => item.relatesTo);

  function DayOfWeek({ day }) {
    return <Title style={styles.workoutDay}>{day}</Title>;
  }

  function selectHandler() {
    setCurrentWorkout(filteredWorkouts.filter((item) => item.id === relatedId));
    navigation.navigate('WorkoutsScreen');
  }

  return (
    <View style={styles.rootContainer}>
      <View style={styles.headerContainer}>
        <Title style={styles.header}>{workoutPreviewTitle}</Title>
        <Button type='full' onPress={() => selectHandler()}>
          Select
        </Button>
      </View>
      <SectionList
        sections={workout}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => (
          <Exercise
            exerciseName={item.exercise}
            title={item.title}
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
    marginTop: 12,
    paddingLeft: 4,
    color: GlobalStyles.colors.accent500,
  },
});
