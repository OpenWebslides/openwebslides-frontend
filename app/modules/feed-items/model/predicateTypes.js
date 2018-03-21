// @flow

// Weird syntax is necessary to avoid repeating string literals in flow types.
// See https://github.com/facebook/flow/issues/2377#issuecomment-262894389
const CREATE: 'predicateTypes/CREATE' = 'predicateTypes/CREATE';
const FORK: 'predicateTypes/FORK' = 'predicateTypes/FORK';
const COMMENT: 'predicateTypes/COMMENT' = 'predicateTypes/COMMENT';
const DELETE: 'predicateTypes/DELETE' = 'predicateTypes/DELETE';
const UPDATE: 'predicateTypes/UPDATE' = 'predicateTypes/UPDATE';

// Group all predicateTypes.
export const predicateTypes = {
  CREATE,
  FORK,
  COMMENT,
  DELETE,
  UPDATE,
};

export type predicateType = $Values<typeof predicateTypes>;
