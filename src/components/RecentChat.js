// src/components/RecentChat.js
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import aiProfiles from '../data/aiProfiles';

export default function RecentChat({ chatId }) {
  const navigation = useNavigation();
  const chat = aiProfiles.find(p => p.id === chatId);

  if (!chat) return null;

  return (
    <TouchableOpacity
      className="flex-row items-center p-3 bg-white rounded-xl mb-2"
      onPress={() => navigation.navigate('Chat', { profile: chat })}
    >
      <Image
        source={{ uri: chat.imageUrl }}
        className="w-12 h-12 rounded-full"
      />
      <View className="flex-1 ml-3">
        <Text className="font-semibold text-gray-800">{chat.name}</Text>
        <Text className="text-gray-500 text-sm" numberOfLines={1}>
          {chat.lastMessage || 'Ready to chat!'}
        </Text>
      </View>
      <Text className="text-xs text-gray-400">{chat.time || 'Now'}</Text>
    </TouchableOpacity>
  );
}