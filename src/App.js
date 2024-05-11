import React, {useEffect} from 'react';
import {StatusBar, View, Text} from 'react-native';
import {useIsFocused, CommonActions} from '@react-navigation/native';

// Constants
import {CONSTANTS} from '@utils';
import THEMECOLORS from '@utils/colors';

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
  CreateAndUpdateAdvertisement,
  Login,
  Register,
  EmailValidation,
  AdvertisementDetail,
  ProfileEdit,
  ChangePassword,
  Messages,
  Chat,
} from '@pages';

// Context
import UserContextProvider, {useUser} from './context/UserProvider';
import ThemeContextProvider, {useTheme} from './context/ThemeContext';

// FlashMessage
import FlashMessage from 'react-native-flash-message';

// Storage
import {getUserFromToken} from '@utils/functions';

// Bootsplash
import BootSplash from 'react-native-bootsplash';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// İlanlar sayfası için kullanılan stack
const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false,}}>
      <Stack.Screen component={Home} name="HomeAdvertisementsScreen"/>
      <Stack.Screen
        component={AdvertisementDetailStack}
        name="AdvertisementDetailStack"
      />
    </Stack.Navigator>
  );
};

const ProfileMessagesStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen component={Messages} name="MessageListScreen" />
      <Stack.Screen component={Chat} name="ChatScreen"/>
    </Stack.Navigator>
  );
};

const AdvertisementDetailStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        component={AdvertisementDetail}
        name="AdvertisementDetailScreen"
      />
      <Stack.Screen component={Chat} name="ChatScreen" />
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

const AdvertisementStack = () => {
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
        headerShown: route.key !== "ChatScreen"
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
      <Stack.Screen
        name="EmailVerificationScreen"
        component={EmailValidation}
      />
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
        <NavigationContainer>
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
