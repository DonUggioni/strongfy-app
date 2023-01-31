import { StyleSheet, View } from 'react-native';
import React from 'react';
import StyledText from './UI/text/StyledText';
import StyledInput from './UI/text/StyledInput';
import Button from './UI/buttons/Button';

function RepMaxCalculatorInputs({ onChangeWeight, onChangeReps, onPress }) {
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.inputContainer}>
          <StyledText>Weight</StyledText>
          <StyledInput
            style={styles.inputStyle}
            onChangeText={onChangeWeight}
            keyboardType='decimal-pad'
          />
        </View>
        <View style={styles.inputContainer}>
          <StyledText>Reps</StyledText>
          <StyledInput
            style={styles.inputStyle}
            onChangeText={onChangeReps}
            keyboardType='decimal-pad'
          />
        </View>
      </View>
      <Button type={'full'} onPress={onPress}>
        Calculate
      </Button>
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
});
