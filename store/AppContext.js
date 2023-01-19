import { createContext, useContext, useState } from 'react';
import { WORKOUT_DATA } from '../data/Data';
import { useImmer } from 'use-immer';
const AppContext = createContext(WORKOUT_DATA);

export function AppContextProvider({ children }) {
  const [trainingData, setTrainingData] = useImmer(null);
  const [filteredWorkouts, setFilteredWorkouts] = useState(null);
  const [workoutPreviewData, setWorkoutPreviewData] = useState(null);
  const [workoutPreviewTitle, setWorkoutPreviewTitle] = useState('');
  const [currentWorkout, setCurrentWorkout] = useState([]);
  const [workoutOfTheDay, setWorkoutOfTheDay] = useImmer();
  const [backdownWeightCalc, setBackdownWeightCalc] = useState();

  function filterWorkouts(numOfDays, typeOfTraining) {
    const filtered = trainingData.training.filter(
      (item) => item.type === typeOfTraining && item.daysPerWeek === numOfDays
    );
    setFilteredWorkouts(filtered);
  }

  function previewWorkoutHandler(id) {
    const filtered = filteredWorkouts.filter((item) => item.id === id);
    setWorkoutPreviewData(filtered);
  }

  function calcBackdown(num, exerciseName) {
    if (
      exerciseName === 'squat' ||
      exerciseName === 'bench' ||
      exerciseName === 'deadlift'
    ) {
      const minPerc = num / 8;
      const maxPerc = num / 15;
      const backdown = {
        min: num - minPerc.toFixed(1),
        max: num - maxPerc.toFixed(1),
      };
      setBackdownWeightCalc(backdown);
    }
  }

  const values = {
    filteredWorkouts,
    filterWorkouts,
    previewWorkoutHandler,
    workoutPreviewData,
    workoutPreviewTitle,
    setWorkoutPreviewTitle,
    currentWorkout,
    setCurrentWorkout,
    workoutOfTheDay,
    setWorkoutOfTheDay,
    calcBackdown,
    backdownWeightCalc,
    trainingData,
    setTrainingData,
  };
  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
}

function useAppContext() {
  const ctx = useContext(AppContext);

  if (ctx === undefined) {
    throw new Error('useAppContext must be used within AppContext');
  }

  return ctx;
}

export default useAppContext;
