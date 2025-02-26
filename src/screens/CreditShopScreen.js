import { View, Text, ScrollView, SafeAreaView } from 'react-native';
import PriceCard from '../components/PriceCard';
import SubscriptionCard from '../components/SubscriptionCard';

const oneTimePackages = [
  { credits: 100, price: "1.99", type: "one-time" },
  { credits: 200, price: "3.49", savings: "0.50", type: "one-time" },
  { credits: 500, price: "8.99", savings: "1.00", type: "one-time" },
  { credits: 1000, price: "17.99", savings: "2.00", type: "one-time" },
  { credits: 5000, price: "89.99", savings: "10.00", type: "one-time" },
  { credits: 10000, price: "179.99", savings: "20.00", type: "one-time" }
];

const subscriptionPlans = [
  {
    name: "Weekly",
    credits: "105",
    creditsPerDay: "15/day",
    price: "4.99",
    type: "recurring"
  },
  {
    name: "Monthly",
    credits: "450",
    creditsPerDay: "15/day",
    price: "14.99",
    type: "recurring"
  },
  {
    name: "Quarterly",
    credits: "1350",
    creditsPerDay: "450/month",
    price: "39.99",
    bonus: "Bonus Avatar",
    type: "recurring"
  },
  {
    name: "Yearly",
    credits: "5400",
    creditsPerDay: "450/month",
    price: "119.99",
    bonus: "VIP Badge + Early Access",
    type: "recurring"
  }
];

export default function CreditShopScreen() {
  const theme = {
    primary: '#FF6B8E',
    secondary: '#FFD1DC',
    background: '#F5F5F5',
    text: '#333333',
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F5F5F5]">
      <ScrollView className="flex-1 p-4">
        <View className="mb-6">
          <Text className="text-[#333333] text-2xl font-bold mb-2">
            Buy Credits for Will She Reply?
          </Text>
          <Text className="text-[#666666]">
            Choose a package that suits your needs
          </Text>
        </View>

        <View className="mb-6">
          <Text className="text-[#666666] text-sm font-medium mb-3">
            ONE-TIME PURCHASES
          </Text>
          {oneTimePackages.map((pkg, index) => (
            <PriceCard key={index} package={pkg} />
          ))}
        </View>

        <View className="mb-6">
          <Text className="text-[#666666] text-sm font-medium mb-3">
            SUBSCRIPTIONS
          </Text>
          {subscriptionPlans.map((plan, index) => (
            <SubscriptionCard key={index} plan={plan} />
          ))}
        </View>

        <View className="mb-6 bg-white rounded-xl p-4">
          <Text className="text-[#333333] font-semibold mb-2">
            About Credits
          </Text>
          <Text className="text-[#666666]">
            Credits are used to chat with AI companions. Different AIs may require different amounts of credits.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}