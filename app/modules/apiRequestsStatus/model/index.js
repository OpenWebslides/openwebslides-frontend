// @flow

/* eslint-disable no-multiple-empty-lines, flowtype/require-types-at-top */


// StatusTypes -------------------------------------------------------------------------------------

const PENDING: 'PENDING' = 'PENDING';
const SUCCESS: 'SUCCESS' = 'SUCCESS';
const FAILURE: 'FAILURE' = 'FAILURE';

export const statusTypes = {
  PENDING,
  SUCCESS,
  FAILURE,
};

export type StatusType = $Values<typeof statusTypes>;


// RequestStatus -----------------------------------------------------------------------------------

export type PendingRequestStatus = {|
  status: typeof statusTypes.PENDING,
|};

export type SuccessRequestStatus = {|
  status: typeof statusTypes.SUCCESS,
  value: mixed,
|};

export type FailureRequestStatus = {|
  status: typeof statusTypes.FAILURE,
  error: Error,
|};

export type RequestStatus =
  | PendingRequestStatus
  | SuccessRequestStatus
  | FailureRequestStatus;


// Module state ------------------------------------------------------------------------------------

// eslint-disable-next-line flowtype/require-exact-type
export type ApiRequestsStatusState = {
  +[id: string]: RequestStatus,
};
