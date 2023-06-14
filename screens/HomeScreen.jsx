import React, { useEffect } from 'react';
import { Alert, Linking, StyleSheet, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import FlatButton from '../components/UI/buttons/FlatButton';
import useAppContext from '../store/AppContext';
import ArticleCard from '../components/ArticleCard';

function HomeScreen({ navigation }) {
  const { posts } = useAppContext();

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
        <FlatButton
          style={styles.headerButton}
          onPress={() => navigation.navigate('AccountSettings')}
        >
          <MaterialCommunityIcons
            name='account-settings'
            size={30}
            color='white'
          />
        </FlatButton>
      ),
    });
  }, []);

  return (
    <ScrollView
      style={styles.rootContainer}
      contentContainerStyle={{ alignItems: 'center', justifyContent: 'center' }}
    >
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
  },
  headerButton: {
    textDecorationLine: 'none',
    marginRight: 24,
    fontSize: 16,
    fontFamily: 'open-sans-semi-bold',
  },
});
