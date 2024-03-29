import React, { useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, View } from 'react-native';
import Button from './UI/buttons/Button';
import SelectButton from './UI/buttons/SelectButton';
import StyledText from './UI/text/StyledText';
import useAppContext from '../store/AppContext';
import LoadingScreen from './LoadingScreen';
import MessageScreen from './MessageScreen';
import { getTrainingData } from '../utils/fetchData';

const styleData = [
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
  // {
  //   id: 't3',
  //   type: 'Peaking',
  //   value: 'peaking',
  // },
];
const daysData = [
  {
    id: 'd1',
    days: '3 days',
    value: '3days',
  },
  {
    id: 'd2',
    days: '4 days',
    value: '4days',
  },
  {
    id: 'd3',
    days: '5 days',
    value: '5days',
  },
];

function BlockOptions({ navigation }) {
  const { setIsLoading, isLoading, setFilteredWorkouts, userToken } =
    useAppContext();
  const [selectedTrainingData, setSelectedTrainingData] = useState({});
  const [selectedDaysData, setSelectedDaysData] = useState({});

  function trainingOptions({ item }) {
    const backgroundColor =
      item.id === selectedTrainingData.id ? 'selected' : null;

    return (
      <SelectButton
        selected={backgroundColor}
        onPress={() => setSelectedTrainingData(item)}
        selectStyle={styles.selectPhaseButton}
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

  async function confirmHandler() {
    if (!selectedDaysData.value || !selectedTrainingData.value) return;
    try {
      setIsLoading(true);
      const data = await getTrainingData(
        selectedTrainingData.value,
        selectedDaysData.value,
        userToken
      );
      if (data) {
        setFilteredWorkouts(data);
        navigation.replace('WorkoutSelection');
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      return (
        <MessageScreen message={'Something went wrong. Please try again.'} />
      );
    }
  }

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <SafeAreaView style={styles.rootContainer}>
      <View style={styles.innerContainer}>
        <View style={styles.optionsContainer}>
          <StyledText>What's the training phase?</StyledText>
          <FlatList
            data={styleData}
            keyExtractor={(item) => item.id}
            renderItem={trainingOptions}
            horizontal={true}
            contentContainerStyle={{
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
            <Button type='full' onPress={confirmHandler}>
              Confirm
            </Button>
          </View>
          <View style={styles.buttonContainer}>
            <Button
              onPress={() => navigation.goBack('WorkoutsScreen')}
              type='flat'
            >
              Cancel
            </Button>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default BlockOptions;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: 'center',
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
  selectPhaseButton: {
    marginRight: 24,
  },
});
