// App.js
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, Platform } from 'react-native';

function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home Screen</Text>
    </View>
  );
}

function ProfilesScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Profiles Screen</Text>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings Screen</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Profiles') {
              iconName = focused ? 'people' : 'people-outline';
            } else if (route.name === 'Settings') {
              iconName = focused ? 'settings' : 'settings-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#8B5CF6',
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: {
            height: Platform.OS === 'android' ? 60 : 50,
            paddingBottom: Platform.OS === 'android' ? 10 : 0,
            paddingTop: Platform.OS === 'android' ? 10 : 0,
            backgroundColor: '#fff',
            borderTopWidth: 1,
            borderTopColor: '#e5e5e5',
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
          },
          headerStyle: {
            backgroundColor: Platform.OS === 'android' ? '#8B5CF6' : '#fff',
          },
          headerTintColor: Platform.OS === 'android' ? '#fff' : '#000',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        })}
      >
        <Tab.Screen 
          name="Home" 
          component={HomeScreen}
          options={{
            title: 'Home',
          }}
        />
        <Tab.Screen 
          name="Profiles" 
          component={ProfilesScreen}
          options={{
            title: 'AI Profiles',
          }}
        />
        <Tab.Screen 
          name="Settings" 
          component={SettingsScreen}
          options={{
            title: 'Settings',
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}