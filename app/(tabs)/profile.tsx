import { StyleSheet, Text, View } from 'react-native';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatar} />
        <Text style={styles.name}>Aaliyah</Text>
        <Text style={styles.handle}>@aaliyah</Text>
        <Text style={styles.bio}>Storyteller • city walks • sunset edits</Text>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statBox}><Text style={styles.statValue}>27.8K</Text><Text style={styles.statLabel}>Followers</Text></View>
        <View style={styles.statBox}><Text style={styles.statValue}>1.4K</Text><Text style={styles.statLabel}>Following</Text></View>
        <View style={styles.statBox}><Text style={styles.statValue}>129</Text><Text style={styles.statLabel}>Videos</Text></View>
      </View>

      <View style={styles.storyRow}>
        {[1, 2, 3].map((story) => (
          <View key={story} style={styles.storyBubble} />
        ))}
      </View>

      <View style={styles.grid}>
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <View key={item} style={styles.tile} />
        ))}
      </View>
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
  header: {
    alignItems: 'center',
    marginBottom: 22,
  },
  avatar: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: '#FF2D55',
    marginBottom: 12,
  },
  name: {
    color: '#fff',
    fontSize: 30,
    fontWeight: '800',
  },
  handle: {
    color: '#8A8F9C',
    fontSize: 16,
    marginTop: 4,
  },
  bio: {
    color: '#B5BCC9',
    fontSize: 14,
    marginTop: 8,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 22,
  },
  statBox: {
    backgroundColor: '#121418',
    flex: 1,
    marginHorizontal: 4,
    paddingVertical: 14,
    borderRadius: 18,
    alignItems: 'center',
  },
  statValue: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '800',
  },
  statLabel: {
    color: '#A0A7B8',
    fontSize: 12,
    marginTop: 6,
  },
  storyRow: {
    flexDirection: 'row',
    marginBottom: 20,
    gap: 12,
  },
  storyBubble: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#1A1E25',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 10,
  },
  tile: {
    width: '31%',
    height: 130,
    borderRadius: 18,
    backgroundColor: '#1A1E25',
  },
});
