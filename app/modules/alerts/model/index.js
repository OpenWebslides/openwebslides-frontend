// @flow

/* eslint-disable flowtype/require-types-at-top,import/exports-last */

// Type of alert
const TOPIC_UPDATED: 'alertTypes/TOPIC_UPDATED' = 'alertTypes/TOPIC_UPDATED';
const PR_SUBMITTED: 'alertTypes/PR_SUBMITTED' = 'alertTypes/PR_SUBMITTED';
const PR_ACCEPTED: 'alertTypes/PR_ACCEPTED' = 'alertTypes/PR_ACCEPTED';
const PR_REJECTED: 'alertTypes/PR_REJECTED' = 'alertTypes/PR_REJECTED';
const TOPIC_FORKED: 'alertTypes/TOPIC_FORKED' = 'alertTypes/TOPIC_FORKED';

export const alertTypes = {
  TOPIC_UPDATED,
  PR_SUBMITTED,
  PR_ACCEPTED,
  PR_REJECTED,
  TOPIC_FORKED,
};

export type AlertType = $Values<typeof alertTypes>;

// State of pull request alert
const SUBMITTED: 'alertStates/SUBMITTED' = 'alertStates/SUBMITTED';
const ACCEPTED: 'alertStates/ACCEPTED' = 'alertStates/ACCEPTED';
const REJECTED: 'alertStates/REJECTED' = 'alertStates/REJECTED';

export const pullRequestStateTypes = {
  SUBMITTED,
  ACCEPTED,
  REJECTED,
};

export type PullRequestStateType = $Values<typeof pullRequestStateTypes>;

export type BaseAlert = {|
  +id: string,
  +userId: string,
  +topicId: string,
  +timestamp: number,
  +read: boolean,
  +type: AlertType,
|};

export type UpdateAlert = {|
  ...BaseAlert,
  +count: number,
|};

export type PullRequestAlert = {|
  ...BaseAlert,
  +pullRequestId: string,
  // Subject of the alert (the user that submitted/accepted/rejected the PR)
  +subjectUserId: string,
  +state: PullRequestStateType,
|};

export type ForkedAlert = {|
  ...BaseAlert,
  // Subject of the alert (the user that forked the topic)
  +subjectUserId: string,
|};

export type Alert =
  | UpdateAlert
  | PullRequestAlert
  | ForkedAlert;

// eslint-disable-next-line flowtype/require-exact-type
export type AlertsById = {
  +[id: string]: Alert,
};

export type AlertsState = {|
  +byId: AlertsById,
|};
