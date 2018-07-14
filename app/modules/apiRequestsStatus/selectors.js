// @flow

import type { State } from 'types/state';
import type { Error } from 'types/error';

import { statusTypes } from './model';
import type { ApiRequestsStatusState, RequestStatus } from './model';

const getModule = (state: State): ApiRequestsStatusState => {
  return state.modules.apiRequestsStatus;
};

const getRequest = (state: State, props: { request: string }): RequestStatus => {
  const { request } = props;
  return getModule(state)[request];
};

export const isPending = (state: State, props: { request: string }): boolean => {
  const req = getRequest(state, props);

  if (!req) {
    return false;
  }

  return req.status === statusTypes.PENDING;
};

export const isSuccess = (state: State, props: { request: string }): boolean => {
  const req = getRequest(state, props);

  if (!req) {
    return false;
  }

  return req.status === statusTypes.SUCCESS;
};

export const isFailure = (state: State, props: { request: string }): boolean => {
  const req = getRequest(state, props);

  if (!req) {
    return false;
  }

  return req.status === statusTypes.FAILURE;
};

export const getError = (state: State, props: { request: string }): ?Error => {
  const req = getRequest(state, props);

  if (!req) {
    return null;
  }

  return req.error || null;
};
