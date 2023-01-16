import { createContext, useContext, useState } from 'react';
import { WORKOUT_DATA } from '../data/Data';

const AppContext = createContext(WORKOUT_DATA);

export function AppContextProvider({ children }) {
  const [filteredWorkouts, setFilteredWorkouts] = useState(null);
  const [workoutPreviewData, setWorkoutPreviewData] = useState(null);
  const [workoutPreviewTitle, setWorkoutPreviewTitle] = useState('');
  const [currentWorkout, setCurrentWorkout] = useState([]);
  const [workoutOfTheDay, setWorkoutOfTheDay] = useState([]);

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
