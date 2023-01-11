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
    value: 'hypertrophy',
  },
  {
    id: 't2',
    type: 'Strength',
    value: 'strength',
  },
  {
    id: 't3',
    type: 'Peaking',
    value: 'peaking',
  },
];
const daysData = [
  {
    id: 'd1',
    days: '3 days',
    value: 3,
  },
  {
    id: 'd2',
    days: '4 days',
    value: 4,
  },
  {
    id: 'd3',
    days: '5 days',
    value: 5,
  },
];

function BlockOptionsModal({ visible, onCancel }) {
  const [selectedTrainingData, setSelectedTrainingData] = useState({});
  const [selectedDaysData, setSelectedDaysData] = useState({});

  function trainingOptions({ item }) {
    const backgroundColor =
      item.id === selectedTrainingData.id ? 'selected' : null;

    return (
      <SelectButton
        selected={backgroundColor}
        onPress={() => setSelectedTrainingData(item)}
      >
        {item.type}
      </SelectButton>
    );
  }

  function daysPerWeek({ item }) {
    const backgroundColor = item.id === selectedDaysData.id ? 'selected' : null;

    return (
      <SelectButton
        selected={backgroundColor}
        onPress={() => setSelectedDaysData(item)}
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
