import React from 'react';
import { StyleSheet, View } from 'react-native';
import { GlobalStyles } from '../constants/styles';
import Selector from './selector/Selector';

function SelectWeek({ week, onPress }) {
  return (
    <View style={styles.rootContainer}>
      <Selector
        fontSize={24}
        iconName='chevron-forward-outline'
        iconSize={32}
        iconColor='white'
        onPress={onPress}
        titleStyle={styles.title}
      >
        {week}
      </Selector>
    </View>
  );
}

export default SelectWeek;

const styles = StyleSheet.create({
  rootContainer: {
    paddingVertical: 42,
    paddingHorizontal: 24,
    borderBottomWidth: 2,
    borderBottomColor: GlobalStyles.colors.gray500,
  },
  title: {
    fontSize: 24,
  },
});
