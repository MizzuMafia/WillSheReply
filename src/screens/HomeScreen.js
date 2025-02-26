import { View, Text, ScrollView, SafeAreaView } from 'react-native';
import RecentChat from '../components/RecentChat';
import QuickActions from '../components/QuickActions';
import CreditBalance from '../components/CreditBalance';
import aiProfiles from '../data/aiProfiles';

const recentChats = aiProfiles.slice(0, 2).map(profile => ({
  id: profile.id,
  name: profile.name,
  imageUrl: profile.imageUrl,
  lastMessage: `Hey, I’d love to chat with you about ${profile.interests[0]}! 😉`,
  time: 'Now',
  personality: profile.personality
}));

export default function HomeScreen() {
  const theme = {
    primary: '#FF6B8E',
    secondary: '#FFD1DC',
    background: '#F5F5F5',
    text: '#333333',
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F5F5F5]">
      <ScrollView className="flex-1">
        <View className="p-4 bg-white">
          <Text className="text-2xl font-bold text-[#333333]">
            Welcome to Will She Reply? 👋
          </Text>
          <CreditBalance credits={100} />
          <Text className="text-[#666666] mt-1">
            Continue your conversations or start a new one
          </Text>
        </View>

        <View className="p-4">
          <QuickActions />
        </View>

        <View className="flex-row justify-between px-4 mb-6">
          <View className="bg-white p-4 rounded-xl flex-1 mr-2">
            <Text className="text-[#666666]">Total Chats</Text>
            <Text className="text-2xl font-bold text-[#333333]">24</Text>
          </View>
          <View className="bg-white p-4 rounded-xl flex-1 ml-2">
            <Text className="text-[#666666]">AI Friends</Text>
            <Text className="text-2xl font-bold text-[#333333]">{aiProfiles.length}</Text>
          </View>
        </View>

        <View className="px-4">
          <Text className="text-lg font-semibold text-[#333333] mb-3">
            Recent Chats
          </Text>
          {recentChats.map(chat => (
            <RecentChat key={chat.id} chatId={chat.id} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}