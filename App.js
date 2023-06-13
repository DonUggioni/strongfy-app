import 'react-native-gesture-handler';
import { AppContextProvider } from './store/AppContext';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { GlobalStyles } from './constants/styles';
import { Ionicons } from '@expo/vector-icons';
import LoginScreen from './screens/UserCredentials/LoginScreen';
import AccountOptionsScreen from './screens/AccountOptionsScreen';
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
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';

import useAppContext from './store/AppContext';
import { Platform } from 'react-native';
import { useEffect } from 'react';
import ReAuthenticationScreen from './screens/ReAuthenticationScreen';
import NewPasswordScreen from './screens/NewPasswordScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import PercentageCalculator from './screens/PercentageCalculator';
import RootAppContainer from './components/RootAppContainer';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

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
      <Stack.Screen name='ForgotPassword' component={ForgotPasswordScreen} />
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

function CalculatorDrawer() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: GlobalStyles.colors.background,
          elevation: 0,
          shadowColor: GlobalStyles.colors.gray300,
        },
        headerTintColor: 'white',
        drawerContentStyle: {
          backgroundColor: GlobalStyles.colors.gray600,
          paddingTop: 16,
        },
        drawerActiveTintColor: 'white',
        drawerInactiveTintColor: GlobalStyles.colors.gray300,
      }}
    >
      <Drawer.Screen
        name='RepMaxCalculator'
        component={RepMaxCalculator}
        options={{
          title: 'Rep Max Calculator',
        }}
      />
      <Drawer.Screen
        name='PercentageCalculator'
        component={PercentageCalculator}
        options={{
          title: 'Percentage Calculator',
        }}
      />
    </Drawer.Navigator>
  );
}

function HomeStack() {
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
      <Stack.Screen name='Articles' component={HomeScreen} />
      <Stack.Screen
        name='AccountSettings'
        component={AccountOptionsScreen}
        options={{ title: 'Account' }}
      />
      <Stack.Screen name='Authentication' component={ReAuthenticationScreen} />
      <Stack.Screen
        name='NewPassword'
        component={NewPasswordScreen}
        options={{ title: 'New Password' }}
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
        tabBarItemStyle: {
          flexDirection: Platform.OS === 'web' ? 'column' : 'column',
        },
        tabBarActiveTintColor: 'white',
        tabBarHideOnKeyboard: Platform.OS === 'android' ? true : false,
      }}
    >
      <Tab.Screen
        name='Home'
        component={HomeStack}
        options={{
          headerShown: false,
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
        name='Calculators'
        component={CalculatorDrawer}
        options={{
          headerShown: false,
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
  const { userIsAuthenticated } = useAppContext();
  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: GlobalStyles.colors.background,
    },
  };

  const screens =
    ((userIsAuthenticated === null ||
      userIsAuthenticated.emailVerified === false) && (
      <AuthenticationStack />
    )) ||
    (userIsAuthenticated !== null &&
      userIsAuthenticated.emailVerified === true && <AppNavigation />);

  return <NavigationContainer theme={MyTheme}>{screens}</NavigationContainer>;
}

export default function App() {
  const [fontsLoaded] = useFonts(customFonts);

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }

    prepare();
  }, []);

  if (!fontsLoaded) {
    return undefined;
  } else {
    setTimeout(() => {
      SplashScreen.hideAsync();
    }, 3000);
  }
  return (
    <>
      <StatusBar style='light' />
      <AppContextProvider>
        {Platform.OS === 'web' ? (
          <RootAppContainer>
            <RootApp />
          </RootAppContainer>
        ) : (
          <RootApp />
        )}
      </AppContextProvider>
    </>
  );
}
