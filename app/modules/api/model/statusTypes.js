// @flow

const PENDING: 'PENDING' = 'PENDING';
const SUCCESS: 'SUCCESS' = 'SUCCESS';
const FAILURE: 'FAILURE' = 'FAILURE';

export const statusTypes = {
  PENDING,
  SUCCESS,
  FAILURE,
};

export type StatusType = $Values<typeof statusTypes>;
