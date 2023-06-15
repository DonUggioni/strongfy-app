import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { GlobalStyles } from '../constants/styles';

function RootAppContainer({ children }) {
  const [width, setWidth] = useState(Dimensions.get('window').width);

  const widthStyle = width > 625 ? '50%' : '100%';

  useEffect(() => {
    const handleDimensionsChange = ({ window }) => {
      setWidth(window.width);
    };

    Dimensions.addEventListener('change', handleDimensionsChange);

    return () => {
      Dimensions.removeEventListener('change', handleDimensionsChange);
    };
  }, []);

  return (
    <View style={styles.container}>
      <View style={[styles.innerContainer, { width: widthStyle }]}>
        {children}
      </View>
    </View>
  );
}

export default RootAppContainer;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
    backgroundColor: GlobalStyles.colors.gray500,
  },
  innerContainer: {
    flex: 1,
  },
});
