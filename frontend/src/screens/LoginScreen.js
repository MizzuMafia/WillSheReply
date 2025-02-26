import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { useAuth } from '../contexts/AuthContext';

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading } = useAuth();

  const handleLogin = async () => {
    if (!username.trim() || !password.trim()) {
      Alert.alert('Error', 'Please enter both username and password');
      return;
    }

    const result = await login(username, password);
    if (!result.success) {
      Alert.alert('Login Failed', result.message);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F5F5F5]">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1 justify-center px-8"
      >
        <View className="items-center mb-8">
          <Text className="text-3xl font-bold text-[#FF6B8E]">
            Will She Reply?
          </Text>
          <Text className="text-[#666666] text-center mt-2">
            Log in to connect with your AI companions
          </Text>
        </View>

        <View className="mb-4">
          <Text className="text-[#666666] mb-2 ml-1">Username</Text>
          <TextInput
            className="bg-white rounded-xl px-4 py-3 text-[#333333]"
            value={username}
            onChangeText={setUsername}
            placeholder="Enter your username"
            autoCapitalize="none"
          />
        </View>

        <View className="mb-8">
          <Text className="text-[#666666] mb-2 ml-1">Password</Text>
          <TextInput
            className="bg-white rounded-xl px-4 py-3 text-[#333333]"
            value={password}
            onChangeText={setPassword}
            placeholder="Enter your password"
            secureTextEntry
          />
        </View>

        <TouchableOpacity
          className={`rounded-xl py-4 items-center ${isLoading ? 'bg-[#FFD1DC]' : 'bg-[#FF6B8E]'}`}
          onPress={handleLogin}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text className="text-white font-semibold text-lg">
              Log In
            </Text>
          )}
        </TouchableOpacity>

        <View className="flex-row justify-center mt-6">
          <Text className="text-[#666666]">Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text className="text-[#FF6B8E] font-semibold">Sign Up</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}