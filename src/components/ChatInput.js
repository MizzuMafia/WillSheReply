import { View, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ChatInput({ message, setMessage, onSend, disabled }) {
  const theme = {
    primary: '#FF6B8E',
    secondary: '#FFD1DC',
    background: '#F5F5F5',
    text: '#333333',
  };

  return (
    <View className="flex-row items-center p-2 bg-[#F5F5F5] border-t border-[#FFD1DC]">
      <TextInput
        className="flex-1 bg-[#FFD1DC] rounded-full px-4 py-2 mr-2"
        placeholder="Type a message..."
        placeholderTextColor="#666666"
        value={message}
        onChangeText={setMessage}
        multiline
        editable={!disabled}
      />
      <TouchableOpacity
        className="bg-[#FF6B8E] w-10 h-10 rounded-full items-center justify-center"
        onPress={onSend}
        disabled={disabled}
      >
        <Ionicons name="send" size={20} color="white" />
      </TouchableOpacity>
    </View>
  );
}