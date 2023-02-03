import { createContext, useContext, useState, useEffect } from 'react';
import { WORKOUT_DATA_MODEL } from '../data/Data';
import { useImmer } from 'use-immer';
import {
  setDoc,
  doc,
  serverTimestamp,
  getDocs,
  query,
  orderBy,
  collection,
  limit,
  getDoc,
} from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { db, auth } from '../firebase/firebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
const AppContext = createContext(null);

export function AppContextProvider({ children }) {
  const [currentWorkout, setCurrentWorkout] = useImmer([]);
  const [workoutOfTheDay, setWorkoutOfTheDay] = useImmer(null);
  const [filteredWorkouts, setFilteredWorkouts] = useState([]);
  const [workoutPreviewData, setWorkoutPreviewData] = useState(null);
  const [workoutPreviewTitle, setWorkoutPreviewTitle] = useState('');
  const [workoutOfTheWeek, setWorkoutOfTheWeek] = useState(null);
  const [backdownWeightCalc, setBackdownWeightCalc] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [userIsAuthenticated, setUserIsAuthenticated] = useState(null);
  const [currentWorkoutId, setCurrentWorkoutId] = useState('');
  const [currentWeekIndex, setCurrentWeekIndex] = useState(null);
  const [repMaxTrackerValues, setRepMaxTrackerValues] = useState({
    squat: [
      {
        value: 0,
        date: '',
      },
    ],
    bench: [
      {
        value: 0,
        date: '',
      },
    ],
    deadlift: [
      {
        value: 0,
        date: '',
      },
    ],
  });

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
    await setDoc(
      ref,
      { ...workout, timeStamp: serverTimestamp() },
      { merge: true }
    );
  }

  ///////////////////////////////////////////////////////////
  // Get user current workout plan if available
  async function getUserCurrentWorkout(uid) {
    const dataQuery = query(
      collection(db, 'users', uid, 'CurrentWorkout'),
      orderBy('id', 'desc'),
      limit(1)
    );
    setCurrentWorkout([]);
    try {
      const querySnapshot = await getDocs(dataQuery);
      querySnapshot.forEach((doc) => {
        setCurrentWorkout([doc.data()]);
        setCurrentWorkoutId(doc.id);
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  ///////////////////////////////////////////////////////////
  // Get current workout id
  async function getCurrentWorkoutId() {
    const dataQuery = query(
      collection(db, 'users', userIsAuthenticated?.uid, 'CurrentWorkout'),
      orderBy('id', 'desc'),
      limit(1)
    );
    try {
      const querySnapshot = await getDocs(dataQuery);
      querySnapshot.forEach((doc) => {
        setCurrentWorkoutId(doc.id);
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
    async function getUserId() {
      try {
        const id = await AsyncStorage.getItem('@user_uid');
        if (id !== null) {
          getUserCurrentWorkout(id);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getUserId();
    getCurrentUser();
  }, [userIsAuthenticated]);

  ///////////////////////////////////////////////////////////
  // Update data on DB
  async function updateWorkoutDataInFirestore() {
    const dataQuery = doc(
      db,
      'users',
      userIsAuthenticated?.uid,
      'CurrentWorkout',
      currentWorkoutId
    );
    try {
      await setDoc(dataQuery, ...currentWorkout);
    } catch (error) {
      console.log(error.message);
    }
  }

  ///////////////////////////////////////////////////////////
  // Update 1RM values do DB to be displayed in chart
  async function update1RMTrackerValues(exercise, weight, reps) {
    const date = new Date();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    const formattedDate = `${month}/${day}/${year}`;
    const docRef = doc(
      db,
      'users',
      userIsAuthenticated.uid,
      'RepMaxTrackerValues',
      'data'
    );

    const repMaxCalc = weight * (1 + reps / 30);

    switch (exercise) {
      case 'squat':
        setRepMaxTrackerValues({
          ...repMaxTrackerValues,

          squat: [
            ...repMaxTrackerValues?.squat,
            {
              value: +repMaxCalc.toFixed(1),
              date: formattedDate,
            },
          ],
        });
        break;
      case 'bench':
        setRepMaxTrackerValues({
          ...repMaxTrackerValues,

          bench: [
            ...repMaxTrackerValues?.bench,
            {
              value: +repMaxCalc.toFixed(1),
              date: formattedDate,
            },
          ],
        });
        break;
      case 'deadlift':
        setRepMaxTrackerValues({
          ...repMaxTrackerValues,

          deadlift: [
            ...repMaxTrackerValues?.deadlift,
            {
              value: +repMaxCalc.toFixed(1),
              date: formattedDate,
            },
          ],
        });
        break;

      default:
        exercise;
        break;
    }
    console.log(repMaxTrackerValues);
    try {
      await setDoc(docRef, {
        ...repMaxTrackerValues,
      });
      console.log('Updated');
    } catch (error) {
      console.log(error.message);
    }
  }

  ///////////////////////////////////////////////////////////
  // Get 1RM values from DB to display in chart
  async function getRepMaxValuesFromDB() {
    const id = await AsyncStorage.getItem('@user_uid');
    const docRef = doc(db, 'users', id, 'RepMaxTrackerValues', 'data');

    try {
      const repMaxData = await getDoc(docRef);
      if (repMaxData.data() === 'undefined') {
        setRepMaxTrackerValues(null);
      } else {
        setRepMaxTrackerValues(repMaxData.data());
      }
    } catch (error) {
      console.log(error.message);
    }
  }

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
    setBackdownWeightCalc,
    isLoading,
    setIsLoading,
    workoutOfTheWeek,
    setWorkoutOfTheWeek,
    userIsAuthenticated,
    setUserIsAuthenticated,
    addCurrentWorkoutToDataBase,
    getUserCurrentWorkout,
    getCurrentUser,
    updateWorkoutDataInFirestore,
    getCurrentWorkoutId,
    currentWeekIndex,
    setCurrentWeekIndex,
    update1RMTrackerValues,
    repMaxTrackerValues,
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
