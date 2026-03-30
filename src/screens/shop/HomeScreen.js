import { Ionicons } from '@expo/vector-icons';
import React, { useMemo, useRef, useState } from 'react';
import {
  FlatList,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Banner, Logo } from '../../components/common';
import { ProductCard } from '../../components/product';
import { colors, spacing, typography } from '../../constants/theme';
import { useStore } from '../../context/StoreContext';

export function HomeScreen({ navigation }) {
  const { products, cartLineCount } = useStore();
  const [query, setQuery] = useState('');
  const searchRef = useRef(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return products;
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
    );
  }, [products, query]);

  const listHeader = (
    <>
      <View style={styles.searchWrap}>
        <Ionicons
          name="search"
          size={18}
          color={colors.textMuted}
          style={styles.searchIcon}
        />
        <TextInput
          ref={searchRef}
          style={styles.searchInput}
          placeholder="Search products"
          placeholderTextColor={colors.textMuted}
          value={query}
          onChangeText={setQuery}
        />
      </View>
      <Banner />
      <View style={styles.sectionHead}>
        <Text style={styles.sectionTitle}>New arrivals</Text>
        <Text style={styles.sectionSub}>Menswear · This week</Text>
      </View>
    </>
  );

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Logo size="sm" />
        </View>
        <View style={styles.headerRight}>
          <Pressable onPress={() => searchRef.current?.focus()} hitSlop={8}>
            <Ionicons name="search-outline" size={22} color={colors.black} />
          </Pressable>
          <Pressable
            onPress={() => navigation.navigate('Cart')}
            hitSlop={8}
            style={styles.iconPad}
          >
            <Ionicons name="bag-outline" size={22} color={colors.black} />
            {cartLineCount > 0 ? (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>
                  {cartLineCount > 9 ? '9+' : cartLineCount}
                </Text>
              </View>
            ) : null}
          </Pressable>
          <Pressable
            onPress={() => navigation.navigate('Profile')}
            hitSlop={8}
          >
            <View style={styles.avatar}>
              <Ionicons name="person-outline" size={18} color={colors.black} />
            </View>
          </Pressable>
        </View>
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        numColumns={2}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={listHeader}
        renderItem={({ item }) => (
          <ProductCard
            product={item}
            onPress={(p) =>
              navigation.navigate('ProductDetail', { productId: p.id })
            }
          />
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>No pieces match your search.</Text>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
    // Extra top gap on Android so the header isn't too close to the top edge.
    ...(Platform.OS === 'android' && { marginTop: spacing.lg }),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerLeft: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconPad: {
    marginLeft: spacing.md,
  },
  badge: {
    position: 'absolute',
    top: -6,
    right: -8,
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: colors.black,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    color: colors.white,
    fontSize: 10,
    fontWeight: '600',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    marginLeft: spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listContent: {
    paddingBottom: spacing.xxl,
  },
  searchWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: spacing.md,
    marginTop: spacing.md,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.white,
    paddingHorizontal: spacing.sm,
  },
  searchIcon: {
    marginRight: spacing.xs,
  },
  searchInput: {
    flex: 1,
    paddingVertical: spacing.sm,
    fontSize: 15,
    color: colors.text,
  },
  sectionHead: {
    paddingHorizontal: spacing.md,
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '400',
    letterSpacing: 1,
    color: colors.black,
    textTransform: 'uppercase',
  },
  sectionSub: {
    ...typography.caption,
    color: colors.textMuted,
    marginTop: 4,
  },
  row: {
    flexDirection: 'row',
    paddingHorizontal: spacing.md,
  },
  empty: {
    textAlign: 'center',
    color: colors.textMuted,
    paddingVertical: spacing.xl,
  },
});
