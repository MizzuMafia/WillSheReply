// src/components/ChatBubble.js
import { View, Text } from 'react-native';

export default function ChatBubble({ message, isUser }) {
  return (
    <View className={`flex-row ${isUser ? 'justify-end' : 'justify-start'} mb-2`}>
      <View
        className={`max-w-[80%] rounded-2xl p-3 ${
          isUser
            ? 'bg-purple-500 rounded-tr-none'
            : 'bg-gray-200 rounded-tl-none'
        }`}
      >
        <Text className={isUser ? 'text-white' : 'text-gray-800'}>
          {message.text}
        </Text>
        <Text
          className={`text-xs mt-1 ${
            isUser ? 'text-purple-200' : 'text-gray-500'
          }`}
        >
          {message.timestamp}
        </Text>
      </View>
    </View>
  );
}



