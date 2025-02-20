// src/components/ChatInput.js
import { View, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ChatInput({ message, setMessage, onSend }) {
  return (
    <View className="flex-row items-center p-2 bg-white border-t border-gray-200">
      <TextInput
        className="flex-1 bg-gray-100 rounded-full px-4 py-2 mr-2"
        placeholder="Type a message..."
        value={message}
        onChangeText={setMessage}
        multiline
      />
      <TouchableOpacity
        className="bg-purple-500 w-10 h-10 rounded-full items-center justify-center"
        onPress={onSend}
      >
        <Ionicons name="send" size={20} color="white" />
      </TouchableOpacity>
    </View>
  );
}