// @flow

/* eslint-disable flowtype/require-types-at-top,import/exports-last */

// Type of alert
const TOPIC_UPDATED: 'alerts/TOPIC_UPDATED' = 'alerts/TOPIC_UPDATED';
const PR_SUBMITTED: 'alerts/PR_SUBMITTED' = 'alerts/PR_SUBMITTED';
const PR_ACCEPTED: 'alerts/PR_ACCEPTED' = 'alerts/PR_ACCEPTED';
const PR_REJECTED: 'alerts/PR_REJECTED' = 'alerts/PR_REJECTED';

export const alertTypes = {
  TOPIC_UPDATED,
  PR_SUBMITTED,
  PR_ACCEPTED,
  PR_REJECTED,
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
  +read: boolean,
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
