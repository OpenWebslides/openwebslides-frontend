// @flow

import type { TranslatorProps } from 'react-i18next';
// import type { ContextRouter as RouterProps } from 'react-router-dom';

export const dummyTranslatorProps: TranslatorProps = {
  t: (key: ?string): string => key || 'string',
  i18nLoadedAt: new Date('2018-04-01T22:15:00'),
  i18n: {},
};

// Leaving this empty for now; expand if it causes problems down the road.
// eslint-disable-next-line flowtype/no-weak-types
export const dummyRouterProps: Object = {
  history: {},
  location: {},
  match: { params: {}, isExact: true, path: '', url: '' },
};
