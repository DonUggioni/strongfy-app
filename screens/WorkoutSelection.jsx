import React, { useEffect } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import SelectWorkout from '../components/SelectWorkout';
import FlatButton from '../components/UI/buttons/FlatButton';
import { GlobalStyles } from '../constants/styles';
import useAppContext from '../store/AppContext';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';

function WorkoutSelection({ navigation }) {
  const {
    filteredWorkouts,
    previewWorkoutHandler,
    setWorkoutPreviewTitle,
    setCurrentWorkout,
    currentWorkout,
    userIsAuthenticated,
  } = useAppContext();

  // useEffect(() => {
  //   const docRef = doc(db, 'users', userIsAuthenticated.uid);
  //   async function addCurrentWorkoutToDataBase() {
  //     await setDoc(docRef, 'CurrentWorkout', currentWorkout, { merge: true });
  //   }
  //   addCurrentWorkoutToDataBase();
  // }, [currentWorkout]);

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
    setCurrentWorkout([item]);
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
