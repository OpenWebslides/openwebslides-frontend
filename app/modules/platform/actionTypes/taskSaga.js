// @flow
/* eslint-disable no-multiple-empty-lines */


// Action constants --------------------------------------------------------------------------------

export const SIGNIN: 'platform/SIGNIN' = 'platform/SIGNIN';
export const SIGNOUT: 'platform/SIGNOUT' = 'platform/SIGNOUT';
export const SIGNUP: 'platform/SIGNUP' = 'platform/SIGNUP';
export const CONFIRM_EMAIL: 'platform/CONFIRM_EMAIL' = 'platform/CONFIRM_EMAIL';
export const RESEND_CONFIRMATION_EMAIL: 'platform/RESEND_CONFIRMATION_EMAIL' = 'platform/RESEND_CONFIRMATION_EMAIL';
export const RESET_PASSWORD: 'platform/RESET_PASSWORD' = 'platform/RESET_PASSWORD';


// Action types ------------------------------------------------------------------------------------

export type SigninAction = {|
  type: typeof SIGNIN,
  payload: {
    email: string,
    password: string,
  },
|};

export type SignoutAction = {|
  type: typeof SIGNOUT,
|};

export type SignupAction = {|
  type: typeof SIGNUP,
  payload: {
    email: string,
    firstName: string,
    lastName?: string,
    password: string,
    tosAccepted: boolean,
  },
|};

export type ConfirmEmailAction = {|
  type: typeof CONFIRM_EMAIL,
  payload: {
    confirmationToken: string,
  },
|};

export type ResendConfirmationEmailAction = {|
  type: typeof RESEND_CONFIRMATION_EMAIL,
  payload: {
    email: string,
  },
|};

export type ResetPasswordAction = {|
  type: typeof RESET_PASSWORD,
  payload: {
    email: string,
  },
|};
