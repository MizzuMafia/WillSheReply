// src/components/QuickActions.js
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function QuickActions() {
  const navigation = useNavigation();

  const QuickActionButton = ({ icon, color, label, onPress }) => (
    <TouchableOpacity
      className={`items-center bg-${color}-100 rounded-xl p-4 flex-1 mx-2`}
      onPress={onPress}
      android_ripple={{ color: `rgba(${color === 'purple' ? '139, 92, 246' : color === 'blue' ? '59, 130, 246' : '236, 72, 153'}, 0.3)` }}
      activeOpacity={Platform.OS === 'ios' ? 0.7 : 0.9}
    >
      <Ionicons name={icon} size={24} color={`#${color === 'purple' ? '8B5CF6' : color === 'blue' ? '3B82F6' : 'EC4899'}`} />
      <Text className={`text-${color}-600 mt-2 font-medium`}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <View className="flex-row justify-between mb-6">
      <QuickActionButton
        icon="people"
        color="purple"
        label="Find AI"
        onPress={() => navigation.navigate('Profiles')}
      />
      
      <QuickActionButton
        icon="settings"
        color="blue"
        label="Settings"
        onPress={() => navigation.navigate('Settings')}
      />
      
      <QuickActionButton
        icon="heart"
        color="pink"
        label="Favorites"
        onPress={() => navigation.navigate('Profiles')}
      />
    </View>
  );
}