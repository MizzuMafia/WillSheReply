// src/screens/ProfilesScreen.js
import { View, Text, ScrollView, SafeAreaView } from 'react-native';
import ProfileCard from '../components/ProfileCard';

// Sample data - we'll replace this with real data later
const sampleProfiles = [
  {
    id: 1,
    name: 'Sophie',
    personality: 'Creative & Fun',
    interests: ['Art', 'Music', 'Travel'],
    imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop'
  },
  {
    id: 2,
    name: 'Emma',
    personality: 'Intellectual',
    interests: ['Science', 'Books', 'Tech'],
    imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop'
  },
  {
    id: 3,
    name: 'Lily',
    personality: 'Caring & Sweet',
    interests: ['Nature', 'Cooking', 'Yoga'],
    imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop'
  },
  {
    id: 4,
    name: 'Mia',
    personality: 'Adventurous',
    interests: ['Sports', 'Photography', 'Travel'],
    imageUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop'
  }
];

export default function ProfilesScreen() {
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="px-4 py-3 bg-white">
        <Text className="text-2xl font-bold text-gray-800">
          AI Companions
        </Text>
        <Text className="text-gray-500">
          Choose your perfect companion
        </Text>
      </View>
      
      <ScrollView className="flex-1 pt-4">
        <View className="flex-row flex-wrap justify-center">
          {sampleProfiles.map(profile => (
            <ProfileCard key={profile.id} profile={profile} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}