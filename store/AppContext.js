import { createContext, useContext, useState } from 'react';
import { WORKOUT_DATA } from '../data/Data';
import { useImmer } from 'use-immer';
const AppContext = createContext(WORKOUT_DATA);

export function AppContextProvider({ children }) {
  const [filteredWorkouts, setFilteredWorkouts] = useState(null);
  const [workoutPreviewData, setWorkoutPreviewData] = useState(null);
  const [workoutPreviewTitle, setWorkoutPreviewTitle] = useState('');
  const [currentWorkout, setCurrentWorkout] = useState([]);
  const [workoutOfTheDay, setWorkoutOfTheDay] = useImmer();
  const [backdownWeightCalc, setBackdownWeightCalc] = useState('');

  function filterWorkouts(numOfDays, typeOfTraining) {
    const filtered = WORKOUT_DATA.filter(
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
      exerciseName === 'Squat' ||
      exerciseName === 'Bench' ||
      exerciseName === 'Deadlift'
    ) {
      const minPerc = (8 / num) * 100;
      const maxPerc = (15 / num) * 100;
      const backdown = {
        min: num - minPerc.toFixed(1),
        max: num - maxPerc.toFixed(1),
      };
      setBackdownWeightCalc(backdown);
    }
  }

  function updateWorkoutData() {}

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
