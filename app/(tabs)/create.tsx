import { useState } from 'react';
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { ResizeMode, Video } from 'expo-av';
import * as ImagePicker from 'expo-image-picker';

export default function CreateScreen() {
  const [caption, setCaption] = useState('');
  const [hashtags, setHashtags] = useState('#travel #sunset #storytime');
  const [selectedVideoUri, setSelectedVideoUri] = useState<string | null>(null);

  const pickVideo = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert('Permission required', 'Please allow access to your videos to post a short clip.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      quality: 1,
      allowsEditing: false,
    });

    if (!result.canceled && result.assets[0]?.uri) {
      setSelectedVideoUri(result.assets[0].uri);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>Create</Text>
        <Pressable style={styles.draftButton}>
          <Text style={styles.draftText}>Drafts</Text>
        </Pressable>
      </View>

      <Pressable onPress={pickVideo} style={styles.uploadArea}>
        {selectedVideoUri ? (
          <Video
            source={{ uri: selectedVideoUri }}
            style={styles.preview}
            resizeMode={ResizeMode.COVER}
            shouldPlay={false}
            useNativeControls
            isMuted
          />
        ) : (
          <View style={styles.placeholder}>
            <Text style={styles.plus}>＋</Text>
            <Text style={styles.uploadText}>Select video</Text>
          </View>
        )}
      </Pressable>

      <Text style={styles.sectionLabel}>Caption</Text>
      <TextInput
        value={caption}
        onChangeText={setCaption}
        placeholder="What is your video about?"
        placeholderTextColor="#7B8294"
        multiline
        numberOfLines={4}
        style={styles.textArea}
      />

      <Text style={styles.sectionLabel}>Hashtags</Text>
      <TextInput
        value={hashtags}
        onChangeText={setHashtags}
        placeholder="#travel #sunset"
        placeholderTextColor="#7B8294"
        style={styles.input}
      />

      <View style={styles.metaRow}>
        <Text style={styles.metaLabel}>Visibility</Text>
        <Text style={styles.metaValue}>Friends</Text>
      </View>

      <View style={styles.metaRow}>
        <Text style={styles.metaLabel}>Location</Text>
        <Text style={styles.metaValue}>Miami Beach</Text>
      </View>

      <Pressable style={[styles.postButton, !selectedVideoUri && styles.postButtonDisabled]} disabled={!selectedVideoUri}>
        <Text style={styles.postButtonText}>{selectedVideoUri ? 'Post' : 'Select a video to post'}</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#09090A',
  },
  content: {
    paddingHorizontal: 18,
    paddingTop: 56,
    paddingBottom: 40,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18,
  },
  title: {
    color: '#fff',
    fontSize: 32,
    fontWeight: '800',
  },
  draftButton: {
    backgroundColor: '#171A20',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
  },
  draftText: {
    color: '#fff',
    fontWeight: '700',
  },
  uploadArea: {
    width: '100%',
    height: 260,
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: '#111318',
    borderWidth: 1,
    borderColor: '#232833',
    marginBottom: 20,
  },
  preview: {
    width: '100%',
    height: '100%',
    backgroundColor: '#000',
  },
  placeholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#151922',
  },
  plus: {
    color: '#fff',
    fontSize: 44,
    fontWeight: '300',
    marginBottom: 8,
  },
  uploadText: {
    color: '#EAEAF2',
    fontSize: 18,
    fontWeight: '700',
  },
  sectionLabel: {
    color: '#E7E9EC',
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 10,
  },
  textArea: {
    backgroundColor: '#12161B',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#232833',
    minHeight: 110,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#fff',
    marginBottom: 18,
    textAlignVertical: 'top',
  },
  input: {
    backgroundColor: '#12161B',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#232833',
    height: 52,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#fff',
    marginBottom: 18,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#1A1E26',
  },
  metaLabel: {
    color: '#9BA3B3',
    fontSize: 15,
  },
  metaValue: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
  },
  postButton: {
    marginTop: 24,
    backgroundColor: '#FF2D55',
    borderRadius: 18,
    height: 54,
    alignItems: 'center',
    justifyContent: 'center',
  },
  postButtonDisabled: {
    opacity: 0.45,
  },
  postButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '800',
  },
});
