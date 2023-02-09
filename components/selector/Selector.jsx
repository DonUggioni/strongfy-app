import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Title from '../UI/text/Title';
import { Ionicons } from '@expo/vector-icons';

function Selector({
  titleStyle,
  iconName,
  iconSize,
  iconColor,
  children,
  onPress,
  styleDone,
}) {
  return (
    <Pressable
      style={({ pressed }) =>
        pressed
          ? [styles.innerContainer, styles.pressed]
          : [styles.innerContainer, styleDone]
      }
      onPress={onPress}
    >
      <View>
        <Title style={[styles.title, titleStyle]}>{children}</Title>
      </View>
      <View>
        <Ionicons name={iconName} size={iconSize} color={iconColor} />
      </View>
    </Pressable>
  );
}

export default Selector;

const styles = StyleSheet.create({
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    textAlign: 'left',
    fontFamily: 'open-sans-semi-bold',
    letterSpacing: 0.5,
  },
  pressed: {
    opacity: 0.75,
  },
});
