// src/components/ProfileCard.js
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function ProfileCard({ profile }) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity 
      className="bg-white rounded-2xl shadow-sm mb-4 overflow-hidden w-[160px] mx-2"
      onPress={() => navigation.navigate('Chat', { profile })}
    >
      <Image 
        source={{ uri: profile.imageUrl }}
        className="w-full h-[160px]"
        resizeMode="cover"
      />
      <View className="p-3">
        <Text className="text-lg font-semibold text-gray-800">
          {profile.name}
        </Text>
        <Text className="text-sm text-gray-500 mb-2">
          {profile.personality}
        </Text>
        <View className="flex-row flex-wrap gap-1">
          {profile.interests.slice(0, 2).map((interest, index) => (
            <View 
              key={index} 
              className="bg-purple-100 rounded-full px-2 py-1"
            >
              <Text className="text-xs text-purple-700">
                {interest}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </TouchableOpacity>
  );
}

