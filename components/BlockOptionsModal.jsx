import React, { useState } from 'react';
import { FlatList, Modal, SafeAreaView, StyleSheet, View } from 'react-native';
import { GlobalStyles } from '../constants/styles';
import Button from './UI/buttons/Button';
import SelectButton from './UI/buttons/SelectButton';
import StyledText from './UI/StyledText';

const trainingData = [
  {
    id: 't1',
    type: 'Hypertrophy',
  },
  {
    id: 't2',
    type: 'Strength',
  },
  {
    id: 't3',
    type: 'Peaking',
  },
];
const daysData = [
  {
    id: 'd1',
    days: '3 days',
  },
  {
    id: 'd2',
    days: '4 days',
  },
  {
    id: 'd3',
    days: '5 days',
  },
];

function BlockOptionsModal({ visible, onCancel }) {
  const [selectedTrainingId, setSelectedTrainingId] = useState(null);
  const [selectedDaysId, setDaysTrainingId] = useState(null);

  function trainingOptions({ item }) {
    const backgroundColor = item.id === selectedTrainingId ? 'selected' : null;

    return (
      <SelectButton
        selected={backgroundColor}
        onPress={() => setSelectedTrainingId(item.id)}
      >
        {item.type}
      </SelectButton>
    );
  }

  function daysPerWeek({ item }) {
    const backgroundColor = item.id === selectedDaysId ? 'selected' : null;

    return (
      <SelectButton
        selected={backgroundColor}
        onPress={() => setDaysTrainingId(item.id)}
      >
        {item.days}
      </SelectButton>
    );
  }

  return (
    <Modal animationType='slide' visible={visible}>
      <SafeAreaView style={styles.rootContainer}>
        <View style={styles.innerContainer}>
          <View style={styles.optionsContainer}>
            <StyledText>What's the training phase?</StyledText>
            <FlatList
              data={trainingData}
              keyExtractor={(item) => item.id}
              renderItem={trainingOptions}
              horizontal={true}
              contentContainerStyle={{
                justifyContent: 'space-between',
                flex: 1,
              }}
            />
          </View>
          <View style={styles.optionsContainer}>
            <StyledText>How many days a week?</StyledText>
            <FlatList
              data={daysData}
              keyExtractor={(item) => item.id}
              renderItem={daysPerWeek}
              horizontal={true}
              contentContainerStyle={{
                justifyContent: 'space-between',
                flex: 1,
              }}
            />
          </View>
          <View style={styles.buttonsContainer}>
            <View style={styles.buttonContainer}>
              <Button type='full'>Confirm</Button>
            </View>
            <View style={styles.buttonContainer}>
              <Button onPress={onCancel} type='flat'>
                Cancel
              </Button>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
}

export default BlockOptionsModal;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: GlobalStyles.colors.background,
  },
  innerContainer: {
    padding: 28,
  },
  optionsContainer: {
    marginBottom: 28,
  },
  buttonsContainer: {
    marginTop: 24,
  },
  buttonContainer: {
    marginBottom: 16,
  },
});
