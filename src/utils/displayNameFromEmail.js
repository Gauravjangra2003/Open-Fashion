/**
 * Build a display name from the email local part: separators (. _ -),
 * camelCase, and digit runs become word breaks; each word is title-cased.
 */
export function displayNameFromEmail(email) {
  const raw = String(email).trim().split('@')[0] || '';
  if (!raw) return 'Member';

  let s = raw.replace(/[._-]+/g, ' ');
  s = s.replace(/([a-z])([A-Z])/g, '$1 $2');
  s = s.replace(/\d+/g, ' ');
  const words = s
    .split(/\s+/)
    .map((w) => w.replace(/[^a-zA-Z]/g, ''))
    .filter(Boolean);

  if (words.length === 0) return 'Member';
  return words
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(' ');
}
