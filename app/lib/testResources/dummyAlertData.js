// @flow

import alerts from 'modules/alerts';

export const updateAlert1: alerts.model.UpdateAlert = {
  id: 'dummyUpdateAlert1',
  userId: 'dummyUserId',
  timestamp: 1540833592,
  topicId: 'dummyTopicId',
  count: 3,
};

export const updateAlert2: alerts.model.UpdateAlert = {
  id: 'dummyUpdateAlert2',
  userId: 'dummyUserId',
  timestamp: 1540833392,
  topicId: 'dummyTopicId',
  count: 2,
};

export const pullRequestAlert1: alerts.model.PullRequestAlert = {
  id: 'dummyPullRequestAlert1',
  userId: 'dummyUser1Id',
  timestamp: 1540833792,
  pullRequestId: 'dummyPullRequestId',
  subjectUserId: 'dummySubjectUserId',
  type: alerts.model.pullRequestAlertTypes.SUBMITTED,
};

export const pullRequestAlert2: alerts.model.PullRequestAlert = {
  id: 'dummyPullRequestAlert2',
  userId: 'dummyUser2Id',
  timestamp: 1540833892,
  pullRequestId: 'dummyPullRequestId',
  subjectUserId: 'dummySubjectUserId',
  type: alerts.model.pullRequestAlertTypes.ACCEPTED,
};

export const pullRequestAlert3: alerts.model.PullRequestAlert = {
  id: 'dummyPullRequestAlert3',
  userId: 'dummyUser2Id',
  timestamp: 1540833892,
  pullRequestId: 'dummyPullRequestId',
  subjectUserId: 'dummySubjectUserId',
  type: alerts.model.pullRequestAlertTypes.REJECTED,
};
