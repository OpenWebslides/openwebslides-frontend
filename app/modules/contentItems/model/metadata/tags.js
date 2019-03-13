// @flow

/* eslint-disable flowtype/require-types-at-top */

const IMPORTANT: 'tagTypes/IMPORTANT' = 'tagTypes/IMPORTANT';
const OPINION: 'tagTypes/OPINION' = 'tagTypes/OPINION';

// Group all tagTypes.
export const tagTypes = {
  IMPORTANT,
  OPINION,
};

// Type for contentItem tags.
export type Tag = $Values<typeof tagTypes>;
