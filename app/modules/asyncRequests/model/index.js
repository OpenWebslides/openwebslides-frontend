// @flow

/* eslint-disable no-multiple-empty-lines, flowtype/require-types-at-top */


// StatusTypes -------------------------------------------------------------------------------------

const PENDING: 'asyncRequestsStatusTypes/PENDING' = 'asyncRequestsStatusTypes/PENDING';
const SUCCESS: 'asyncRequestsStatusTypes/SUCCESS' = 'asyncRequestsStatusTypes/SUCCESS';
const FAILURE: 'asyncRequestsStatusTypes/FAILURE' = 'asyncRequestsStatusTypes/FAILURE';

export const statusTypes = {
  PENDING,
  SUCCESS,
  FAILURE,
};

export type StatusType = $Values<typeof statusTypes>;


// RequestStatus -----------------------------------------------------------------------------------

export type BaseAsyncRequest = {|
  +id: string,
  +status: StatusType,
  +timestamp: number,
|};

export type PendingAsyncRequest = {|
  ...BaseAsyncRequest,
  +status: typeof statusTypes.PENDING,
|};

export type SuccessAsyncRequest = {|
  ...BaseAsyncRequest,
  +status: typeof statusTypes.SUCCESS,
  // The return value of the request, if any.
  +value: mixed,
|};

export type FailureAsyncRequest = {|
  ...BaseAsyncRequest,
  +status: typeof statusTypes.FAILURE,
  // The error that caused the failure.
  +error: Error,
|};

export type AsyncRequest =
  | PendingAsyncRequest
  | SuccessAsyncRequest
  | FailureAsyncRequest;


// Module state ------------------------------------------------------------------------------------

// eslint-disable-next-line flowtype/require-exact-type
export type AsyncRequestsById = {
  +[id: string]: AsyncRequest,
};

export type AsyncRequestsState = {|
  +byId: AsyncRequestsById,
  // Refresh request is pending
  +refreshing: boolean,
|};
