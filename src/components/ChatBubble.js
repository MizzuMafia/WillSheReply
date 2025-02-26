import { View, Text } from 'react-native';

export default function ChatBubble({ message, isUser }) {
  const theme = {
    primary: '#FF6B8E',
    secondary: '#FFD1DC',
    background: '#F5F5F5',
    text: '#333333',
  };

  return (
    <View className={`flex-row ${isUser ? 'justify-end' : 'justify-start'} mb-2`}>
      <View
        className={`max-w-[80%] rounded-2xl p-3 ${
          isUser
            ? 'bg-[#FF6B8E] rounded-tr-none'
            : 'bg-[#FFD1DC] rounded-tl-none'
        }`}
      >
        <Text className={isUser ? 'text-white' : 'text-[#333333]'}>
          {message.text}
        </Text>
        <Text
          className={`text-xs mt-1 ${
            isUser ? 'text-white' : 'text-[#666666]'
          }`}
        >
          {message.timestamp}
        </Text>
      </View>
    </View>
  );
}