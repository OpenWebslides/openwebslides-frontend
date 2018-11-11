// @flow

import alerts from 'modules/alerts';

export const updateAlert1: alerts.model.UpdateAlert = {
  id: 'dummyUpdateAlert1',
  userId: 'dummyUserId',
  timestamp: 1540833592,
  read: false,
  type: alerts.model.alertTypes.TOPIC_UPDATED,
  topicId: 'dummyTopicId',
  count: 3,
};

export const updateAlert2: alerts.model.UpdateAlert = {
  id: 'dummyUpdateAlert2',
  userId: 'dummyUserId',
  timestamp: 1540833392,
  read: false,
  type: alerts.model.alertTypes.TOPIC_UPDATED,
  topicId: 'dummyTopicId',
  count: 2,
};

export const PRSubmittedAlert: alerts.model.PullRequestAlert = {
  id: 'dummyPullRequestAlert1',
  userId: 'dummyUser1Id',
  timestamp: 1540833792,
  read: false,
  type: alerts.model.alertTypes.PR_SUBMITTED,
  pullRequestId: 'dummyPullRequestId',
  subjectUserId: 'dummySubjectUserId',
  state: alerts.model.pullRequestStateTypes.SUBMITTED,
};

export const PRApprovedAlert: alerts.model.PullRequestAlert = {
  id: 'dummyPullRequestAlert2',
  userId: 'dummyUser2Id',
  timestamp: 1540833892,
  read: false,
  type: alerts.model.alertTypes.PR_APPROVED,
  pullRequestId: 'dummyPullRequestId',
  subjectUserId: 'dummySubjectUserId',
  state: alerts.model.pullRequestStateTypes.ACCEPTED,
};

export const PRRejectedAlert: alerts.model.PullRequestAlert = {
  id: 'dummyPullRequestAlert3',
  userId: 'dummyUser2Id',
  timestamp: 1540833892,
  read: false,
  type: alerts.model.alertTypes.PR_REJECTED,
  pullRequestId: 'dummyPullRequestId',
  subjectUserId: 'dummySubjectUserId',
  state: alerts.model.pullRequestStateTypes.REJECTED,
};
