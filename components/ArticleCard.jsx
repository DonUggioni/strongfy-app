import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Image } from 'react-native';
import { GlobalStyles } from '../constants/styles';
import { Pressable } from 'react-native';
import StyledText from './UI/text/StyledText';
import Title from './UI/text/Title';

function ArticleCard({ title, author, date, onPress, imageUrl }) {
  return (
    <Pressable style={styles.rootContainer} onPress={onPress}>
      <Image
        style={styles.image}
        source={{
          uri: imageUrl,
        }}
      />
      <View style={styles.textContainer}>
        <Title style={styles.title}>{title}</Title>
        <View style={styles.dateContainer}>
          <StyledText style={styles.dateText}>By {author}</StyledText>
          <StyledText style={styles.dateText}>{date}</StyledText>
        </View>
      </View>
    </Pressable>
  );
}

export default ArticleCard;

const styles = StyleSheet.create({
  rootContainer: {
    backgroundColor: GlobalStyles.colors.gray600,
    paddingVertical: 10,
    paddingHorizontal: 6,
    borderRadius: GlobalStyles.borderRadius,
    alignItems: 'center',
    marginBottom: 24,
  },
  image: {
    width: 310,
    height: 150,
    resizeMode: 'cover',
    borderRadius: 3,
  },
  textContainer: {
    width: 320,
    paddingHorizontal: 10,
  },
  title: {
    textAlign: 'center',
    paddingTop: 10,
    fontSize: 20,
    fontFamily: 'open-sans-semi-bold',
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  dateText: {
    fontSize: 13,
    color: GlobalStyles.colors.gray200,
  },
});
