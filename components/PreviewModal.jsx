import React from 'react';
import { StyleSheet, View } from 'react-native';
import { GlobalStyles } from '../constants/styles';
import Exercise from './exercises/Exercise';

function PreviewModal() {
  return (
    <View style={styles.rootContainer}>
      <Exercise exerciseName='Bench Press' />
      <Exercise />
    </View>
  );
}

export default PreviewModal;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.background,
  },
});
