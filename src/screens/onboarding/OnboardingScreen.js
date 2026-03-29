import React, { useRef, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, typography } from '../../constants/theme';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

/** Tall enough to show full portraits without harsh cropping; `contain` scales inside this box. */
const ONBOARDING_IMAGE_HEIGHT = Math.min(SCREEN_HEIGHT * 0.52, SCREEN_WIDTH * 1.35);

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
  const [index, setIndex] = useState(0);
  const listRef = useRef(null);

  const onScroll = (e) => {
    const x = e.nativeEvent.contentOffset.x;
    const i = Math.round(x / SCREEN_WIDTH);
    setIndex(i);
  };

  const goNext = () => {
    if (index < SLIDES.length - 1) {
      listRef.current?.scrollToIndex({ index: index + 1, animated: true });
    } else {
      navigation.replace('SignIn');
    }
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <FlatList
        ref={listRef}
        style={styles.list}
        contentContainerStyle={styles.listContent}
        data={SLIDES}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.key}
        onMomentumScrollEnd={onScroll}
        renderItem={({ item }) => (
          <View style={styles.slide}>
            <View style={styles.imageWrap}>
              <Image
                source={item.image}
                style={styles.image}
                resizeMode="contain"
              />
              <View style={styles.imageOverlay} pointerEvents="none" />
            </View>
            <View style={styles.textBlock}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.subtitle}>{item.subtitle}</Text>
            </View>
          </View>
        )}
      />
      <View style={styles.dots}>
        {SLIDES.map((_, i) => (
          <View
            key={i}
            style={[styles.dot, i === index && styles.dotActive]}
          />
        ))}
      </View>
      <Pressable style={styles.cta} onPress={goNext}>
        <Text style={styles.ctaText}>
          {index === SLIDES.length - 1 ? 'Get Started' : 'Next'}
        </Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.white,
  },
  list: {
    flex: 1,
  },
  listContent: {
    flexGrow: 1,
  },
  slide: {
    width: SCREEN_WIDTH,
    flex: 1,
    alignSelf: 'stretch',
  },
  imageWrap: {
    width: SCREEN_WIDTH,
    height: ONBOARDING_IMAGE_HEIGHT,
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
  ctaText: {
    color: colors.white,
    fontSize: 12,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
});
