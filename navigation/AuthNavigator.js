import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, ActivityIndicator } from 'react-native';
import { useAuth } from '../src/contexts/AuthContext';

// Import screens
import LoginScreen from '../src/screens/LoginScreen';
import RegisterScreen from '../src/screens/RegisterScreen';
import AppNavigator from './AppNavigator'; // Your existing app navigator

const Stack = createStackNavigator();

// Auth Stack (when user is not logged in)
const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
};

export default function AuthNavigator() {
  const { isLoading, userToken } = useAuth();

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-[#F5F5F5]">
        <ActivityIndicator size="large" color="#FF6B8E" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {userToken ? <AppNavigator /> : <AuthStack />}
    </NavigationContainer>
  );
}