import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import NoWorkouts from '../components/NoWorkouts';
import FlatButton from '../components/UI/buttons/FlatButton';
import { Ionicons } from '@expo/vector-icons';
import SelectWeek from '../components/SelectWeek';
import useAppContext from '../store/AppContext';
import StyledText from '../components/UI/text/StyledText';

function WorkoutsScreen({ navigation }) {
  const { currentWorkout, setWorkoutOfTheWeek, setCurrentWeekIndex } =
    useAppContext();

  const selectWeek = currentWorkout?.flatMap((item) => item.workouts);

  function addButtonHandler() {
    navigation.navigate('SelectPhase');
  }

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <FlatButton style={styles.headerButton} onPress={addButtonHandler}>
          {/* <StyledText>Create New</StyledText> */}
          <Text>Create New</Text>
          {/* <Ionicons name='add-outline' size={34} color='white' /> */}
        </FlatButton>
      ),
    });
  }, []);

  function selectDayHandler(id, index) {
    setWorkoutOfTheWeek(selectWeek.filter((item) => item.id === id.id));
    setCurrentWeekIndex(index);
    navigation.navigate('SelectDay');
  }

  function checkIfCompleted(i) {
    const completed = selectWeek[i].workout.map((item) => item.isComplete);

    const checkCompleted = completed?.every((item) => item === true);

    return checkCompleted;
  }

  if (currentWorkout.length === 0) {
    return <NoWorkouts />;
  }

  return (
    <View style={styles.rootContainer}>
      {selectWeek?.map((item, index) => (
        <SelectWeek
          week={`Week ${item.week}`}
          key={index}
          onPress={() => selectDayHandler(item, index)}
          isComplete={checkIfCompleted(index)}
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
    fontSize: 17,
    fontFamily: 'open-sans-semi-bold',
  },
});
