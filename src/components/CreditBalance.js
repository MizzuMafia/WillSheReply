// src/components/credits/CreditBalance.js
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function CreditBalance({ credits = 0 }) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity 
      className="flex-row items-center bg-gray-800 rounded-full px-4 py-2"
      onPress={() => navigation.navigate('CreditShopScreen.js')}
    >
      <Ionicons name="diamond" size={16} color="#8B5CF6" />
      <Text className="text-white ml-2 font-medium">{credits}</Text>
      <Ionicons name="add-circle" size={16} color="#8B5CF6" className="ml-2" />
    </TouchableOpacity>
  );
}