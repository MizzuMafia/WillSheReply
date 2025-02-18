// src/screens/SettingsScreen.js
import { useState } from 'react';
import { View, Text, ScrollView, SafeAreaView, TouchableOpacity, Alert } from 'react-native';
import SettingsItem from '../components/SettingsItem';

export default function SettingsScreen() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [soundEffects, setSoundEffects] = useState(true);

  const showLanguageOptions = () => {
    Alert.alert(
      'Select Language',
      'Choose your preferred language',
      [
        { text: 'English', onPress: () => console.log('English selected') },
        { text: 'Spanish', onPress: () => console.log('Spanish selected') },
        { text: 'French', onPress: () => console.log('French selected') },
        { text: 'Cancel', style: 'cancel' }
      ]
    );
  };

  const showPrivacyPolicy = () => {
    Alert.alert(
      'Privacy Policy',
      'Our privacy policy details how we handle your data and ensure your privacy.',
      [{ text: 'OK' }]
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <ScrollView>
        {/* Profile Section */}
        <View className="bg-white p-4 items-center mb-6">
          <View className="w-20 h-20 bg-purple-100 rounded-full items-center justify-center mb-3">
            <Text className="text-2xl">👤</Text>
          </View>
          <Text className="text-xl font-semibold text-gray-800">User Profile</Text>
          <TouchableOpacity>
            <Text className="text-purple-600 mt-1">Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Preferences */}
        <View className="mb-6">
          <Text className="text-gray-500 text-sm font-medium px-4 mb-2">
            PREFERENCES
          </Text>
          <SettingsItem
            icon="notifications"
            title="Notifications"
            subtitle="Enable push notifications"
            type="switch"
            value={notifications}
            onValueChange={setNotifications}
          />
          <SettingsItem
            icon="moon"
            title="Dark Mode"
            subtitle="Switch to dark theme"
            type="switch"
            value={darkMode}
            onValueChange={setDarkMode}
          />
          <SettingsItem
            icon="volume-high"
            title="Sound Effects"
            type="switch"
            value={soundEffects}
            onValueChange={setSoundEffects}
          />
          <SettingsItem
            icon="language"
            title="Language"
            subtitle="English"
            onPress={showLanguageOptions}
          />
        </View>

        {/* Account */}
        <View className="mb-6">
          <Text className="text-gray-500 text-sm font-medium px-4 mb-2">
            ACCOUNT
          </Text>
          <SettingsItem
            icon="person"
            title="Account Details"
            onPress={() => console.log('Account details')}
          />
          <SettingsItem
            icon="key"
            title="Change Password"
            onPress={() => console.log('Change password')}
          />
        </View>

        {/* About */}
        <View className="mb-6">
          <Text className="text-gray-500 text-sm font-medium px-4 mb-2">
            ABOUT
          </Text>
          <SettingsItem
            icon="information-circle"
            title="Privacy Policy"
            onPress={showPrivacyPolicy}
          />
          <SettingsItem
            icon="help-circle"
            title="Help & Support"
            onPress={() => console.log('Help & Support')}
          />
          <SettingsItem
            icon="document-text"
            title="Terms of Service"
            onPress={() => console.log('Terms of Service')}
          />
        </View>

        {/* Version */}
        <View className="items-center p-4">
          <Text className="text-gray-400 text-sm">Version 1.0.0</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}