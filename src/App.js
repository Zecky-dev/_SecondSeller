import React, {useEffect} from 'react';
import {Linking, StatusBar, View} from 'react-native';
import {useIsFocused, CommonActions} from '@react-navigation/native';

// Constants
import {CONSTANTS} from '@utils';
import THEMECOLORS from '@utils/colors';

// React Navigation
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import messaging from '@react-native-firebase/messaging';

// Icon
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Pages
import {
  Profile,
  Home,
  Advertisements,
  CreateAndUpdateAdvertisement,
  Login,
  Register,
  Forgot,
  EmailValidation,
  AdvertisementDetail,
  ProfileEdit,
  ChangePassword,
  Messages,
  Chat,
  UpdatePassword,
  OwnerProfile
} from '@pages';

// Context
import UserContextProvider, {useUser} from './context/UserProvider';
import ThemeContextProvider, {useTheme} from './context/ThemeContext';

// FlashMessage
import FlashMessage from 'react-native-flash-message';

// Storage
import {getUserFromToken, makePhoneCall} from '@utils/functions';

// Bootsplash
import BootSplash from 'react-native-bootsplash';
import {ChatHeader} from '@components';

import {blockUser} from './services/userServices';
import {handleForegroundMessages} from '@services/firebaseNotificationServices';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const linking = {
  prefixes: ['myapp://'],
  config: {
    initialRouteName: 'HomeScreen',
    screens: {
      Home: 'main',
    },
  },
  async getInitialURL() {
    const url = await Linking.getInitialURL();
    if (typeof url === 'string') {
      return url;
    }
    const message = await messaging().getInitialNotification();
    const deeplinkURL = 'myapp://main';
    if (typeof deeplinkURL === 'string') {
      return deeplinkURL;
    }
  },
  subscribe(listener) {
    const onReceiveURL = ({url}) => listener(url);

    // Listen to incoming links from deep linking
    const linkingSubscription = Linking.addEventListener('url', onReceiveURL);

    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Messasge handled in the background!', remoteMessage);
    });

    const foreground = messaging().onMessage(async remoteMessage => {
      handleForegroundMessages(remoteMessage.notification);
    });

    // onNotificationOpenedApp: When the application is running, but in the background.
    const unsubscribe = messaging().onNotificationOpenedApp(remoteMessage => {
      const url = 'myapp://main';
      listener(url);
    });

    return async () => {
      linkingSubscription.remove();
      unsubscribe();
      foreground();
    };
  },
};

// İlanlar sayfası için kullanılan stack
const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen component={Home} name="HomeAdvertisementsScreen" />
      <Stack.Screen
        component={AdvertisementDetailStack}
        name="AdvertisementDetailStack"
      />
    </Stack.Navigator>
  );
};

const ProfileMessagesStack = () => {
  const {theme} = useTheme();
  const COLORS = theme === 'dark' ? THEMECOLORS.DARK : THEMECOLORS.LIGHT;

  return (
    <Stack.Navigator>
      <Stack.Screen
        component={Messages}
        name="MessageListScreen"
        options={{headerShown: false}}
      />
      <Stack.Screen
        component={Chat}
        name="ChatScreen"
        options={({route}) => {
          return {
            header: () => (
              <ChatHeader
                receiver={route.params.receiver}
                title={route.params.title}
                blockUser={blockUser}
              />
            ),
          };
        }}
      />
    </Stack.Navigator>
  );
};

const AdvertisementDetailStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false,}}>
      <Stack.Screen
        component={AdvertisementDetail}
        name="AdvertisementDetailScreen"
      />
      <Stack.Screen
        component={Chat}
        name="ChatScreen"
        options={({route}) => {
          return {
            headerShown: true,
            header: () => (
              <ChatHeader
                receiver={route.params.receiver}
                title={route.params.title}
                blockUser={blockUser}
              />
            ),
          };
        }}
      />

      <Stack.Screen
        component={OwnerProfileStack}
        name='OwnerProfileScreen'
        options={{ headerShown: false}}
        />

    </Stack.Navigator>
  );
};

// Profile sayfası için kullanılan stack
const ProfileStack = ({navigation}) => {
  const isProfileFocused = useIsFocused();

  useEffect(() => {
    if (!isProfileFocused) {
      // Eğer Profil ekranı odaklanmamışsa, ProfileStack'i sıfırla
      resetProfileStack();
    }
  }, [isProfileFocused]);

  const resetProfileStack = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: 'ProfileStackScreen'}],
      }),
    );
  };

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen component={Profile} name="ProfileStackScreen" />
      <Stack.Screen component={ProfileEdit} name="ProfileEditScreen" />
      <Stack.Screen
        component={EmailValidation}
        key={1}
        name="ProfileEmailValidationScreen"
      />
      <Stack.Screen component={ChangePassword} name="ChangePasswordScreen" />
      <Stack.Screen component={ProfileMessagesStack} name="MessagesScreen" />
    </Stack.Navigator>
  );
};


const OwnerProfileStack = () => {
  return (  
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name='OwnerProfileStackScreen' component={OwnerProfile}/>
      <Stack.Screen name='OwnerProfileChat' component={Chat}/>
      <Stack.Screen name='OwnerProfileDetail' component={AdvertisementDetailStack} />
    </Stack.Navigator>
  )
}



