import axios from 'axios';

const DATA_URL =
  'https://strongfy-c92fb-default-rtdb.europe-west1.firebasedatabase.app/training.json';

export async function getTrainingData() {
  const response = await axios.get(DATA_URL);
  console.log(response);
  return response;
}
