import React from 'react';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import { colors, spacing, typography } from '../../constants/theme';

const BANNER = require('../../../assets/images/banner.png');

export function Banner() {
  return (
    <View style={styles.wrap}>
      <ImageBackground
        source={BANNER}
        style={styles.image}
        imageStyle={styles.imageRadius}
        resizeMode="cover"
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
    backgroundColor: colors.background,
  },
  image: {
    // Keep banner dimensions stable across iOS/Android so `cover`
    // crops the same way on both platforms.
    width: '100%',
    height: 200,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  imageRadius: {
    borderRadius: 2,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(13, 13, 13, 0.12)',
  },
  content: {
    paddingTop: spacing.lg,
    paddingRight: spacing.md,
    paddingLeft: spacing.sm,
    paddingBottom: spacing.md,
    maxWidth: '58%',
    alignItems: 'flex-end',
  },
  kicker: {
    ...typography.caption,
    color: colors.white,
    marginBottom: spacing.xs,
    opacity: 0.95,
    textAlign: 'right',
    textShadowColor: 'rgba(0,0,0,0.35)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  title: {
    fontSize: 22,
    fontWeight: '300',
    color: colors.white,
    letterSpacing: 1.5,
    marginBottom: spacing.xs,
    textAlign: 'right',
    textShadowColor: 'rgba(0,0,0,0.4)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  sub: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.92)',
    letterSpacing: 0.3,
    textAlign: 'right',
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
});
