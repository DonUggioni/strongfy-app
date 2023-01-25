import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import StyledText from '../components/UI/text/StyledText';
import { GlobalStyles } from '../constants/styles';
import FlatButton from '../components/UI/buttons/FlatButton';
import { auth } from '../firebase/firebaseConfig';
import { signOut } from 'firebase/auth';
import useAppContext from '../store/AppContext';

function HomeScreen({ navigation }) {
  const { setUserIsAuthenticated, userIsAuthenticated } = useAppContext();

  console.log(userIsAuthenticated);
  async function signOutHandler() {
    try {
      await signOut(auth);
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
      <StyledText>This is the home screen</StyledText>
    </View>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    backgroundColor: GlobalStyles.colors.background,
    flex: 1,
  },
  headerButton: {
    textDecorationLine: 'none',
    marginRight: 24,
    marginVertical: 0,
    fontSize: 16,
    fontFamily: 'open-sans-semi-bold',
  },
});