// @flow

/* eslint-disable flowtype/require-types-at-top */

const CREATE: 'predicate/CREATE' = 'predicate/CREATE';
const FORK: 'predicate/FORK' = 'predicate/FORK';
const COMMENT: 'predicate/COMMENT' = 'predicate/COMMENT';
const UPDATE: 'predicate/UPDATE' = 'predicate/UPDATE';

// Group all predicate.
export const predicate = {
  CREATE,
  FORK,
  COMMENT,
  UPDATE,
};

export type Predicate = $Values<typeof predicate>;
