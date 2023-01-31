import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import RepMaxCalculatorInputs from '../components/RepMaxCalculatorInputs';
import RepMaxOutput from '../components/RepMaxOutput';
import { GlobalStyles } from '../constants/styles';

const outputData = [
  { repNumber: 1, weight: null },
  { repNumber: 2, weight: null },
  { repNumber: 3, weight: null },
  { repNumber: 4, weight: null },
  { repNumber: 5, weight: null },
  { repNumber: 6, weight: null },
  { repNumber: 7, weight: null },
  { repNumber: 8, weight: null },
  { repNumber: 9, weight: null },
  { repNumber: 10, weight: null },
];

const repMaxPercentages = [100, 94, 91, 88, 86, 83, 81, 79, 77, 75];

function RepMaxCalculator() {
  const [weight, setWeight] = useState(null);
  const [reps, setReps] = useState(null);

  function calcRepMax(weight, reps, perc) {
    const totalWeight = weight * (1 + reps / 30);
    const percentage = totalWeight / perc;
    const max = totalWeight - percentage;
    return percentage.toFixed(2);
  }

  function submitHandler() {}
  return (
    <View style={styles.rootContainer}>
      <RepMaxCalculatorInputs
        onChangeWeight={(text) => setWeight(text)}
        onChangeReps={(text) => setReps(text)}
        onPress={submitHandler}
      />
      <ScrollView>
        {repMaxPercentages.map((item, index) => {
          return (
            <RepMaxOutput
              reps={index + 1}
              weight={calcRepMax(weight, reps, item)}
              key={item + index}
            />
          );
        })}
      </ScrollView>
    </View>
  );
}

export default RepMaxCalculator;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.background,
  },
});
