import React from 'react';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import { colors, spacing, typography } from '../../constants/theme';

const BANNER_URI =
  'https://images.unsplash.com/photo-1490118121068-9d4e5f5e5b0a?w=1200&q=80';

export function Banner() {
  return (
    <View style={styles.wrap}>
      <ImageBackground
        source={{ uri: BANNER_URI }}
        style={styles.image}
        imageStyle={styles.imageRadius}
      >
        <View style={styles.overlay} />
        <View style={styles.content}>
          <Text style={styles.kicker}>New Season</Text>
          <Text style={styles.title}>Refined essentials</Text>
          <Text style={styles.sub}>Tailored for the modern man</Text>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    marginHorizontal: spacing.md,
    marginBottom: spacing.lg,
    borderRadius: 2,
    overflow: 'hidden',
  },
  image: {
    minHeight: 180,
    justifyContent: 'flex-end',
  },
  imageRadius: {
    borderRadius: 2,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(13, 13, 13, 0.35)',
  },
  content: {
    padding: spacing.lg,
  },
  kicker: {
    ...typography.caption,
    color: colors.white,
    marginBottom: spacing.xs,
    opacity: 0.95,
  },
  title: {
    fontSize: 26,
    fontWeight: '300',
    color: colors.white,
    letterSpacing: 2,
    marginBottom: spacing.xs,
  },
  sub: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.85)',
    letterSpacing: 0.3,
  },
});
