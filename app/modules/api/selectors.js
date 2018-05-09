// @flow

import type { State } from 'types/state';
import type { Error } from 'types/error';

import { statusTypes } from './model';
import type { ApiState, RequestStatus } from './model';

const getModule = (state: State): ApiState => {
  return state.modules.api;
};

const getRequest = (state: State, request: string): RequestStatus => {
  return getModule(state)[request];
};

export const isPending = (state: State, request: string): boolean => {
  const req = getRequest(state, request);

  if (!req) {
    return false;
  }

  return req.status === statusTypes.PENDING;
};

export const isSuccess = (state: State, request: string): boolean => {
  const req = getRequest(state, request);

  if (!req) {
    return false;
  }

  return req.status === statusTypes.SUCCESS;
};

export const isFailure = (state: State, request: string): boolean => {
  const req = getRequest(state, request);

  if (!req) {
    return false;
  }

  return req.status === statusTypes.FAILURE;
};

export const getError = (state: State, request: string): ?Error => {
  const req = getRequest(state, request);

  if (!req) {
    return null;
  }

  return req.error || null;
};
