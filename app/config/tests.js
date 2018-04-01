// @flow

export const dummyTranslatorProps = {
  t: (key: ?string): string => key || 'string',
  i18nLoadedAt: new Date('2018-04-01T22:15:00'),
  i18n: {},
};

export const dummyRouterMatchProps = {
  match: { params: {}, isExact: true, path: '', url: '' },
};