// Favoriler ve ilanlarım stack'i

const AdvertisementStack = ({navigation}) => {

  const isAdvertisementsFocused = useIsFocused();

  useEffect(() => {
    if (!isAdvertisementsFocused) {
      // Eğer Profil ekranı odaklanmamışsa, ProfileStack'i sıfırla
      resetAdvertisementsStack();
    }
  }, [isAdvertisementsFocused]);

  const resetAdvertisementsStack = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: 'Advertisements'}],
      }),
    );
  };
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen component={Advertisements} name="Advertisements" />
      <Stack.Screen
        component={AdvertisementDetail}
        name="OwnAdvertisementDetailScreen"
      />
      <Stack.Screen
        component={CreateAndUpdateAdvertisement}
        name="UpdateAdvertisementScreen"
      />
      <Stack.Screen
        component={OwnerProfileStack}
        name='OwnerProfileScreen'/>
    </Stack.Navigator>
  );
};

const BottomTabs = () => {
  const {theme} = useTheme();
  const COLORS = theme === 'dark' ? THEMECOLORS.DARK : THEMECOLORS.LIGHT;

  return (
    <Tab.Navigator
      screenOptions={({route}) => {
        return {
          tabBarActiveTintColor: COLORS.titleColor,
          tabBarInactiveTintColor: COLORS.titleColor,
          headerTitle: CONSTANTS.APP_NAME,
          tabBarStyle: {
            backgroundColor: COLORS.primary,
          },
          headerStyle: {
            backgroundColor: COLORS.primary,
          },
          headerTitleStyle: {
            fontFamily: 'Galada-Regular',
            fontSize: CONSTANTS.fontSize.L6,
          },
          headerTitleAlign: 'center',
          headerTintColor: COLORS.titleColor,
          headerShown: route.key !== 'ChatScreen',
          tabBarHideOnKeyboard: true,
        };
      }}>
      <Tab.Screen
        name="HomeScreen"
        component={HomeStack}
        options={{
          title: 'Anasayfa',
          tabBarIcon: ({focused, color, size}) => {
            const iconName = focused ? 'home' : 'home-outline';
            const iconColor = focused
              ? COLORS.titleColor
              : COLORS.titleMutedColor;
            return <Icon name={iconName} color={iconColor} size={size} />;
          },
        }}
      />
      <Tab.Screen
        name="CreateAdvertisementScreen"
        component={CreateAndUpdateAdvertisement}
        initialParams={{
          advertisement: null,
        }}
        options={{
          title: 'İlan Oluştur',
          tabBarIcon: ({focused, size}) => {
            const iconName = focused ? 'plus-circle' : 'plus-circle-outline';
            const iconColor = focused
              ? COLORS.titleColor
              : COLORS.titleMutedColor;
            return <Icon name={iconName} color={iconColor} size={size} />;
          },
        }}
      />
      <Tab.Screen
        name="AdvertisementsScreen"
        component={AdvertisementStack}
        options={{
          title: 'İlanlar',
          tabBarIcon: ({focused, color, size}) => {
            const iconName = focused ? 'heart' : 'heart-outline';
            const iconColor = focused
              ? COLORS.titleColor
              : COLORS.titleMutedColor;
            return <Icon name={iconName} color={iconColor} size={size} />;
          },
        }}
      />

      <Tab.Screen
        name="ProfileScreen"
        component={ProfileStack}
        options={{
          title: 'Profil',
          tabBarIcon: ({focused, color, size}) => {
            const iconName = focused ? 'account' : 'account-outline';
            const iconColor = focused
              ? COLORS.titleColor
              : COLORS.titleMutedColor;
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
      initialRouteName="LoginScreen">
      <Stack.Screen name="LoginScreen" component={Login} />
      <Stack.Screen name="RegisterScreen" component={Register} />
      <Stack.Screen name="ForgotScreen" component={Forgot} />
      <Stack.Screen
        name="EmailVerificationScreen"
        component={EmailValidation}
      />
      <Stack.Screen name="UpdatePasswordScreen" component={UpdatePassword} />
    </Stack.Navigator>
  );
};

const App = () => {
  const {user, setUser} = useUser();
  const {theme} = useTheme();
  const COLORS = theme === 'dark' ? THEMECOLORS.DARK : THEMECOLORS.LIGHT;

  useEffect(() => {
    const checkToken = async () => {
      const userData = await getUserFromToken();
      setUser(userData);
    };
    const init = async () => {
      await checkToken();
    };

    init().finally(async () => {
      await BootSplash.hide({fade: true});
    });
  }, []);

  return (
    <>
      <View style={{flex: 1}}>
        <StatusBar
          backgroundColor={COLORS.primary}
          barStyle={'light-content'}
        />
        <NavigationContainer linking={linking}>
          {user ? <BottomTabs /> : <AuthStack />}
        </NavigationContainer>
      </View>
      <FlashMessage position={'top'} />
    </>
  );
};

const AppWithContext = () => {
  return (
    <ThemeContextProvider>
      <UserContextProvider>
        <App />
      </UserContextProvider>
    </ThemeContextProvider>
  );
};

export default AppWithContext;
