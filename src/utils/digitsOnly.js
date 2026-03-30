/** Keep only ASCII digits 0–9 (e.g. numeric passwords). */
export function digitsOnly(text) {
  return text.replace(/\D/g, '');
}
