// @flow

import asyncRequests from 'modules/asyncRequests';

export const pendingAsyncRequest: asyncRequests.model.PendingAsyncRequest = {
  id: 'dummyPendingAsyncRequest',
  status: asyncRequests.model.statusTypes.PENDING,
  timestamp: 123,
};

export const pendingAsyncRequest2: asyncRequests.model.PendingAsyncRequest = {
  id: 'dummyPendingAsyncRequest2',
  status: asyncRequests.model.statusTypes.PENDING,
  timestamp: 1234,
};

export const successAsyncRequest: asyncRequests.model.SuccessAsyncRequest = {
  id: 'dummySuccessAsyncRequest',
  status: asyncRequests.model.statusTypes.SUCCESS,
  value: 'dummyReturnValue',
  timestamp: 12345,
};

export const successAsyncRequest2: asyncRequests.model.SuccessAsyncRequest = {
  id: 'dummySuccessAsyncRequest2',
  status: asyncRequests.model.statusTypes.SUCCESS,
  value: 'dummyReturnValue2',
  timestamp: 123456,
};

export const failureAsyncRequest: asyncRequests.model.FailureAsyncRequest = {
  id: 'dummyFailureAsyncRequest',
  status: asyncRequests.model.statusTypes.FAILURE,
  error: new Error('dummyError'),
  timestamp: 1234567,
};

export const failureAsyncRequest2: asyncRequests.model.FailureAsyncRequest = {
  id: 'dummyFailureAsyncRequest2',
  status: asyncRequests.model.statusTypes.FAILURE,
  error: new Error('dummyError2'),
  timestamp: 12345678,
};
