import { StyleSheet, View } from 'react-native';
import React from 'react';
import StyledText from './UI/text/StyledText';
import Title from './UI/text/Title';
import { GlobalStyles } from '../constants/styles';

function RepMaxOutput({ reps, weight }) {
  return (
    <View style={styles.rootContainer}>
      <View style={styles.innerContainer}>
        <Title style={styles.title}>{reps}RM</Title>
        <StyledText style={styles.weightText}>
          {weight}
          <StyledText style={styles.span}>kg</StyledText>
        </StyledText>
      </View>
    </View>
  );
}

export default RepMaxOutput;

const styles = StyleSheet.create({
  rootContainer: {
    borderBottomWidth: 0.5,
    borderColor: GlobalStyles.colors.gray300,
  },
  innerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 42,
  },
  title: {
    textAlign: 'left',
    fontFamily: 'open-sans-semi-bold',
    fontSize: 16,
  },
  weightText: {
    color: GlobalStyles.colors.accent500,
    fontSize: 16,
  },
  span: {
    color: GlobalStyles.colors.accent500,
    fontSize: 13,
  },
});
