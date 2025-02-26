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
  Platform,
  ScrollView
} from 'react-native';
import { useAuth } from '../contexts/AuthContext';

export default function RegisterScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { register, isLoading } = useAuth();

  const handleRegister = async () => {
    // Form validation
    if (!username.trim() || !password.trim() || !confirmPassword.trim()) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return;
    }

    // Call register function
    const result = await register(username, password);
    if (!result.success) {
      Alert.alert('Registration Failed', result.message);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F5F5F5]">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView className="flex-1 px-8">
          <View className="items-center my-8">
            <Text className="text-3xl font-bold text-[#FF6B8E]">
              Create Account
            </Text>
            <Text className="text-[#666666] text-center mt-2">
              Join Will She Reply? to chat with AI companions
            </Text>
          </View>

          <View className="mb-4">
            <Text className="text-[#666666] mb-2 ml-1">Username</Text>
            <TextInput
              className="bg-white rounded-xl px-4 py-3 text-[#333333]"
              value={username}
              onChangeText={setUsername}
              placeholder="Choose a username"
              autoCapitalize="none"
            />
          </View>

          <View className="mb-4">
            <Text className="text-[#666666] mb-2 ml-1">Password</Text>
            <TextInput
              className="bg-white rounded-xl px-4 py-3 text-[#333333]"
              value={password}
              onChangeText={setPassword}
              placeholder="Create a password"
              secureTextEntry
            />
          </View>

          <View className="mb-8">
            <Text className="text-[#666666] mb-2 ml-1">Confirm Password</Text>
            <TextInput
              className="bg-white rounded-xl px-4 py-3 text-[#333333]"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholder="Confirm your password"
              secureTextEntry
            />
          </View>

          <TouchableOpacity
            className={`rounded-xl py-4 items-center mb-4 ${isLoading ? 'bg-[#FFD1DC]' : 'bg-[#FF6B8E]'}`}
            onPress={handleRegister}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text className="text-white font-semibold text-lg">
                Sign Up
              </Text>
            )}
          </TouchableOpacity>

          <View className="flex-row justify-center mb-8">
            <Text className="text-[#666666]">Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text className="text-[#FF6B8E] font-semibold">Log In</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}