import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import NoWorkouts from '../components/NoWorkouts';
import FlatButton from '../components/UI/buttons/FlatButton';
import { GlobalStyles } from '../constants/styles';
import { Ionicons } from '@expo/vector-icons';
import useAppContext from '../store/AppContext';

function WorkoutsScreen({ navigation }) {
  const { trainingPhaseModalHandler } = useAppContext();
  const [workouts, setWorkouts] = useState([]);

  function addButtonHandler() {
    trainingPhaseModalHandler();
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

  if (workouts.length === 0) {
    return <NoWorkouts />;
  }

  return (
    <View style={styles.rootContainer}>
      <Text>Workouts screen</Text>
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
