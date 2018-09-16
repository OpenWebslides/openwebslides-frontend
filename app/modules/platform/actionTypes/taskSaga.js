// @flow

/* eslint-disable no-multiple-empty-lines, flowtype/require-types-at-top */

import { type TaskSagaAction } from 'types/actions';

import * as m from '../model';


// Action constants --------------------------------------------------------------------------------

// Authentication
export const SIGNIN: 'platform/SIGNIN' = 'platform/SIGNIN';
export const SIGNIN_SSO: 'platform/SIGNIN_SSO' = 'platform/SIGNIN_SSO';
export const SIGNOUT: 'platform/SIGNOUT' = 'platform/SIGNOUT';
export const SIGNUP: 'platform/SIGNUP' = 'platform/SIGNUP';
export const CONFIRM_EMAIL: 'platform/CONFIRM_EMAIL' = 'platform/CONFIRM_EMAIL';
export const RESEND_CONFIRMATION_EMAIL: 'platform/RESEND_CONFIRMATION_EMAIL' = 'platform/RESEND_CONFIRMATION_EMAIL';
export const RESET_PASSWORD: 'platform/RESET_PASSWORD' = 'platform/RESET_PASSWORD';
export const SEND_RESET_PASSWORD_EMAIL: 'platform/SEND_RESET_PASSWORD_EMAIL' = 'platform/SEND_RESET_PASSWORD_EMAIL';
// Settings
export const TOGGLE_SIDEBAR: 'platform/TOGGLE_SIDEBAR' = 'platform/TOGGLE_SIDEBAR';


// Action types ------------------------------------------------------------------------------------

export type SigninAction = {|
  ...TaskSagaAction,
  type: typeof SIGNIN,
  payload: {|
    ...$PropertyType<TaskSagaAction, 'payload'>,
    email: string,
    password: string,
  |},
|};

export type SigninSSOAction = {|
  ...TaskSagaAction,
  type: typeof SIGNIN_SSO,
  payload: {|
    ...$PropertyType<TaskSagaAction, 'payload'>,
    apiToken: string,
    userId: string,
  |},
|};

export type SignoutAction = {|
  ...TaskSagaAction,
  type: typeof SIGNOUT,
  payload: {|
    ...$PropertyType<TaskSagaAction, 'payload'>,
  |},
|};

export type SignupAction = {|
  ...TaskSagaAction,
  type: typeof SIGNUP,
  payload: {|
    ...$PropertyType<TaskSagaAction, 'payload'>,
    email: string,
    name: string,
    password: string,
    tosAccepted: boolean,
  |},
|};

export type ConfirmEmailAction = {|
  ...TaskSagaAction,
  type: typeof CONFIRM_EMAIL,
  payload: {|
    ...$PropertyType<TaskSagaAction, 'payload'>,
    confirmationToken: string,
  |},
|};

export type ResendConfirmationEmailAction = {|
  ...TaskSagaAction,
  type: typeof RESEND_CONFIRMATION_EMAIL,
  payload: {|
    ...$PropertyType<TaskSagaAction, 'payload'>,
    email: string,
  |},
|};

export type ResetPasswordAction = {|
  ...TaskSagaAction,
  type: typeof RESET_PASSWORD,
  payload: {|
    ...$PropertyType<TaskSagaAction, 'payload'>,
    password: string,
    resetPasswordToken: string,
  |},
|};

export type SendResetPasswordEmailAction = {|
  ...TaskSagaAction,
  type: typeof SEND_RESET_PASSWORD_EMAIL,
  payload: {|
    ...$PropertyType<TaskSagaAction, 'payload'>,
    email: string,
  |},
|};

export type ToggleSidebarAction = {|
  ...TaskSagaAction,
  type: typeof TOGGLE_SIDEBAR,
  payload: {|
    ...$PropertyType<TaskSagaAction, 'payload'>,
    sidebarId: m.SidebarId,
  |},
|};


// TaskSaga action ---------------------------------------------------------------------------------

export type PlatformTaskSagaAction =
  | SigninAction
  | SigninSSOAction
  | SignoutAction
  | SignupAction
  | ConfirmEmailAction
  | ResendConfirmationEmailAction
  | ResetPasswordAction
  | SendResetPasswordEmailAction
  | ToggleSidebarAction;
