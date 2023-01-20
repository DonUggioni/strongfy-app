import React from 'react';
import { StyleSheet, View } from 'react-native';
import { GlobalStyles } from '../constants/styles';
import Button from './UI/buttons/Button';
import StyledText from './UI/text/StyledText';
import { useNavigation } from '@react-navigation/native';
import { getTrainingData } from '../utils/fetchData';
import useAppContext from '../store/AppContext';
import LoadingScreen from './LoadingScreen';
import ErrorScreen from './ErrorScreen';

function NoWorkouts() {
  const { setTrainingData, setIsLoading, isLoading } = useAppContext();
  const navigation = useNavigation();

  async function createWorkoutHandler() {
    try {
      setIsLoading(true);
      const data = await getTrainingData();
      setTrainingData(data.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      return (
        <ErrorScreen message={'Something went wrong. Please try again.'} />
      );
    }
    navigation.navigate('SelectPhase');
  }

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <View style={styles.rootContainer}>
        <StyledText>No workouts have been created yet!</StyledText>
        <Button type={'full'} onPress={createWorkoutHandler}>
          Create a workout
        </Button>
      </View>
    </>
  );
}

export default NoWorkouts;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: GlobalStyles.colors.background,
  },
});
