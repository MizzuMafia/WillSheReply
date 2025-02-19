// src/screens/HomeScreen.js
import { View, Text, ScrollView, SafeAreaView } from 'react-native';
import RecentChat from '../components/RecentChat';
import QuickActions from '../components/QuickActions';
import CreditBalance from '../components/credits/CreditBalance';


// Sample data for recent chats
const recentChats = [
  {
    id: 1,
    name: 'Sophie',
    imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2',
    lastMessage: 'I`d love to help you with your project!',
    time: '2m ago',
    personality: 'Creative & Fun'
  },
  {
    id: 2,
    name: 'Emma',
    imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    lastMessage: 'Let`s continue our discussion about science.',
    time: '1h ago',
    personality: 'Intellectual'
  }
];

export default function HomeScreen() {
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1">
        {/* Header */}
        <View className="p-4 bg-white">
          <Text className="text-2xl font-bold text-gray-800">
            Welcome Back 👋
          </Text>
          <CreditBalance credits={100} />
          <Text className="text-gray-500 mt-1">
            Continue your conversations or start a new one
          </Text>
        </View>

        {/* Quick Actions */}
        <View className="p-4">
          <QuickActions />
        </View>

        {/* Stats */}
        <View className="flex-row justify-between px-4 mb-6">
          <View className="bg-white p-4 rounded-xl flex-1 mr-2">
            <Text className="text-gray-500">Total Chats</Text>
            <Text className="text-2xl font-bold text-gray-800">24</Text>
          </View>
          <View className="bg-white p-4 rounded-xl flex-1 ml-2">
            <Text className="text-gray-500">AI Friends</Text>
            <Text className="text-2xl font-bold text-gray-800">8</Text>
          </View>
        </View>

        {/* Recent Chats */}
        <View className="px-4">
          <Text className="text-lg font-semibold text-gray-800 mb-3">
            Recent Chats
          </Text>
          {recentChats.map(chat => (
            <RecentChat key={chat.id} chat={chat} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}