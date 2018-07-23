// @flow

import type { TranslatorProps } from 'react-i18next';
// import type { ContextRouter as RouterProps } from 'react-router-dom';
// #TODO see https://github.com/erikras/redux-form/issues/3630#issue-276018629
// eslint-disable-next-line import/no-internal-modules
import { type FormProps } from 'redux-form/lib/types.js.flow';

export const translatorProps: TranslatorProps = {
  t: (key: ?string): string => key || 'string',
  i18nLoadedAt: new Date('2018-04-01T22:15:00'),
  i18n: {},
};

// Leaving this empty for now; expand if it causes problems down the road.
// eslint-disable-next-line flowtype/no-weak-types
export const routerProps: Object = {
  history: {},
  location: {},
  match: { params: {}, isExact: true, path: '', url: '' },
};

/* eslint-disable no-unused-vars, flowtype/no-weak-types */
export const formProps: $Exact<FormProps> = {
  anyTouched: false,
  array: ({}: any),
  asyncValidate: (): void => {},
  asyncValidating: false,
  autofill: (field: string, value: any): void => {},
  blur: (field: string, value: any): void => {},
  change: (field: string, value: any): void => {},
  clearAsyncError: (field: string): void => {},
  clearSubmit: (): void => {},
  destroy: (): void => {},
  dirty: false,
  dispatch: (): void => {},
  error: null,
  form: '',
  handleSubmit: (eventOrSubmit: any): void => {},
  initialize: (data: Object): void => {},
  initialized: false,
  initialValues: {},
  invalid: false,
  pristine: false,
  reset: (): void => {},
  resetSection: (): void => {},
  submitting: false,
  submitFailed: false,
  submitSucceeded: false,
  touch: (...fields: string[]): void => {},
  untouch: (...fields: string[]): void => {},
  valid: false,
  warning: null,
};
/* eslint-enable */
