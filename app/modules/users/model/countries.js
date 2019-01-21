// @flow

/* eslint-disable flowtype/require-types-at-top */

// TODO: country enumeration
const BELGIUM: 'users/BELGIUM' = 'users/BELGIUM';

export const countryTypes = {
  BELGIUM,
};

export type CountryType = $Values<typeof countryTypes>;
