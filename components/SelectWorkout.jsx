import React from 'react';
import { StyleSheet, View } from 'react-native';
import { GlobalStyles } from '../constants/styles';
import Button from './UI/buttons/Button';
import Title from './UI/text/Title';

function SelectWorkout({ name, onSelect, onShowPreview }) {
  return (
    <View style={styles.rootContainer}>
      <View style={styles.innerContainer}>
        <Title style={styles.title}>{name}</Title>
        <View style={styles.buttonsContainer}>
          <View style={styles.button}>
            <Button type='flat' onPress={onShowPreview}>
              Preview
            </Button>
          </View>
          <View style={styles.button}>
            <Button type='full' onPress={onSelect}>
              Select
            </Button>
          </View>
        </View>
      </View>
    </View>
  );
}

export default SelectWorkout;

const styles = StyleSheet.create({
  rootContainer: {
    padding: 28,
    borderBottomWidth: 1,
    borderBottomColor: GlobalStyles.colors.gray500,
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  button: {
    marginLeft: 12,
  },
  title: {
    fontFamily: 'open-sans-semi-bold',
  },
});
