// App.js
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { Platform } from 'react-native';

// Import all screens
import HomeScreen from './src/screens/HomeScreen';
import ProfilesScreen from './src/screens/ProfilesScreen';
import ChatScreen from './src/screens/ChatScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import CreditShopScreen from './src/screens/credits/CreditShopScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Profiles') {
            iconName = focused ? 'people' : 'people-outline';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'settings' : 'settings-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#8B5CF6',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          height: Platform.OS === 'android' ? 60 : undefined,
          paddingBottom: Platform.OS === 'android' ? 8 : undefined,
        },
        tabBarHideOnKeyboard: true,
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen 
        name="Profiles" 
        component={ProfilesScreen}
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: Platform.OS === 'android' ? '#8B5CF6' : 'white',
          },
          headerTintColor: Platform.OS === 'android' ? 'white' : '#000',
        }}
      />
      <Tab.Screen 
        name="Settings" 
        component={SettingsScreen}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          animationEnabled: true,
          animation: Platform.OS === 'android' ? 'slide_from_right' : undefined,
        }}
      >
        <Stack.Screen 
          name="Main" 
          component={TabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Chat" 
          component={ChatScreen}
          options={{ 
            headerShown: false,
            animation: Platform.OS === 'android' ? 'slide_from_right' : undefined,
          }}
        />
        <Stack.Screen 
          name="CreditShop" 
          component={CreditShopScreen}
          options={{
            headerShown: true,
            headerTitle: 'Buy Credits',
            presentation: Platform.OS === 'ios' ? 'modal' : 'card',
            headerStyle: {
              backgroundColor: '#000000',
            },
            headerTintColor: '#fff',
            animation: Platform.OS === 'android' ? 'slide_from_bottom' : undefined,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}