import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { GlobalStyles } from '../constants/styles';
import BlockOptionsModal from './BlockOptionsModal';
import Button from './UI/buttons/Button';
import StyledText from './UI/text/StyledText';

function NoWorkouts() {
  const [modalIsVisible, setModalIsVisible] = useState(false);

  function modalHandler() {
    setModalIsVisible(() => !modalIsVisible);
  }
  return (
    <>
      <View style={styles.rootContainer}>
        <StyledText>No workouts have been created yet!</StyledText>
        <Button type={'full'} onPress={modalHandler}>
          Create a workout
        </Button>
      </View>
      <BlockOptionsModal onCancel={modalHandler} visible={modalIsVisible} />
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
