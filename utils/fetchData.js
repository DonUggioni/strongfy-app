import axios from 'axios';

const DATA_URL = `https://strongfy-c92fb-default-rtdb.europe-west1.firebasedatabase.app/powerlifting`;

export async function getTrainingData(trainingPhase, daysAWeek, token) {
  const response = await axios.get(
    `${DATA_URL}/${trainingPhase}/${daysAWeek}.json?auth=${token}`
  );
  return response.data;
}
