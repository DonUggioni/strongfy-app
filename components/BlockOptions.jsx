import React, { useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, View } from 'react-native';
import { GlobalStyles } from '../constants/styles';
import Button from './UI/buttons/Button';
import SelectButton from './UI/buttons/SelectButton';
import StyledText from './UI/text/StyledText';
import useAppContext from '../store/AppContext';
import { useNavigation } from '@react-navigation/native';
import LoadingScreen from './LoadingScreen';
import ErrorScreen from './ErrorScreen';
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

function BlockOptions() {
  const {
    filterWorkouts,
    setTrainingData,
    setIsLoading,
    isLoading,
    setFilteredWorkouts,
  } = useAppContext();
  const [selectedTrainingData, setSelectedTrainingData] = useState({});
  const [selectedDaysData, setSelectedDaysData] = useState({});
  const navigation = useNavigation();

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

  async function confirmHandler() {
    try {
      setIsLoading(true);
      const data = await getTrainingData(
        selectedTrainingData.value,
        selectedDaysData.value
      );
      setFilteredWorkouts(data);
      setIsLoading(false);
      navigation.replace('WorkoutSelection');
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      return (
        <ErrorScreen message={'Something went wrong. Please try again.'} />
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
