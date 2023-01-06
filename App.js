import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from './screens/UserCredentials/LoginScreen';
import { createStackNavigator } from '@react-navigation/stack';
import { GlobalStyles } from './constants/styles';
import { useFonts } from 'expo-font';

const Stack = createStackNavigator();

const customFonts = {
  'open-sans-regular': require('./assets/fonts/OpenSans/OpenSans-Regular.ttf'),
  'open-sans-semi-bold': require('./assets/fonts/OpenSans/OpenSans-SemiBold.ttf'),
  'open-sans-bold': require('./assets/fonts/OpenSans/OpenSans-Bold.ttf'),
};

export default function App() {
  const [fontsLoaded] = useFonts(customFonts);

  return (
    <>
      <StatusBar style='auto' />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: GlobalStyles.colors.background },
            headerTintColor: 'white',
          }}
        >
          <Stack.Screen name='Login' component={LoginScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
