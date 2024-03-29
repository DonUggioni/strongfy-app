import React from 'react';
import { StyleSheet, View } from 'react-native';
import Title from './UI/text/Title';
import Selector from './selector/Selector';
import { GlobalStyles } from '../constants/styles';
import useAppContext from '../store/AppContext';

function SelectDay({ navigation }) {
  const { setWorkoutOfTheDay, workoutOfTheWeek } = useAppContext();
  const days = workoutOfTheWeek?.flatMap((item) => item.workout);
  const [weekNumber] = workoutOfTheWeek?.flatMap((item) => item.week);

  function selectDayHandler(workout) {
    setWorkoutOfTheDay(days.filter((item) => item.id === workout.id));
    navigation.navigate('WorkoutOfTheDay');
  }

  return (
    <View style={styles.rootContainer}>
      <View style={styles.titleContainer}>
        <Title style={styles.title}>Week {weekNumber}</Title>
      </View>
      {days.map((item, index) => {
        return (
          <View style={styles.daysContainer} key={index}>
            <Selector
              titleStyle={
                !item.isComplete ? styles.subtitle : styles.isCompleted
              }
              iconName='chevron-forward-outline'
              iconSize={30}
              iconColor={
                !item.isComplete ? 'white' : GlobalStyles.colors.gray300
              }
              onPress={() => selectDayHandler(item)}
            >
              {item.day}
            </Selector>
          </View>
        );
      })}
    </View>
  );
}

export default SelectDay;

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
    letterSpacing: 0.5,
  },
  daysContainer: {
    paddingVertical: 28,
    paddingHorizontal: 40,
    borderBottomWidth: 2,
    borderColor: GlobalStyles.colors.gray500,
  },
  subtitle: {
    fontSize: 20,
  },
  isCompleted: {
    fontSize: 20,
    color: GlobalStyles.colors.gray300,
  },
});
