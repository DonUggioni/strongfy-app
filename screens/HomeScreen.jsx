import { Alert, Linking, StyleSheet, View, FlatList } from 'react-native';
import React, { useEffect } from 'react';
import FlatButton from '../components/UI/buttons/FlatButton';
import { auth } from '../firebase/firebaseConfig';
import { signOut } from 'firebase/auth';
import useAppContext from '../store/AppContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ArticleCard from '../components/ArticleCard';
import { ScrollView } from 'react-native';

function HomeScreen({ navigation }) {
  const { setUserIsAuthenticated, setCurrentWorkout, posts } = useAppContext();

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

  async function openExternalLink(url) {
    // Checks if link is supported for custom URL scheme.
    const isSupported = await Linking.canOpenURL(url);

    if (isSupported) {
      await Linking.openURL(url);
    } else {
      Alert.alert(`The url "${url}" is not valid.`);
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
    <ScrollView contentContainerStyle={styles.rootContainer}>
      {posts?.map((post, index) => {
        return (
          <ArticleCard
            title={post.title}
            author={post.author}
            date={post.date}
            imageUrl={post.image}
            onPress={() => openExternalLink(post.url)}
            key={index}
          />
        );
      })}
    </ScrollView>
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
