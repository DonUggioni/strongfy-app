import { StyleSheet, View } from 'react-native';
import React from 'react';
import StyledText from './UI/text/StyledText';
import StyledInput from './UI/text/StyledInput';
import Title from './UI/text/Title';

function RepMaxCalculatorInputs({ onChangeWeight, onChangeReps }) {
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.inputContainer}>
          <StyledText style={styles.text}>Weight</StyledText>
          <StyledInput
            style={styles.inputStyle}
            onChangeText={onChangeWeight}
            keyboardType='decimal-pad'
          />
        </View>
        <View style={styles.inputContainer}>
          <StyledText style={styles.text}>Reps</StyledText>
          <StyledInput
            style={styles.inputStyle}
            onChangeText={onChangeReps}
            keyboardType='decimal-pad'
          />
        </View>
      </View>
      <Title style={styles.title}>Your estimated max reps</Title>
    </View>
  );
}

export default RepMaxCalculatorInputs;

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginBottom: 24,
  },
  inputContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputStyle: {
    width: 120,
  },
  title: {
    fontFamily: 'open-sans-semi-bold',
    fontSize: 26,
  },
  text: {
    textAlign: 'center',
    marginLeft: 10,
  },
});
