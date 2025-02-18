// src/screens/ChatScreen.js
import React, { useState, useRef } from 'react';
import { View, ScrollView, Image, Text, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ChatBubble from '../components/ChatBubble';
import ChatInput from '../components/ChatInput';

export default function ChatScreen({ route }) {
  const { profile } = route.params || {
    profile: {
      name: 'AI Companion',
      imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2',
      personality: 'Friendly & Helpful'
    }
  };

  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const scrollViewRef = useRef();

  const sendMessage = () => {
    if (message.trim() === '') return;

    const newMessage = {
      id: Date.now(),
      text: message,
      timestamp: new Date().toLocaleTimeString(),
      isUser: true
    };

    setMessages(prev => [...prev, newMessage]);
    setMessage('');

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        text: `Hi! I'm ${profile.name}. This is a sample response to demonstrate the chat interface.`,
        timestamp: new Date().toLocaleTimeString(),
        isUser: false
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Chat Header */}
      <View className="flex-row items-center p-3 border-b border-gray-200">
        <Image
          source={{ uri: profile.imageUrl }}
          className="w-10 h-10 rounded-full"
        />
        <View className="ml-3">
          <Text className="font-semibold text-gray-800 text-lg">
            {profile.name}
          </Text>
          <Text className="text-gray-500 text-sm">
            {profile.personality}
          </Text>
        </View>
      </View>

      {/* Chat Messages */}
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView
          className="flex-1 p-4"
          ref={scrollViewRef}
          onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
        >
          {messages.map(msg => (
            <ChatBubble
              key={msg.id}
              message={msg}
              isUser={msg.isUser}
            />
          ))}
        </ScrollView>

        {/* Chat Input */}
        <ChatInput
          message={message}
          setMessage={setMessage}
          onSend={sendMessage}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}