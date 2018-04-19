// @flow
/* eslint-disable flowtype/no-weak-types */

import type { TFunction } from 'react-i18next';

export type CustomTranslatorProps = {
  t: TFunction,
  i18nLoadedAt: Date | void,
  i18n: Object | void,
};
