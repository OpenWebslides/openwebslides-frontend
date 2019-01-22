// @flow

/* eslint-disable flowtype/require-types-at-top */

// TODO: country enumeration
const BELGIUM: 'countries/BELGIUM' = 'countries/BELGIUM';

export const countryTypes = {
  BELGIUM,
};

export type CountryType = $Values<typeof countryTypes>;
