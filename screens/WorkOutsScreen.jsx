import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import NoWorkouts from '../components/NoWorkouts';
import FlatButton from '../components/UI/buttons/FlatButton';
import { GlobalStyles } from '../constants/styles';
import { Ionicons } from '@expo/vector-icons';
import SelectWeek from '../components/SelectWeek';
import useAppContext from '../store/AppContext';

function WorkoutsScreen({ navigation }) {
  const { currentWorkout } = useAppContext();

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

  function selectDayHandler(item) {
    navigation.navigate('SelectDay');
  }

  if (currentWorkout.length === 0) {
    return <NoWorkouts />;
  }

  return (
    <View style={styles.rootContainer}>
      {currentWorkout.map((item, index) => (
        <SelectWeek
          week={`Week ${item.week}`}
          key={index}
          onPress={(item) => selectDayHandler(item)}
        />
      ))}
    </View>
  );
}

export default WorkoutsScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.background,
  },
  headerButton: {
    textDecorationLine: 'none',
    marginRight: 24,
    marginVertical: 0,
    fontSize: 16,
    fontFamily: 'open-sans-semi-bold',
  },
});
