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
import WorkoutsScreen from './screens/WorkoutsScreen';
import RepMaxCalculator from './screens/RepMaxCalculator';
import ProgressChart from './screens/ProgressChart';
import WorkoutSelection from './screens/WorkoutSelection';
import PreviewModal from './components/PreviewModal';

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
            headerTitleStyle: {
              fontFamily: 'open-sans-semi-bold',
            },
          }}
        >
          <Stack.Screen name='Login' component={LoginScreen} />
          <Stack.Screen name='Signup' component={SignUpScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

  function TrainingOptionsStack() {
    return (
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: GlobalStyles.colors.background },
          headerTintColor: 'white',
          headerTitleStyle: {
            fontFamily: 'open-sans-semi-bold',
          },
        }}
      >
        <Stack.Screen
          name='WorkoutsScreen'
          component={WorkoutsScreen}
          options={{ title: 'Workouts' }}
        />
        <Stack.Screen
          name='WorkoutSelection'
          component={WorkoutSelection}
          options={{
            title: 'Select a workout',
          }}
        />
        <Stack.Screen
          name='PreviewModal'
          component={PreviewModal}
          options={{ presentation: 'modal', title: false }}
        />
      </Stack.Navigator>
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
            headerTitleStyle: {
              fontFamily: 'open-sans-semi-bold',
            },

            tabBarActiveTintColor: 'white',
          }}
        >
          <Tab.Screen
            name='Workouts'
            component={TrainingOptionsStack}
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
              headerShown: false,
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
