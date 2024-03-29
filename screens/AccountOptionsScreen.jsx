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
    Alert.alert(
      'Hold up!',
      'Are you sure you want to delete your account? This action is irreversible!',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Confirm',
          style: 'default',
          onPress: async () => {
            try {
              await deleteUser(auth.currentUser);
              AsyncStorage.removeItem('@user_uid');
              setUserIsAuthenticated(null);
              Alert.alert('Success!', 'Account deleted successfully.');
            } catch (error) {
              console.log(err.code),
                Alert.alert(
                  'Error!',
                  'Could not complete request, please try again.'
                );
            }
          },
        },
      ]
    );
  }

  return (
    <View style={styles.rootContainer}>
      <View style={styles.innerContainer}>
        <Button style={styles.logoutButton} onPress={() => signOutHandler()}>
          Sign Out
        </Button>
        <View style={styles.buttonsContainer}>
          <FlatButton onPress={() => navigation.navigate('Authentication')}>
            Change Password
          </FlatButton>
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
  buttonsContainer: {
    gap: 10,
  },
  logoutButton: {
    fontSize: 20,
    marginBottom: 8,
  },
});
