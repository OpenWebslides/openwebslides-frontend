// @flow

// Weird syntax is necessary to avoid repeating string literals in flow types.
// See https://github.com/facebook/flow/issues/2377#issuecomment-262894389
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
