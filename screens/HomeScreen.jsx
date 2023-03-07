import { StyleSheet, View } from 'react-native';
import React, { useEffect } from 'react';
import StyledText from '../components/UI/text/StyledText';
import FlatButton from '../components/UI/buttons/FlatButton';
import { auth } from '../firebase/firebaseConfig';
import { signOut } from 'firebase/auth';
import useAppContext from '../store/AppContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

function HomeScreen({ navigation }) {
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
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <FlatButton style={styles.headerButton} onPress={signOutHandler}>
          Logout
        </FlatButton>
      ),
    });
  }, []);

  return (
    <View style={styles.rootContainer}>
      <StyledText>Building something great!</StyledText>
    </View>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerButton: {
    textDecorationLine: 'none',
    marginRight: 24,
    fontSize: 16,
    fontFamily: 'open-sans-semi-bold',
  },
});
