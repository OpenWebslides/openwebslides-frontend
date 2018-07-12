// @flow

import type { Match } from 'react-router-dom';

import type { CustomTranslatorProps } from 'types/translator';

export const dummyTranslatorProps: CustomTranslatorProps = {
  t: (key: ?string): string => key || 'string',
  i18nLoadedAt: new Date('2018-04-01T22:15:00'),
  i18n: {},
};

export const dummyRouterMatchProps: { match: Match } = {
  match: { params: {}, isExact: true, path: '', url: '' },
};
