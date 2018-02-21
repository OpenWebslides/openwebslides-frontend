// @flow
/**
 * Configuration options for i18next / react-i18next.
 * Docs: https://www.i18next.com
 *
 * Contains only basic setup for now;
 * features such as automatic language detection can be added later.
 */

import i18next from 'i18next';

import en from 'i18n/en';

i18next.init({
  // Sets the current language
  lng: 'en',
  // Fallback language; used when a key isn't available in the current language
  fallbackLng: 'en',
  // Required for i18next.on('missingKey', ...) to work
  saveMissing: true,

  // React i18next special options (optional)
  // see https://react.i18next.com/components/i18next-instance.html
  react: {
    wait: true,
  },

  // Include translation files
  resources: {
    en,
  },
});

// Handle missing keys by printing an error message to the console.
// Note: can't get this to trigger if key is missing in current lang but not in fallback lang.
// #TODO replace with proper logging
i18next.on('missingKey', (lng: string, ns: string, key: string): void => {
  console.error(`Missing key '${key}' for language '${lng}' in namespace '${ns}'.`);
});

export default i18next;
