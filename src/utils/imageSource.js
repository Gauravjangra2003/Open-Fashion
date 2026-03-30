/**
 * Supports product images from `require()` and remote URI strings.
 *
 * On native, `require()` assets are typically numbers.
 * On web export, `require()` may resolve to an object containing a `uri`.
 */
export function productImageSource(image) {
  if (typeof image === 'number') {
    return image;
  }

  // If it's already a { uri } object, return it unchanged.
  if (image && typeof image === 'object' && 'uri' in image) {
    return image;
  }

  // If it's a string, treat it as a URI.
  if (typeof image === 'string') {
    return { uri: image };
  }

  // Fallback: best-effort uri wrapping.
  return { uri: image };
}
