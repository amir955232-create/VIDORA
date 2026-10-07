import { StyleSheet, Text, View } from 'react-native';

const messages = [
  { name: 'Mia', text: 'Your video just hit 12K views!', time: '2m ago' },
  { name: 'Niko', text: 'New collab idea for the next reel', time: '1h ago' },
  { name: 'Ash', text: 'You were mentioned in a comment', time: '3h ago' },
];

export default function InboxScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inbox</Text>
      {messages.map((message) => (
        <View key={message.name} style={styles.row}>
          <View style={styles.avatar} />
          <View style={styles.content}>
            <Text style={styles.name}>{message.name}</Text>
            <Text style={styles.text}>{message.text}</Text>
          </View>
          <Text style={styles.time}>{message.time}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#09090A',
    paddingHorizontal: 18,
    paddingTop: 56,
  },
  title: {
    color: '#fff',
    fontSize: 32,
    fontWeight: '800',
    marginBottom: 18,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#121418',
    borderRadius: 18,
    padding: 14,
    marginBottom: 12,
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#FF2D55',
    marginRight: 12,
  },
  content: {
    flex: 1,
  },
  name: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
    marginBottom: 4,
  },
  text: {
    color: '#A8AEC0',
    fontSize: 13,
  },
  time: {
    color: '#6C7282',
    fontSize: 12,
  },
});
