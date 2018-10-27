// @flow

/**
 * Configuration options for i18next / react-i18next.
 * Docs: https://www.i18next.com
 *
 * Contains only basic setup for now;
 * features such as automatic language detection can be added later.
 */

import _ from 'lodash';
import i18next from 'i18next';

import en from 'i18n/en';

i18next.init({
  // Sets the current language
  lng: 'en',
  // Fallback language; used when a key isn't available in the current language
  fallbackLng: 'en',
  // Returns string to display if translator key is not found.
  parseMissingKeyHandler: (key: string): string => `[TRANSLATOR KEY NOT FOUND: ${key}]`,

  // React i18next special options (optional)
  // see https://react.i18next.com/components/i18next-instance.html
  react: {
    wait: true,
  },

  // Include translation files
  resources: {
    en,
  },

  interpolation: {
    // Add custom formatting functions that can be used inside translator keys
    // See https://www.i18next.com/translation-function/formatting
    // eslint-disable-next-line no-unused-vars
    format: (value: string, format: string, lng: string): string => {
      if (format === 'uppercase') return value.toUpperCase();
      if (format === 'lowercase') return value.toLowerCase();
      if (format === 'upperFirst') return _.upperFirst(value);
      return value;
    },
  },
});

export default i18next;
