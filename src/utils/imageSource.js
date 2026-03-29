/**
 * Supports product images from require() (number) or remote URI strings.
 */
export function productImageSource(image) {
  if (typeof image === 'number') {
    return image;
  }
  return { uri: image };
}
