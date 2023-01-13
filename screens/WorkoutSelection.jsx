import React, { useEffect } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import SelectWorkout from '../components/SelectWorkout';
import FlatButton from '../components/UI/buttons/FlatButton';
import { GlobalStyles } from '../constants/styles';
import useAppContext from '../store/AppContext';

function WorkoutSelection({ navigation }) {
  const { filteredWorkouts, previewWorkoutHandler } = useAppContext();

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <FlatButton
          style={styles.headerButton}
          onPress={() => navigation.replace('WorkoutsScreen')}
        >
          Cancel
        </FlatButton>
      ),
    });
  }, []);

  function previewHandler(item) {
    previewWorkoutHandler(item.id);
    navigation.navigate('PreviewModal');
  }

  function selectWorkoutHandler(item) {
    navigation.replace('WorkoutsScreen');
    console.log(item.id);
  }

  return (
    <View style={styles.rootContainer}>
      <FlatList
        data={filteredWorkouts}
        renderItem={({ item }) => (
          <SelectWorkout
            name={item.title}
            onSelect={() => selectWorkoutHandler(item)}
            onShowPreview={() => previewHandler(item)}
          />
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

export default WorkoutSelection;

const styles = StyleSheet.create({
  rootContainer: {
    backgroundColor: GlobalStyles.colors.background,
    flex: 1,
  },
  headerButton: {
    textDecorationLine: 'none',
    marginRight: 24,
    fontSize: 16,
    fontFamily: 'open-sans-semi-bold',
  },
});
