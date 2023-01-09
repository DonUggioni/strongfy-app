import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { GlobalStyles } from './constants/styles';
import { useFonts } from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import LoginScreen from './screens/UserCredentials/LoginScreen';
import SignUpScreen from './screens/UserCredentials/SignUpScreen';
import WorkOutsScreen from './screens/WorkOutsScreen';
import RepMaxCalculator from './screens/RepMaxCalculator';
import ProgressChart from './screens/ProgressChart';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const customFonts = {
  'open-sans-regular': require('./assets/fonts/OpenSans/OpenSans-Regular.ttf'),
  'open-sans-semi-bold': require('./assets/fonts/OpenSans/OpenSans-SemiBold.ttf'),
  'open-sans-bold': require('./assets/fonts/OpenSans/OpenSans-Bold.ttf'),
};

export default function App() {
  const [fontsLoaded] = useFonts(customFonts);
  const [userAuthenticated, setUserAuthenticated] = useState(true);

  function AuthenticationStack() {
    return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: GlobalStyles.colors.background },
            headerTintColor: 'white',
          }}
        >
          <Stack.Screen name='Login' component={LoginScreen} />
          <Stack.Screen name='Signup' component={SignUpScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

  function AppNavigation() {
    return (
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: GlobalStyles.colors.background },
            headerTintColor: 'white',
            tabBarStyle: {
              backgroundColor: GlobalStyles.colors.primary700,
              paddingTop: 5,
              height: 90,
            },
            tabBarActiveTintColor: 'white',
          }}
        >
          <Tab.Screen
            name='Workouts'
            component={WorkOutsScreen}
            options={{
              title: 'Workouts',
              tabBarIcon: ({ focused }) => {
                return (
                  <Ionicons
                    name='barbell-outline'
                    size={34}
                    color={
                      focused
                        ? GlobalStyles.colors.primary400
                        : GlobalStyles.colors.primary500
                    }
                  />
                );
              },
            }}
          />
          <Tab.Screen
            name='RepMaxCalculator'
            component={RepMaxCalculator}
            options={{
              title: 'Max Rep Calculator',
              tabBarIcon: ({ focused }) => {
                return (
                  <Ionicons
                    name='calculator-outline'
                    size={30}
                    color={
                      focused
                        ? GlobalStyles.colors.primary400
                        : GlobalStyles.colors.primary500
                    }
                  />
                );
              },
            }}
          />
          <Tab.Screen
            name='ProgressChart'
            component={ProgressChart}
            options={{
              title: 'Progress Chart',
              tabBarIcon: ({ focused }) => {
                return (
                  <Ionicons
                    name='bar-chart-outline'
                    size={30}
                    color={
                      focused
                        ? GlobalStyles.colors.primary400
                        : GlobalStyles.colors.primary500
                    }
                  />
                );
              },
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }

  if (fontsLoaded)
    return (
      <>
        <StatusBar style='light' />
        {!userAuthenticated && <AuthenticationStack />}
        {userAuthenticated && <AppNavigation />}
      </>
    );
}
