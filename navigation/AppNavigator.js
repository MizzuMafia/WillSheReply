import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

// Import screens
import HomeScreen from '../src/screens/HomeScreen';
import ProfilesScreen from '../src/screens/ProfilesScreen';
import ChatScreen from '../src/screens/ChatScreen';
import SettingsScreen from '../src/screens/SettingsScreen';
import CreditShopScreen from '../src/screens/CreditShopScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Theme colors
const theme = {
  primary: '#FF6B8E', // Soft pink for "Will She Reply?"
  secondary: '#FFD1DC', // Light pink accent
  background: '#F5F5F5', // Light gray background
  text: '#333333', // Dark text
};

function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'HomeTab') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Explore') {
            iconName = focused ? 'people' : 'people-outline';
          } else if (route.name === 'Credits') {
            iconName = focused ? 'diamond' : 'diamond-outline';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'settings' : 'settings-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: theme.primary,
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: { backgroundColor: theme.background },
        headerShown: false,
      })}
    >
      <Tab.Screen 
        name="HomeTab" 
        component={HomeScreen} 
        options={{ tabBarLabel: 'Home', tabBarIconStyle: { color: theme.text } }}
      />
      <Tab.Screen 
        name="Explore" 
        component={ProfilesScreen} 
        options={{ tabBarLabel: 'Explore', tabBarIconStyle: { color: theme.text } }}
      />
      <Tab.Screen 
        name="Credits" 
        component={CreditShopScreen} 
        options={{ tabBarLabel: 'Credits', tabBarIconStyle: { color: theme.text } }}
      />
      <Tab.Screen 
        name="Settings" 
        component={SettingsScreen} 
        options={{ tabBarLabel: 'Settings', tabBarIconStyle: { color: theme.text } }}
      />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Main" component={MainTabNavigator} />
      <Stack.Screen name="Chat" component={ChatScreen} />
    </Stack.Navigator>
  );
}