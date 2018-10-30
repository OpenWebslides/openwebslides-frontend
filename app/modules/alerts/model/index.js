// @flow

/* eslint-disable flowtype/require-types-at-top,import/exports-last */

// Type of alert
const UPDATE: 'alerts/UPDATE' = 'alerts/UPDATE';
const PULL_REQUEST: 'alerts/PULL_REQUEST' = 'alerts/PULL_REQUEST';

export const alertTypes = {
  UPDATE,
  PULL_REQUEST,
};

export type AlertType = $Values<typeof alertTypes>;

// State of pull request alert
const SUBMITTED: 'alerts/SUBMITTED' = 'alerts/SUBMITTED';
const ACCEPTED: 'alerts/ACCEPTED' = 'alerts/ACCEPTED';
const REJECTED: 'alerts/REJECTED' = 'alerts/REJECTED';

export const pullRequestStateTypes = {
  SUBMITTED,
  ACCEPTED,
  REJECTED,
};

export type PullRequestStateType = $Values<typeof pullRequestStateTypes>;

export type BaseAlert = {|
  +id: string,
  +userId: string,
  +timestamp: number,
  +type: AlertType,
|};

export type UpdateAlert = {|
  ...BaseAlert,
  +topicId: string,
  +count: number,
|};

export type PullRequestAlert = {|
  ...BaseAlert,
  +pullRequestId: string,
  // Subject of the alert (the user that submitted/accepted/rejected the PR)
  +subjectUserId: string,
  +state: PullRequestStateType,
|};

export type Alert =
  | UpdateAlert
  | PullRequestAlert;

// eslint-disable-next-line flowtype/require-exact-type
export type AlertsById = {
  +[id: string]: Alert,
};

export type AlertsState = {|
  +byId: AlertsById,
|};
