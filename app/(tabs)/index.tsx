import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { AVPlaybackStatus, ResizeMode, Video } from 'expo-av';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

type VideoItem = {
  id: string;
  uri: string;
  user: string;
  handle: string;
  caption: string;
  likes: number;
  comments: number;
  shares: number;
  album: string;
  avatar: string;
  sound: string;
};

const videoFeed: VideoItem[] = [
  {
    id: '1',
    uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    user: 'aaliyah',
    handle: '@aaliyah',
    caption: 'Golden hour edits and city lights 🌆✨',
    likes: 24800,
    comments: 1430,
    shares: 620,
    album: 'Night Walks',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80',
    sound: 'Night drive — original audio',
  },
  {
    id: '2',
    uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    user: 'neon.city',
    handle: '@neon.city',
    caption: 'Late-night soundcheck in the studio 🎧',
    likes: 19650,
    comments: 980,
    shares: 510,
    album: 'After Dark',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    sound: 'Studio pulse — live mix',
  },
  {
    id: '3',
    uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    user: 'harborwave',
    handle: '@harborwave',
    caption: 'Coastal drives and warm sunset playlists 🚗💙',
    likes: 32200,
    comments: 1175,
    shares: 840,
    album: 'Summer Drift',
    avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=300&q=80',
    sound: 'Coastline radio — 110 BPM',
  },
];

function formatCount(value: number) {
  if (value >= 1000) {
    return `${(value / 1000).toFixed(value >= 10000 ? 0 : 1)}K`;
  }
  return `${value}`;
}

