import React from 'react';
import { StyleSheet, View } from 'react-native';
import Button from './UI/buttons/Button';
import StyledText from './UI/text/StyledText';
import { useNavigation } from '@react-navigation/native';

function NoWorkouts() {
  const navigation = useNavigation();

  return (
    <>
      <View style={styles.rootContainer}>
        <StyledText>No workouts have been created yet!</StyledText>
        <Button
          type={'full'}
          onPress={() => navigation.navigate('SelectPhase')}
        >
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
  },
});
