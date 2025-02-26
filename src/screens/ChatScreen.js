import React, { useState, useRef, useEffect, useCallback } from 'react';
import { View, ScrollView, Image, Text, KeyboardAvoidingView, Platform, Alert, TouchableOpacity, SafeAreaView } from 'react-native';
import ChatBubble from '../components/ChatBubble';
import ChatInput from '../components/ChatInput';
import axios from 'axios';
import { XAI_API_KEY } from '@env';

export default function ChatScreen({ route }) {
  const { profile } = route.params || {
    profile: {
      name: 'AI Companion',
      imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2',
      personality: 'Friendly & Helpful',
      description: '',
      interests: []
    }
  };

  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollViewRef = useRef();

  // Simple language detection heuristic (expand with a library if needed)
  const detectLanguage = (text) => {
    const hindiKeywords = ['हिंदी', 'है', 'क्या', 'मैं', 'तुम'];
    const textLower = text.toLowerCase();
    const hasHindi = hindiKeywords.some(keyword => textLower.includes(keyword));
    return hasHindi ? 'hinglish' : 'english';
  };

  const sendMessage = useCallback(async () => {
    if (!message.trim()) return;

    const detectedLanguage = detectLanguage(message);
    const newMessage = {
      text: message,
      timestamp: new Date().toLocaleTimeString(),
      isUser: true
    };

    setMessages(prev => [...prev, newMessage]);
    setMessage('');
    setIsLoading(true);

    try {
      const response = await axios.post(
        'https://api.x.ai/v1/chat/completions',
        {
          model: 'grok-2-latest',
          messages: [
            { 
              role: 'system', 
              content: `You are ${profile.name}, a ${profile.age}-year-old female with the personality "${profile.personality}". Your interests are ${profile.interests.join(', ')}. Respond as a girl, naturally and flirtatiously if appropriate, in ${detectedLanguage}. Keep responses engaging, unique, and consistent with your character.` 
            },
            { role: 'user', content: message },
          ],
        },
        {
          headers: {
            'Authorization': `Bearer ${XAI_API_KEY}`,
            'Content-Type': 'application/json'
          },
          timeout: 10000
        }
      );

      const aiResponse = {
        text: response.data.choices[0].message.content.trim(),
        timestamp: new Date().toLocaleTimeString(),
        isUser: false
      };

      setMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      console.error('xAI API Error:', error.response?.data || error.message);
      let errorMessage = 'Failed to get response from AI';
      if (error.response) {
        switch (error.response.status) {
          case 401:
            errorMessage = 'Invalid API key. Please check your credentials.';
            break;
          case 429:
            errorMessage = 'Rate limit exceeded. Try again later.';
            break;
          case 500:
            errorMessage = 'xAI server error. Please try again.';
            break;
          default:
            errorMessage = `Server returned error ${error.response.status}: ${error.response.data?.message || 'Unknown error'}`;
        }
      } else if (error.code === 'ECONNABORTED') {
        errorMessage = 'Request timed out. Please try again.';
      } else {
        errorMessage = 'Network error. Please check your connection and try again.';
      }
      Alert.alert('Error', errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [message, profile]);

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  return (
    <SafeAreaView className="flex-1 bg-[#F5F5F5]">
      {isLoading && (
        <View className="absolute top-0 left-0 right-0 p-2 bg-[#FFD1DC]">
          <Text className="text-[#333333]">AI is typing...</Text>
        </View>
      )}
      <View className="flex-row items-center p-3 border-b border-[#FFD1DC]">
        <Image
          source={{ uri: profile.imageUrl }}
          className="w-10 h-10 rounded-full"
        />
        <View className="ml-3 flex-1">
          <Text className="font-semibold text-[#333333] text-lg">
            {profile.name}
          </Text>
          <Text className="text-[#666666] text-sm">
            {profile.personality}
          </Text>
        </View>
      </View>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView 
          ref={scrollViewRef}
          className="flex-1 p-4"
          contentContainerStyle={{ paddingBottom: 20 }}
        >
          {messages.map((msg, index) => (
            <ChatBubble key={index} message={msg} isUser={msg.isUser} />
          ))}
        </ScrollView>
        <ChatInput 
          message={message} 
          setMessage={setMessage} 
          onSend={sendMessage}
          disabled={isLoading}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}