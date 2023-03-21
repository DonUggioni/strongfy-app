import React, { useEffect } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import SelectWorkout from '../components/SelectWorkout';
import FlatButton from '../components/UI/buttons/FlatButton';
import useAppContext from '../store/AppContext';
import { doc, collection } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';

function WorkoutSelection({ navigation }) {
  const {
    filteredWorkouts,
    previewWorkoutHandler,
    setWorkoutPreviewTitle,
    setCurrentWorkout,
    userIsAuthenticated,
    addCurrentWorkoutToDataBase,
    getCurrentWorkoutId,
  } = useAppContext();

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

  const id = filteredWorkouts
    .flatMap((item) => item.workouts)
    .flatMap((item) => item.id);

  function previewHandler(item) {
    previewWorkoutHandler(id[0]);
    setWorkoutPreviewTitle(item.title);
    navigation.navigate('PreviewModal');
  }

  function selectWorkoutHandler(item) {
    const currentWorkoutRef = doc(
      collection(db, 'users', userIsAuthenticated.uid, 'CurrentWorkout')
    );

    setCurrentWorkout([item]);
    addCurrentWorkoutToDataBase(currentWorkoutRef, item);
    getCurrentWorkoutId();
    navigation.navigate('WorkoutsScreen');
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
    flex: 1,
  },
  headerButton: {
    textDecorationLine: 'none',
    marginRight: 24,
    fontSize: 16,
    fontFamily: 'open-sans-semi-bold',
  },
});
