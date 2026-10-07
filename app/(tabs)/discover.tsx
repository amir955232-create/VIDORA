import { StyleSheet, Text, TextInput, View } from 'react-native';

export default function DiscoverScreen() {
  const trends = ['#travel', '#nightlife', '#studio', '#live', '#food'];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Discover</Text>
      <TextInput
        placeholder="Search creators, sounds, hashtags"
        placeholderTextColor="#7B8294"
        style={styles.searchInput}
      />

      <View style={styles.chipRow}>
        {['For You', 'Trending', 'Sketches', 'Music', 'Travel'].map((item) => (
          <View key={item} style={styles.chip}>
            <Text style={styles.chipText}>{item}</Text>
          </View>
        ))}
      </View>

      <View style={styles.trendBox}>
        <Text style={styles.sectionHeading}>Trending now</Text>
        <View style={styles.trendList}>
          {trends.map((tag, index) => (
            <View key={tag} style={styles.trendItem}>
              <Text style={styles.rank}>0{index + 1}</Text>
              <Text style={styles.tag}>{tag}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.grid}>
        {[1, 2, 3, 4].map((item) => (
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
  title: {
    color: '#fff',
    fontSize: 32,
    fontWeight: '800',
    marginBottom: 18,
  },
  searchInput: {
    backgroundColor: '#171A20',
    borderRadius: 18,
    height: 52,
    paddingHorizontal: 18,
    color: '#fff',
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#232833',
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 18,
    gap: 10,
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 9,
    backgroundColor: '#171A20',
    borderRadius: 999,
  },
  chipText: {
    color: '#fff',
    fontWeight: '700',
  },
  trendBox: {
    marginTop: 20,
    backgroundColor: '#111418',
    borderRadius: 20,
    padding: 16,
  },
  sectionHeading: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 12,
  },
  trendList: {
    gap: 10,
  },
  trendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#171B22',
    borderRadius: 12,
    padding: 10,
  },
  rank: {
    color: '#FF2D55',
    fontWeight: '800',
    width: 26,
  },
  tag: {
    color: '#fff',
    fontWeight: '700',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 24,
    justifyContent: 'space-between',
    gap: 10,
  },
  tile: {
    width: '48%',
    height: 180,
    borderRadius: 20,
    backgroundColor: '#1B1B1F',
  },
});
