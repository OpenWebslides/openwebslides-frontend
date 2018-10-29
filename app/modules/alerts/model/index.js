// @flow

/* eslint-disable flowtype/require-types-at-top */

const SUBMITTED: 'alerts/SUBMITTED' = 'alerts/SUBMITTED';
const ACCEPTED: 'alerts/ACCEPTED' = 'alerts/ACCEPTED';
const REJECTED: 'alerts/REJECTED' = 'alerts/REJECTED';

export const pullRequestAlertTypes = {
  SUBMITTED,
  ACCEPTED,
  REJECTED,
};

export type PullRequestAlertType = $Values<typeof pullRequestAlertTypes>;

export type Alert = {|
  +id: string,
  +userId: string,
  +timestamp: number,
|};

export type UpdateAlert = {|
  ...Alert,
  +topicId: string,
  +count: number,
|};

export type PullRequestAlert = {|
  ...Alert,
  +pullRequestId: string,
  // Subject of the alert (the user that accepted/rejected the PR)
  +subjectUserId: string,
  +type: PullRequestAlertType,
|};

// eslint-disable-next-line flowtype/require-exact-type
export type AlertsById = {
  +[id: string]: Alert,
};

export type AlertsState = {|
  +byId: AlertsById,
|};
