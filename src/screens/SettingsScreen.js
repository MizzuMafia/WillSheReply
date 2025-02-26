import { useState } from 'react';
import { View, Text, ScrollView, SafeAreaView, TouchableOpacity, Alert } from 'react-native';
import SettingsItem from '../components/SettingsItem';

export default function SettingsScreen() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [soundEffects, setSoundEffects] = useState(true);

  const theme = {
    primary: '#FF6B8E',
    secondary: '#FFD1DC',
    background: '#F5F5F5',
    text: '#333333',
  };

  const showLanguageOptions = () => {
    Alert.alert(
      'Select Language',
      'Choose your preferred language',
      [
        { text: 'English', onPress: () => console.log('English selected') },
        { text: 'Hinglish', onPress: () => console.log('Hinglish selected') },
        { text: 'Cancel', style: 'cancel' }
      ]
    );
  };

  const showPrivacyPolicy = () => {
    Alert.alert(
      'Privacy Policy',
      'Our privacy policy details how we handle your data and ensure your privacy for Will She Reply?.',
      [{ text: 'OK' }]
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F5F5F5]">
      <ScrollView>
        <View className="bg-white p-4 items-center mb-6">
          <View className="w-20 h-20 bg-[#FFD1DC] rounded-full items-center justify-center mb-3">
            <Text className="text-2xl">👤</Text>
          </View>
          <Text className="text-xl font-semibold text-[#333333]">User Profile</Text>
          <TouchableOpacity>
            <Text className="text-[#FF6B8E] mt-1">Edit Profile</Text>
          </TouchableOpacity>
        </View>

        <View className="mb-6">
          <Text className="text-[#666666] text-sm font-medium px-4 mb-2">
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

        <View className="mb-6">
          <Text className="text-[#666666] text-sm font-medium px-4 mb-2">
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

        <View className="mb-6">
          <Text className="text-[#666666] text-sm font-medium px-4 mb-2">
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

        <View className="items-center p-4">
          <Text className="text-[#666666] text-sm">Version 1.0.0</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}