function VideoCard({ item, isActive }: { item: VideoItem; isActive: boolean }) {
  const videoRef = useRef<Video>(null);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(item.likes);
  const [showComments, setShowComments] = useState(false);
  const mockComments = [
    { user: 'maria', text: 'This edit is unreal 😍' },
    { user: 'sam', text: 'The lighting in this is so clean.' },
    { user: 'riley', text: 'Saved this for inspiration ✨' },
  ];

  useEffect(() => {
    if (!videoRef.current) return;

    if (isActive) {
      videoRef.current.playAsync().catch(() => undefined);
      return;
    }

    videoRef.current.pauseAsync().catch(() => undefined);
  }, [isActive]);

  const toggleLike = () => {
    setLiked((current) => {
      const next = !current;
      setLikeCount((value) => value + (next ? 1 : -1));
      return next;
    });
  };

  return (
    <View style={styles.page}>
      <Video
        ref={videoRef}
        source={{ uri: item.uri }}
        style={styles.video}
        resizeMode={ResizeMode.COVER}
        shouldPlay={isActive}
        isLooping
        useNativeControls={false}
        onPlaybackStatusUpdate={(status) => {
          const playbackStatus = status as AVPlaybackStatus & { didJustFinish?: boolean };
          if (playbackStatus?.didJustFinish) {
            videoRef.current?.replayAsync();
          }
        }}
      />

      <View style={styles.darkOverlay} />
      <View style={styles.gradientOverlay} />

      <View style={styles.topBar} pointerEvents="none">
        <Text style={styles.brand}>VIDORA</Text>
        <View style={styles.trendingWrap}>
          {['Trending', 'Following', 'For You'].map((tab, index) => (
            <Text key={tab} style={[styles.tab, index === 2 && styles.tabActive]}>
              {tab}
            </Text>
          ))}
        </View>
      </View>

      <View style={styles.songPill} pointerEvents="none">
        <Text style={styles.songIcon}>♫</Text>
        <Text style={styles.songText} numberOfLines={1}>{item.sound}</Text>
      </View>

      <View style={styles.bottomInfo} pointerEvents="box-none">
        <View style={styles.userInfo}>
          <Image source={{ uri: item.avatar }} style={styles.avatar} />
          <View style={styles.userTextWrap}>
            <Text style={styles.userName}>{item.user}</Text>
            <Text style={styles.handle}>{item.handle}</Text>
          </View>
          <TouchableOpacity style={styles.followButton} activeOpacity={0.8}>
            <Text style={styles.followText}>Follow</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.caption}>{item.caption}</Text>
        <Text style={styles.album}>#{item.album}</Text>
      </View>

      <View style={styles.actionPanel} pointerEvents="box-none">
        <TouchableOpacity style={styles.actionButton} activeOpacity={0.8} onPress={toggleLike}>
          <Text style={[styles.actionIcon, liked && styles.actionIconActive]}>♥</Text>
          <Text style={styles.actionValue}>{formatCount(likeCount)}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton} activeOpacity={0.8} onPress={() => setShowComments(true)}>
          <Text style={styles.actionIcon}>💬</Text>
          <Text style={styles.actionValue}>{formatCount(item.comments)}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton} activeOpacity={0.8}>
          <Text style={styles.actionIcon}>↗</Text>
          <Text style={styles.actionValue}>{formatCount(item.shares)}</Text>
        </TouchableOpacity>
      </View>

      <Modal transparent visible={showComments} animationType="slide" onRequestClose={() => setShowComments(false)}>
        <TouchableWithoutFeedback onPress={() => setShowComments(false)}>
          <View style={styles.modalBackdrop} />
        </TouchableWithoutFeedback>

        <View style={styles.commentSheet}>
          <View style={styles.sheetHeader}>
            <Text style={styles.sheetTitle}>Comments</Text>
            <TouchableOpacity onPress={() => setShowComments(false)}>
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>
          </View>

          <ScrollView contentContainerStyle={styles.commentsList}>
            {mockComments.map((comment) => (
              <View key={comment.user} style={styles.commentItem}>
                <View style={styles.commentAvatar} />
                <View style={styles.commentBody}>
                  <Text style={styles.commentUser}>{comment.user}</Text>
                  <Text style={styles.commentText}>{comment.text}</Text>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
}

export default function HomeScreen() {
  const [activeId, setActiveId] = useState<string>(videoFeed[0]?.id ?? '');

  const onViewableItemsChanged = useCallback(({ viewableItems }: { viewableItems: Array<{ item: VideoItem }> }) => {
    const firstVisible = viewableItems[0];
    if (firstVisible?.item?.id) {
      setActiveId(firstVisible.item.id);
    }
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <FlatList
        data={videoFeed}
        renderItem={({ item }) => <VideoCard item={item} isActive={item.id === activeId} />}
        keyExtractor={(item) => item.id}
        pagingEnabled
        snapToAlignment="start"
        decelerationRate="fast"
        showsVerticalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{ itemVisiblePercentThreshold: 60, minimumViewTime: 200 }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  page: {
    height: SCREEN_HEIGHT,
    width: '100%',
    backgroundColor: '#000',
    position: 'relative',
  },
  video: {
    width: '100%',
    height: '100%',
    backgroundColor: '#101010',
  },
  darkOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0,0,0,0.18)',
  },
  topBar: {
    position: 'absolute',
    top: 18,
    left: 0,
    right: 0,
    paddingHorizontal: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  brand: {
    color: '#fff',
    fontSize: 30,
    fontWeight: '900',
    letterSpacing: 1,
  },
  trendingWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  tab: {
    color: '#f5f5f5',
    fontSize: 14,
    fontWeight: '700',
    opacity: 0.55,
  },
  tabActive: {
    opacity: 1,
  },
  gradientOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0,0,0,0.22)',
  },
  songPill: {
    position: 'absolute',
    left: 18,
    top: 82,
    maxWidth: 220,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  songIcon: {
    color: '#fff',
    fontSize: 14,
    marginRight: 6,
  },
  songText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
    maxWidth: 180,
  },
  bottomInfo: {
    position: 'absolute',
    left: 18,
    right: 92,
    bottom: 28,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    borderColor: '#fff',
    borderWidth: 2,
  },
  userTextWrap: {
    marginLeft: 12,
    flex: 1,
  },
  userName: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '800',
  },
  handle: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 13,
    marginTop: 2,
  },
  followButton: {
    backgroundColor: '#ff2d55',
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  followText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '700',
  },
  caption: {
    color: '#fff',
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
    marginBottom: 4,
  },
  album: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
    opacity: 0.9,
  },
  actionPanel: {
    position: 'absolute',
    right: 14,
    bottom: 30,
    alignItems: 'center',
  },
  actionButton: {
    alignItems: 'center',
    marginBottom: 18,
  },
  actionIcon: {
    fontSize: 28,
    color: '#fff',
    marginBottom: 4,
  },
  actionIconActive: {
    color: '#ff2d55',
  },
  actionValue: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
  },
  commentSheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '52%',
    backgroundColor: '#12161B',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 18,
    paddingTop: 18,
  },
  sheetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sheetTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '800',
  },
  closeText: {
    color: '#FF2D55',
    fontWeight: '700',
  },
  commentsList: {
    paddingBottom: 20,
  },
  commentItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#1A1E25',
    borderRadius: 16,
    padding: 12,
    marginBottom: 10,
  },
  commentAvatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#FF2D55',
    marginRight: 12,
  },
  commentBody: {
    flex: 1,
  },
  commentUser: {
    color: '#fff',
    fontWeight: '700',
    marginBottom: 4,
  },
  commentText: {
    color: '#D5DBE7',
    fontSize: 13,
    lineHeight: 18,
  },
});
