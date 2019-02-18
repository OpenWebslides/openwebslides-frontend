// @flow

// eslint-disable-next-line flowtype/no-weak-types
export type TFunction = (key?: ?string, data?: ?Object) => string;

export type I18nObject = {|
  languages: $ReadOnlyArray<string>,
|};
