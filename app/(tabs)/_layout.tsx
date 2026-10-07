import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View } from 'react-native';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#8A8F9C',
        tabBarStyle: {
          backgroundColor: '#0D0D0F',
          borderTopWidth: 0,
          height: 88,
          paddingBottom: 12,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '700',
          marginTop: 2,
        },
        tabBarIcon: ({ color, size, focused }) => {
          let iconName: keyof typeof Ionicons.glyphMap = 'home-outline';

          if (route.name === 'index') iconName = focused ? 'home' : 'home-outline';
          if (route.name === 'discover') iconName = focused ? 'search' : 'search-outline';
          if (route.name === 'create') iconName = 'add';
          if (route.name === 'inbox') iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
          if (route.name === 'profile') iconName = focused ? 'person' : 'person-outline';

          if (route.name === 'create') {
            return (
              <View style={styles.createButton}>
                <Ionicons name={iconName} size={size + 8} color="#fff" />
              </View>
            );
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tabs.Screen name="index" options={{ title: 'Home' }} />
      <Tabs.Screen name="discover" options={{ title: 'Discover' }} />
      <Tabs.Screen
        name="create"
        options={{
          title: '',
          tabBarLabel: () => null,
        }}
      />
      <Tabs.Screen name="inbox" options={{ title: 'Inbox' }} />
      <Tabs.Screen name="profile" options={{ title: 'Profile' }} />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  createButton: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: '#FF2D55',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -18,
    shadowColor: '#FF2D55',
    shadowOpacity: 0.5,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
  },
});
