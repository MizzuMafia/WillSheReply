// src/components/QuickActions.js
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function QuickActions() {
  const navigation = useNavigation();

  return (
    <View className="flex-row justify-between mb-6">
      <TouchableOpacity
        className="items-center bg-purple-100 rounded-xl p-4 flex-1 mx-2"
        onPress={() => navigation.navigate('Profiles')}
      >
        <Ionicons name="people" size={24} color="#8B5CF6" />
        <Text className="text-purple-600 mt-2 font-medium">Find AI</Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        className="items-center bg-blue-100 rounded-xl p-4 flex-1 mx-2"
        onPress={() => navigation.navigate('Settings')}
      >
        <Ionicons name="settings" size={24} color="#3B82F6" />
        <Text className="text-blue-600 mt-2 font-medium">Settings</Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        className="items-center bg-pink-100 rounded-xl p-4 flex-1 mx-2"
        onPress={() => navigation.navigate('Profiles')}
      >
        <Ionicons name="heart" size={24} color="#EC4899" />
        <Text className="text-pink-600 mt-2 font-medium">Favorites</Text>
      </TouchableOpacity>
    </View>
  );
}