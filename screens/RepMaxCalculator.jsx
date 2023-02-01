import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import RepMaxCalculatorInputs from '../components/RepMaxCalculatorInputs';
import RepMaxOutput from '../components/RepMaxOutput';
import { GlobalStyles } from '../constants/styles';

const repMaxPercentages = [
  100, 94.15, 91.7, 89.5, 87.5, 85.7, 84, 82.6, 81, 80,
];

function RepMaxCalculator() {
  const [weight, setWeight] = useState(null);
  const [reps, setReps] = useState(null);

  function calcRepMax(weight, reps, perc) {
    const totalWeight = weight * (1 + reps / 30);
    const percentage = (totalWeight / perc) * 100;
    const max = percentage - totalWeight;
    return (totalWeight - max).toFixed(1);
  }

  return (
    <View style={styles.rootContainer}>
      <RepMaxCalculatorInputs
        onChangeWeight={(text) => setWeight(text)}
        onChangeReps={(text) => setReps(text)}
      />
      <ScrollView>
        {repMaxPercentages.map((item, index) => {
          return (
            <RepMaxOutput
              reps={index + 1}
              weight={calcRepMax(weight, reps, item)}
              key={index}
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
  },
});
