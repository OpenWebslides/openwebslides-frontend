// @flow

import { type TranslatorProps } from 'react-i18next';
// import { type ContextRouter as RouterProps } from 'react-router-dom';

export const translatorProps: TranslatorProps = {
  t: (key: ?string): string => ((key != null) ? key : 'string'),
  i18nLoadedAt: new Date('2018-04-01T22:15:00'),
  i18n: { languages: [] },
};

// Leaving this empty for now; expand if it causes problems down the road.
// eslint-disable-next-line flowtype/no-weak-types
export const routerProps: Object = {
  history: {},
  location: {},
  match: { params: {}, isExact: true, path: '', url: '' },
};
