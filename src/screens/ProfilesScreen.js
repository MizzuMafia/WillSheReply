import React from 'react';
import { View, Text, FlatList, SafeAreaView } from 'react-native';
import ProfileCard from '../components/ProfileCard';
import aiProfiles from '../data/aiProfiles';

const ProfileCardMemo = React.memo(ProfileCard);

export default function ProfilesScreen() {
  const theme = {
    primary: '#FF6B8E',
    secondary: '#FFD1DC',
    background: '#F5F5F5',
    text: '#333333',
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F5F5F5]">
      <View className="px-4 py-3 bg-white">
        <Text className="text-2xl font-bold text-[#333333]">
          AI Companions
        </Text>
        <Text className="text-[#666666]">
          Choose your perfect companion
        </Text>
      </View>
      <FlatList
        data={aiProfiles}
        renderItem={({ item }) => <ProfileCardMemo profile={item} />}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        contentContainerStyle={{ padding: 16 }}
      />
    </SafeAreaView>
  );
}