// @flow

import asyncRequests from 'modules/asyncRequests';

export const pendingAsyncRequest: asyncRequests.model.PendingAsyncRequest = {
  id: 'dummyPendingAsyncRequest',
  status: asyncRequests.model.statusTypes.PENDING,
};

export const pendingAsyncRequest2: asyncRequests.model.PendingAsyncRequest = {
  id: 'dummyPendingAsyncRequest2',
  status: asyncRequests.model.statusTypes.PENDING,
};

export const successAsyncRequest: asyncRequests.model.SuccessAsyncRequest = {
  id: 'dummySuccessAsyncRequest',
  status: asyncRequests.model.statusTypes.SUCCESS,
  value: 'dummyReturnValue',
};

export const successAsyncRequest2: asyncRequests.model.SuccessAsyncRequest = {
  id: 'dummySuccessAsyncRequest2',
  status: asyncRequests.model.statusTypes.SUCCESS,
  value: 'dummyReturnValue2',
};

export const failureAsyncRequest: asyncRequests.model.FailureAsyncRequest = {
  id: 'dummyFailureAsyncRequest',
  status: asyncRequests.model.statusTypes.FAILURE,
  error: new Error('dummyError'),
};

export const failureAsyncRequest2: asyncRequests.model.FailureAsyncRequest = {
  id: 'dummyFailureAsyncRequest2',
  status: asyncRequests.model.statusTypes.FAILURE,
  error: new Error('dummyError2'),
};
