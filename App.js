import { AppContextProvider } from './store/AppContext';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { GlobalStyles } from './constants/styles';
import { useFonts } from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import LoginScreen from './screens/UserCredentials/LoginScreen';
import SignUpScreen from './screens/UserCredentials/SignUpScreen';
import HomeScreen from './screens/HomeScreen';
import WorkoutsScreen from './screens/WorkoutsScreen';
import RepMaxCalculator from './screens/RepMaxCalculator';
import ProgressChart from './screens/ProgressChart';
import WorkoutSelection from './screens/WorkoutSelection';
import PreviewModal from './components/PreviewModal';
import BlockOptions from './components/BlockOptions';
import SelectDay from './components/SelectDay';
import WorkoutOfTheDay from './components/WorkoutOfTheDay';
import SplashScreen from './components/SplashScreen';

import useAppContext from './store/AppContext';
import { KeyboardAvoidingView, Platform } from 'react-native';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const customFonts = {
  'open-sans-regular': require('./assets/fonts/OpenSans/OpenSans-Regular.ttf'),
  'open-sans-semi-bold': require('./assets/fonts/OpenSans/OpenSans-SemiBold.ttf'),
  'open-sans-bold': require('./assets/fonts/OpenSans/OpenSans-Bold.ttf'),
};

function AuthenticationStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: GlobalStyles.colors.background,
          elevation: 0,
          shadowColor: GlobalStyles.colors.gray300,
        },
        headerTintColor: 'white',
        headerTitleStyle: {
          fontFamily: 'open-sans-semi-bold',
        },
        headerShown: false,
      }}
    >
      <Stack.Screen name='Login' component={LoginScreen} />
      <Stack.Screen name='Signup' component={SignUpScreen} />
    </Stack.Navigator>
  );
}

function TrainingOptionsStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: GlobalStyles.colors.background,
          elevation: 0,
          shadowColor: GlobalStyles.colors.gray300,
        },

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
        name='SelectPhase'
        component={BlockOptions}
        options={{ title: 'Training Phase' }}
      />
      <Stack.Screen
        name='WorkoutSelection'
        component={WorkoutSelection}
        options={{
          title: 'Select a workout',
        }}
      />
      <Stack.Screen
        name='SelectDay'
        component={SelectDay}
        options={{ title: 'Select Day' }}
      />
      <Stack.Screen name='WorkoutOfTheDay' component={WorkoutOfTheDay} />

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
    <Tab.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: GlobalStyles.colors.background,
          elevation: 0,
          shadowColor: GlobalStyles.colors.gray300,
        },
        headerTintColor: 'white',
        tabBarStyle: {
          backgroundColor: GlobalStyles.colors.primary700,
          paddingTop: 6,
          paddingBottom: Platform.OS === 'ios' ? 24 : 6,
          height: Platform.OS === 'ios' ? 90 : 70,
          borderTopWidth: 0,
        },
        headerTitleStyle: {
          fontFamily: 'open-sans-semi-bold',
        },

        tabBarActiveTintColor: 'white',
        tabBarHideOnKeyboard: Platform.OS === 'android' ? true : false,
      }}
    >
      <Tab.Screen
        name='Home'
        component={HomeScreen}
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => {
            return (
              <Ionicons
                name='home-outline'
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
  );
}

function RootApp() {
  const { userIsAuthenticated, splashScreen } = useAppContext();

  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: GlobalStyles.colors.background,
    },
  };

  // if (splashScreen) {
  //   return <SplashScreen />;
  // }

  function handleScreens() {
    if (
      userIsAuthenticated === null ||
      userIsAuthenticated.emailVerified === false
    ) {
      return <AuthenticationStack />;
    }

    if (
      userIsAuthenticated !== null &&
      userIsAuthenticated.emailVerified === true
    ) {
      return <AppNavigation />;
    }
  }

  return (
    <NavigationContainer theme={MyTheme}>{handleScreens()}</NavigationContainer>
  );
}

export default function App() {
  const [fontsLoaded] = useFonts(customFonts);

  if (fontsLoaded)
    return (
      <>
        <StatusBar style='light' />
        <AppContextProvider>
          <RootApp />
        </AppContextProvider>
      </>
    );
}
