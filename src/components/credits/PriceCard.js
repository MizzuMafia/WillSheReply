// src/components/credits/PriceCard.js
import { View, Text, TouchableOpacity, Platform } from 'react-native';

export default function PriceCard({ package: pkg }) {
  return (
    <TouchableOpacity 
      className="bg-gray-800 rounded-xl p-4 mb-3 flex-row items-center"
      android_ripple={{ color: 'rgba(139, 92, 246, 0.3)' }}
      activeOpacity={Platform.OS === 'ios' ? 0.7 : 0.9}
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

// src/components/credits/SubscriptionCard.js
import { View, Text, TouchableOpacity, Platform } from 'react-native';

export default function SubscriptionCard({ plan }) {
  return (
    <TouchableOpacity 
      className="bg-gray-800 rounded-xl p-4 mb-3"
      android_ripple={{ color: 'rgba(139, 92, 246, 0.3)' }}
      activeOpacity={Platform.OS === 'ios' ? 0.7 : 0.9}
    >
      <View className="flex-row justify-between items-start mb-2">
        <Text className="text-white font-semibold text-lg">
          {plan.name}
        </Text>
        <View className="items-end">
          <Text className="text-white text-xl font-bold">
            ${plan.price}
          </Text>
          <Text className="text-gray-400 text-sm">
            Recurring
          </Text>
        </View>
      </View>
      
      <Text className="text-gray-400">
        {plan.credits} Credits ({plan.creditsPerDay}/day)
      </Text>
      
      {plan.bonus && (
        <View className="bg-purple-900 rounded-lg px-3 py-1 mt-2 self-start">
          <Text className="text-purple-200">{plan.bonus}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}