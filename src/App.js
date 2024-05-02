import React, {useEffect} from 'react';
import {StatusBar, View} from 'react-native';


// Constants
import {COLORS, CONSTANTS} from '@utils';

// React Navigation
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// Icon
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Pages
import {
  Profile,
  Home,
  Advertisements,
  CreateAdvertisement,
  Login,
  Register,
  EmailValidation,
  AdvertisementDetail,
} from '@pages';

// Context
import UserContextProvider, {useUser} from './context/UserProvider';

// FlashMessage
import FlashMessage from 'react-native-flash-message';

// Storage
import { getUserFromToken } from '@utils/functions';




const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// İlanlar sayfası için kullanılan stack
const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen component={Home} name='AdvertisementsScreen' />
      <Stack.Screen component={AdvertisementDetail} name='AdvertisementDetailScreen' />
    </Stack.Navigator>
  )
}



const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: COLORS.black,
        tabBarInactiveTintColor: COLORS.blackMuted,
        headerTitle: CONSTANTS.APP_NAME,
        headerStyle: {
          backgroundColor: COLORS.primary,
        },
        headerTitleStyle: {
          fontFamily: 'Galada-Regular',
          fontSize: CONSTANTS.fontSize.L6,
        },
        headerTitleAlign: 'center',
        headerTintColor: COLORS.white,
      }}>
      <Tab.Screen
        name="HomeScreen"
        component={HomeStack}
        options={{
          title: 'Anasayfa',
          tabBarIcon: ({focused, color, size}) => {
            const iconName = focused ? 'home' : 'home-outline';
            const iconColor = focused ? COLORS.black : COLORS.blackMuted;
            return <Icon name={iconName} color={iconColor} size={size} />;
          },
        }}
      />
      <Tab.Screen
        name="CreateAdvertisementScreen"
        component={CreateAdvertisement}
        options={{
          title: 'İlan Oluştur',
          tabBarIcon: ({focused, size}) => {
            const iconName = focused ? 'plus-circle' : 'plus-circle-outline';
            const iconColor = focused ? COLORS.black : COLORS.blackMuted;
            return <Icon name={iconName} color={iconColor} size={size} />;
          },
        }}
      />
      <Tab.Screen
        name="AdvertisementsScreen"
        component={Advertisements}
        options={{
          title: 'İlanlar',
          tabBarIcon: ({focused, color, size}) => {
            const iconName = focused ? 'heart' : 'heart-outline';
            const iconColor = focused ? COLORS.red : color;
            return <Icon name={iconName} color={iconColor} size={size} />;
          },
        }}
      />

      <Tab.Screen
        name="ProfileScreen"
        component={Profile}
        options={{
          title: 'Profil',
          tabBarIcon: ({focused, color, size}) => {
            const iconName = focused ? 'account' : 'account-outline';
            const iconColor = focused ? COLORS.black : COLORS.blackMuted;
            return <Icon name={iconName} color={iconColor} size={size} />;
          },
        }}
      />
    </Tab.Navigator>
  );
};

const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName='LoginScreen'
      >
      <Stack.Screen name="LoginScreen" component={Login} />
      <Stack.Screen name="RegisterScreen" component={Register} />
      <Stack.Screen
        name="EmailVerificationScreen"
        component={EmailValidation}
      />
    </Stack.Navigator>
  );
};

const App = () => {

  const {user,setUser} = useUser()

  useEffect(() => {
    const checkToken = async () => {
      const userData = await getUserFromToken();
      setUser(userData);
    };
    checkToken()
  }, []);

  

  
  
  return (
    <>
      <View style={{flex: 1}}>  
        <StatusBar
          backgroundColor={COLORS.primary}
          barStyle={'light-content'}
        />
        <NavigationContainer>
          {user ? <BottomTabs /> : <AuthStack />}
        </NavigationContainer>
      </View>
      <FlashMessage position={"top"}/>
    </>
    
  );
};

const AppWithContext = () => {
  return (
    <UserContextProvider>
      <App/>
    </UserContextProvider>
  )
}



export default AppWithContext;
