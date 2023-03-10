import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import NoWorkouts from '../components/NoWorkouts';
import FlatButton from '../components/UI/buttons/FlatButton';
import { Ionicons } from '@expo/vector-icons';
import SelectWeek from '../components/SelectWeek';
import useAppContext from '../store/AppContext';

function WorkoutsScreen({ navigation }) {
  const { currentWorkout, setWorkoutOfTheWeek, setCurrentWeekIndex } =
    useAppContext();

  const weekNumber = currentWorkout?.flatMap((item) => item.workouts);

  function addButtonHandler() {
    navigation.navigate('SelectPhase');
  }

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <FlatButton style={styles.headerButton} onPress={addButtonHandler}>
          <Ionicons name='add-outline' size={34} color='white' />
        </FlatButton>
      ),
    });
  }, []);

  function selectDayHandler(id, index) {
    setWorkoutOfTheWeek(weekNumber.filter((item) => item.id === id.id));
    setCurrentWeekIndex(index);
    navigation.navigate('SelectDay');
  }

  if (currentWorkout.length === 0) {
    return <NoWorkouts />;
  }

  return (
    <View style={styles.rootContainer}>
      {weekNumber?.map((item, index) => (
        <SelectWeek
          week={`Week ${item.week}`}
          key={index}
          onPress={() => selectDayHandler(item, index)}
        />
      ))}
    </View>
  );
}

export default WorkoutsScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  headerButton: {
    textDecorationLine: 'none',
    marginRight: 24,
    marginVertical: 0,
    fontSize: 16,
    fontFamily: 'open-sans-semi-bold',
  },
});
