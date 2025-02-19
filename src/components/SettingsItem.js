// src/components/SettingsItem.js
import { View, Text, TouchableOpacity, Switch, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function SettingsItem({ 
  icon, 
  title, 
  subtitle, 
  type = 'navigate',
  value,
  onPress,
  onValueChange 
}) {
  return (
    <TouchableOpacity 
      className="flex-row items-center p-4 bg-white mb-[1px]"
      onPress={onPress}
      android_ripple={{ color: 'rgba(139, 92, 246, 0.1)' }}
      activeOpacity={Platform.OS === 'ios' ? 0.7 : 0.9}
      disabled={type === 'switch'}
    >
      <View className="w-8 h-8 bg-purple-100 rounded-full items-center justify-center">
        <Ionicons name={icon} size={18} color="#8B5CF6" />
      </View>
      
      <View className="flex-1 ml-3">
        <Text className="text-gray-800 font-medium">{title}</Text>
        {subtitle && (
          <Text className="text-gray-500 text-sm mt-0.5">{subtitle}</Text>
        )}
      </View>

      {type === 'navigate' && (
        <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
      )}
      
      {type === 'switch' && (
        <Switch
          value={value}
          onValueChange={onValueChange}
          trackColor={{ false: '#D1D5DB', true: '#C4B5FD' }}
          thumbColor={value ? '#8B5CF6' : '#9CA3AF'}
          style={Platform.select({
            android: { transform: [{ scale: 1.1 }] }
          })}
        />
      )}
    </TouchableOpacity>
  );
}