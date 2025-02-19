// src/components/credits/PriceCard.js
import { View, Text, TouchableOpacity } from 'react-native';

export default function PriceCard({ package: pkg }) {
  return (
    <TouchableOpacity 
      className="bg-gray-800 rounded-xl p-4 mb-3 flex-row items-center"
    >
      <View className="flex-1">
        <Text className="text-white font-semibold text-lg">
          {pkg.credits} Credits
        </Text>
        {pkg.savings && (
          <Text className="text-green-400 text-sm">
            ${pkg.savings} Savings
          </Text>
        )}
      </View>
      
      <View className="items-end">
        <Text className="text-white text-xl font-bold">
          ${pkg.price}
        </Text>
        <Text className="text-gray-400 text-sm">
          One-Time
        </Text>
      </View>
    </TouchableOpacity>
  );
}


