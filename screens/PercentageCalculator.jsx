import { StyleSheet, View, ScrollView } from 'react-native';
import React, { useState } from 'react';
import PercentageOutput from '../components/PercentageOutput';
import StyledText from '../components/UI/text/StyledText';
import StyledInput from '../components/UI/text/StyledInput';
import Title from '../components/UI/text/Title';
import calculatePercentage from '../utils/calcPercentage';

const percentages = [100, 95, 90, 85, 80, 75, 70, 65, 60, 55, 50];

const PercentageCalculator = () => {
  const [weight, setWeight] = useState(0);

  return (
    <View style={styles.rootContainer}>
      <View style={styles.inputContainer}>
        <StyledText style={styles.text}>Weight</StyledText>
        <StyledInput
          style={styles.inputStyle}
          onChangeText={(text) => setWeight(text)}
          keyboardType='decimal-pad'
          returnKeyType={'done'}
        />
      </View>
      <Title style={styles.title}>Your percentages of 1RM</Title>
      <ScrollView>
        {percentages.map((item) => {
          return (
            <PercentageOutput
              percentage={item}
              weight={calculatePercentage(weight, item)}
              key={item}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

export default PercentageCalculator;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
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
    fontSize: 22,
    marginVertical: 24,
  },
  text: {
    textAlign: 'center',
    marginLeft: 10,
  },
});
