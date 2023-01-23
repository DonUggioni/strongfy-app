import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

import {
  FIREBASE_API_KEY,
  AUTH_DOMAIN,
  DATABASE_URL,
  PROJECT_ID,
  STORAGE_BUCKET,
  SENDER_ID,
  APP_ID,
  MEASUREMENT_ID,
} from '@env';

const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,

  authDomain: AUTH_DOMAIN,

  databaseURL: DATABASE_URL,

  projectId: PROJECT_ID,

  storageBucket: STORAGE_BUCKET,

  messagingSenderId: SENDER_ID,

  appId: APP_ID,

  measurementId: MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
