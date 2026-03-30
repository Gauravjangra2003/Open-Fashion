import React, { useCallback, useRef, useState } from 'react';
import {
  FlatList,
  Image,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, typography } from '../../constants/theme';

const webSlideNoSelect =
  Platform.OS === 'web' ? { userSelect: 'none' } : undefined;

const SLIDES = [
  {
    key: '1',
    image: require('../../../assets/images/Onboarding1.png'),
    title: 'Curated tailoring',
    subtitle: 'Precision cuts and quiet luxury for every day.',
  },
  {
    key: '2',
    image: require('../../../assets/images/Onboarding2.jpeg'),
    title: 'Seasonal essentials',
    subtitle: 'Layered textures in neutral palettes.',
  },
  {
    key: '3',
    image: require('../../../assets/images/Onboarding3.png'),
    title: 'Your wardrobe, refined',
    subtitle: 'Discover menswear designed to last.',
  },
];

export function OnboardingScreen({ navigation }) {
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const listRef = useRef(null);

  const imageHeight = Math.min(screenHeight * 0.52, screenWidth * 1.35);

  const syncIndexFromOffset = useCallback(
    (x) => {
      const w = Math.max(screenWidth, 1);
      const i = Math.min(
        SLIDES.length - 1,
        Math.max(0, Math.round(x / w))
      );
      setIndex((prev) => (prev !== i ? i : prev));
    },
    [screenWidth]
  );

  const onScroll = useCallback(
    (e) => {
      syncIndexFromOffset(e.nativeEvent.contentOffset.x);
    },
    [syncIndexFromOffset]
  );

  const onScrollEnd = useCallback(
    (e) => {
      syncIndexFromOffset(e.nativeEvent.contentOffset.x);
    },
    [syncIndexFromOffset]
  );

  const goNext = useCallback(() => {
    if (index < SLIDES.length - 1) {
      const next = index + 1;
      listRef.current?.scrollToOffset({
        offset: screenWidth * next,
        animated: true,
      });
    } else {
      navigation.replace('SignIn');
    }
  }, [index, navigation, screenWidth]);

  const getItemLayout = useCallback(
    (_, dataIndex) => ({
      length: screenWidth,
      offset: screenWidth * dataIndex,
      index: dataIndex,
    }),
    [screenWidth]
  );

  const renderItem = useCallback(
    ({ item }) => (
      <View
        style={[
          styles.slide,
          { width: screenWidth },
          Platform.OS === 'web' && webSlideNoSelect,
        ]}
      >
        <View style={[styles.imageWrap, { width: screenWidth, height: imageHeight }]}>
          <Image
            source={item.image}
            style={styles.image}
            resizeMode="contain"
            draggable={false}
          />
          <View style={styles.imageOverlay} pointerEvents="none" />
        </View>
        <View style={styles.textBlock}>
          <Text style={styles.title} selectable={false}>
            {item.title}
          </Text>
          <Text style={styles.subtitle} selectable={false}>
            {item.subtitle}
          </Text>
        </View>
      </View>
    ),
    [imageHeight, screenWidth]
  );

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <View style={styles.listSection}>
        <FlatList
          ref={listRef}
          style={[styles.list, Platform.OS === 'web' && styles.listWeb]}
          contentContainerStyle={styles.listContent}
          data={SLIDES}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.key}
          getItemLayout={getItemLayout}
          removeClippedSubviews={false}
          scrollEventThrottle={16}
          onScroll={onScroll}
          onMomentumScrollEnd={onScrollEnd}
          onScrollEndDrag={onScrollEnd}
          keyboardShouldPersistTaps="handled"
          renderItem={renderItem}
        />
      </View>
      <View style={styles.footer} pointerEvents="box-none">
        <View style={styles.dots}>
          {SLIDES.map((_, i) => (
            <View
              key={i}
              style={[styles.dot, i === index && styles.dotActive]}
            />
          ))}
        </View>
        <Pressable
          style={({ pressed }) => [styles.cta, pressed && styles.ctaPressed]}
          onPress={goNext}
        >
          <Text style={styles.ctaText}>
            {index === SLIDES.length - 1 ? 'Get Started' : 'Next'}
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.white,
  },
  listSection: {
    flex: 1,
    minHeight: 0,
  },
  list: {
    flex: 1,
  },
  listWeb: {
    overflowX: 'scroll',
    overflowY: 'hidden',
    touchAction: 'pan-x',
    WebkitOverflowScrolling: 'touch',
  },
  listContent: {
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  slide: {
    alignSelf: 'stretch',
  },
  imageWrap: {
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(13,13,13,0.06)',
  },
  textBlock: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    justifyContent: 'center',
  },
  title: {
    ...typography.title,
    color: colors.black,
    marginBottom: spacing.sm,
  },
  subtitle: {
    ...typography.subtitle,
    lineHeight: 22,
  },
  footer: {
    zIndex: 2,
    backgroundColor: colors.white,
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: spacing.md,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.border,
  },
  dotActive: {
    backgroundColor: colors.black,
    width: 20,
  },
  cta: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.lg,
    backgroundColor: colors.black,
    paddingVertical: spacing.md,
    alignItems: 'center',
  },
  ctaPressed: {
    opacity: 0.88,
  },
  ctaText: {
    color: colors.white,
    fontSize: 12,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
});
