import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function ProfileCard({ profile }) {
  const navigation = useNavigation();
  const theme = {
    primary: '#FF6B8E',
    secondary: '#FFD1DC',
    background: '#F5F5F5',
    text: '#333333',
  };

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
        <Text className="text-lg font-semibold text-[#333333]">
          {profile.name}
        </Text>
        <Text className="text-sm text-[#666666] mb-2">
          {profile.personality}
        </Text>
        <View className="flex-row flex-wrap gap-1">
          {profile.interests.slice(0, 2).map((interest, index) => (
            <View 
              key={index} 
              className="bg-[#FFD1DC] rounded-full px-2 py-1"
            >
              <Text className="text-xs text-[#FF6B8E]">
                {interest}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </TouchableOpacity>
  );
}