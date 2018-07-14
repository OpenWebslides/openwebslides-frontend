// @flow

import type { Error } from 'types/error';

import type { StatusType } from './statusTypes';
import { statusTypes } from './statusTypes';

export type RequestStatus = {
  status: StatusType,
  error?: Error,
};

export type ApiRequestsStatusState = {
  +[request: string]: RequestStatus,
};

export {
  statusTypes,
};

export type {
  StatusType,
};
