import { createContext, useContext, useState, useEffect } from 'react';
import { WORKOUT_DATA_MODEL } from '../data/Data';
import { useImmer } from 'use-immer';
import {
  setDoc,
  serverTimestamp,
  getDocs,
  query,
  orderBy,
  collection,
  limit,
} from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { db, auth } from '../firebase/firebaseConfig';
const AppContext = createContext(null);

export function AppContextProvider({ children }) {
  const [filteredWorkouts, setFilteredWorkouts] = useState([]);
  const [workoutPreviewData, setWorkoutPreviewData] = useState(null);
  const [workoutPreviewTitle, setWorkoutPreviewTitle] = useState('');
  const [currentWorkout, setCurrentWorkout] = useState([]);
  const [workoutOfTheDay, setWorkoutOfTheDay] = useImmer(null);
  const [workoutOfTheWeek, setWorkoutOfTheWeek] = useState(null);
  const [backdownWeightCalc, setBackdownWeightCalc] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [userIsAuthenticated, setUserIsAuthenticated] = useState(null);

  console.log(currentWorkout);
  ///////////////////////////////////////////////////////////
  // Function being used in BlockOptions to filter selected workouts
  function filterWorkouts(numOfDays, typeOfTraining) {
    const filtered = trainingData.filter(
      (item) => item.type === typeOfTraining && item.daysPerWeek === numOfDays
    );
    setFilteredWorkouts(filtered);
  }
  ///////////////////////////////////////////////////////////
  // Function being used in WorkoutSelection, to preview entire training week
  function previewWorkoutHandler(id) {
    const filtered = filteredWorkouts
      .flatMap((item) => item.workouts)
      .filter((item) => item.id === id);
    setWorkoutPreviewData(filtered);
  }
  ///////////////////////////////////////////////////////////
  // Function being used in "WorkoutOfTheDay" to calculate backdownsets weight
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

  ///////////////////////////////////////////////////////////
  // Being used in WorkoutSelection and PreviewModal to add workout to data base
  async function addCurrentWorkoutToDataBase(ref, workout) {
    await setDoc(ref, { workout, id: serverTimestamp() }, { merge: true });
  }

  ///////////////////////////////////////////////////////////
  // Get user current workout plan if available
  async function getUserCurrentWorkout(uid) {
    setCurrentWorkout([]);
    const dataQuery = query(
      collection(db, 'users', uid, 'CurrentWorkout'),
      orderBy('id', 'desc'),
      limit(1)
    );
    try {
      const querySnapshot = await getDocs(dataQuery);
      querySnapshot.forEach((doc) => {
        setCurrentWorkout([doc.data().workout]);
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  ///////////////////////////////////////////////////////////
  // Gets current user data and persists on reload
  async function getCurrentUser() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserIsAuthenticated(user);
      }
    });
  }

  useEffect(() => {
    getCurrentUser();
  }, [userIsAuthenticated]);

  const values = {
    filteredWorkouts,
    setFilteredWorkouts,
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
    isLoading,
    setIsLoading,
    workoutOfTheWeek,
    setWorkoutOfTheWeek,
    userIsAuthenticated,
    setUserIsAuthenticated,
    addCurrentWorkoutToDataBase,
    getUserCurrentWorkout,
    getCurrentUser,
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
