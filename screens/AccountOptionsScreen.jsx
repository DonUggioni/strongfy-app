import React from 'react';
import { auth } from '../firebase/firebaseConfig';
import { signOut, deleteUser } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useAppContext from '../store/AppContext';
import { StyleSheet, View } from 'react-native';
import FlatButton from '../components/UI/buttons/FlatButton';
import Button from '../components/UI/buttons/Button';
import { Alert } from 'react-native';

function AccountOptionsScreen({ navigation }) {
  const { setUserIsAuthenticated, setCurrentWorkout } = useAppContext();

  async function signOutHandler() {
    setCurrentWorkout([]);
    try {
      await signOut(auth);
      await AsyncStorage.removeItem('@user_uid');
      setUserIsAuthenticated(null);
    } catch (error) {
      console.log(error.message);
    }
  }

  function deleteAccountHandler() {
    deleteUser(auth.currentUser)
      .then(
        Alert.alert('User deleted successfully.'),
        setUserIsAuthenticated(null),
        AsyncStorage.removeItem('@user_uid'),
        navigation.navigate('Login')
      )
      .catch((err) => {
        console.log(err.message),
          Alert.alert('Could not complete request, please try again.');
      });
  }
  return (
    <View style={styles.rootContainer}>
      <View style={styles.innerContainer}>
        <Button style={styles.logoutButton} onPress={() => signOutHandler()}>
          Sign Out
        </Button>
        <View>
          <FlatButton onPress={() => deleteAccountHandler()}>
            Delete Account
          </FlatButton>
        </View>
      </View>
    </View>
  );
}

export default AccountOptionsScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    paddingVertical: 48,
    paddingHorizontal: 24,
  },
  innerContainer: {
    flex: 1,
    gap: 16,
    justifyContent: 'center',
  },
  logoutButton: {
    fontSize: 20,
  },
});
