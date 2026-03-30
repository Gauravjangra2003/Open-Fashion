import { Ionicons } from '@expo/vector-icons';
import React, { useCallback } from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Toast from 'react-native-toast-message';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, typography } from '../../constants/theme';
import { useStore } from '../../context/StoreContext';
import { productImageSource } from '../../utils/imageSource';

export function ProductDetailScreen({ route, navigation }) {
  const { productId } = route.params;
  const { cart, getProductById, addToCart, toggleWishlist, isInWishlist } =
    useStore();
  const product = getProductById(productId);
  const saved = product ? isInWishlist(product.id) : false;

  const handleAddToBag = useCallback(() => {
    if (!product) return;
    const line = cart.find((l) => l.productId === product.id);
    const nextQty = (line?.quantity ?? 0) + 1;
    addToCart(product.id, 1);
    Toast.show({
      type: 'success',
      text1: 'Added to bag',
      text2: `${product.name} · Quantity: ${nextQty}`,
      position: 'bottom',
      visibilityTime: 2000,
    });
  }, [product, cart, addToCart]);

  if (!product) {
    return (
      <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
        <Text style={styles.miss}>Product not found.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <View style={styles.topBar}>
        <Pressable onPress={() => navigation.goBack()} hitSlop={12}>
          <Ionicons name="chevron-back" size={26} color={colors.black} />
        </Pressable>
        <Pressable onPress={() => toggleWishlist(product.id)} hitSlop={12}>
          <Ionicons
            name={saved ? 'heart' : 'heart-outline'}
            size={24}
            color={colors.black}
          />
        </Pressable>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.imageWrap}>
          <Image
            source={productImageSource(product.image)}
            style={styles.image}
            resizeMode="contain"
          />
        </View>
        <View style={styles.body}>
          <Text style={styles.cat}>{product.category}</Text>
          <Text style={styles.name}>{product.name}</Text>
          <Text style={styles.price}>${product.price}</Text>
          <Text style={styles.desc}>
            Crafted with premium materials. Designed for a refined silhouette
            and everyday comfort. Part of our menswear collection.
          </Text>
          <Pressable style={styles.primary} onPress={handleAddToBag}>
            <Text style={styles.primaryText}>Add to bag</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  miss: {
    padding: spacing.lg,
    color: colors.textMuted,
  },
  imageWrap: {
    aspectRatio: 3 / 4,
    backgroundColor: colors.white,
    marginHorizontal: spacing.md,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  body: {
    padding: spacing.lg,
  },
  cat: {
    ...typography.caption,
    color: colors.textMuted,
    marginBottom: spacing.xs,
  },
  name: {
    fontSize: 24,
    fontWeight: '300',
    letterSpacing: 0.5,
    color: colors.black,
    marginBottom: spacing.sm,
  },
  price: {
    ...typography.price,
    fontSize: 18,
    marginBottom: spacing.lg,
  },
  desc: {
    ...typography.body,
    lineHeight: 24,
    color: colors.textMuted,
    marginBottom: spacing.xl,
  },
  primary: {
    backgroundColor: colors.black,
    paddingVertical: spacing.md,
    alignItems: 'center',
  },
  primaryText: {
    color: colors.white,
    fontSize: 12,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
});
