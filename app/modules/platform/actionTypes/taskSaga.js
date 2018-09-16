// @flow

/* eslint-disable no-multiple-empty-lines, flowtype/require-types-at-top */

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
  type: typeof SIGNIN,
  payload: {|
    email: string,
    password: string,
  |},
|};

export type SigninSSOAction = {|
  type: typeof SIGNIN_SSO,
  payload: {|
    apiToken: string,
    userId: string,
  |},
|};

export type SignoutAction = {|
  type: typeof SIGNOUT,
|};

export type SignupAction = {|
  type: typeof SIGNUP,
  payload: {|
    email: string,
    name: string,
    password: string,
    tosAccepted: boolean,
  |},
|};

export type ConfirmEmailAction = {|
  type: typeof CONFIRM_EMAIL,
  payload: {|
    confirmationToken: string,
  |},
|};

export type ResendConfirmationEmailAction = {|
  type: typeof RESEND_CONFIRMATION_EMAIL,
  payload: {|
    email: string,
  |},
|};

export type ResetPasswordAction = {|
  type: typeof RESET_PASSWORD,
  payload: {|
    password: string,
    resetPasswordToken: string,
  |},
|};

export type SendResetPasswordEmailAction = {|
  type: typeof SEND_RESET_PASSWORD_EMAIL,
  payload: {|
    email: string,
  |},
|};

export type ToggleSidebarAction = {|
  type: typeof TOGGLE_SIDEBAR,
  payload: {|
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
