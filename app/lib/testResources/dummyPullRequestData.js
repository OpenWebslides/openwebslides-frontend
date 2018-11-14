// @flow

import pullRequests from 'modules/pullRequests';

export const pullRequest: pullRequests.model.PullRequest = {
  id: 'dummyPullRequestId',
  message: 'dummyPullRequestMessage',
  sourceTopicId: 'dummySourceTopicId',
  targetTopicId: 'dummyTargetTopicId',
  userId: 'dummyUserId',
  state: pullRequests.model.pullRequestStates.OPEN,
  timestamp: 1524490428,
};

export const pullRequest2: pullRequests.model.PullRequest = {
  id: 'dummyPullRequest2Id',
  message: 'dummyPullRequestMessage',
  sourceTopicId: 'dummySourceTopicId',
  targetTopicId: 'dummyTargetTopicId',
  userId: 'dummyUserId',
  state: pullRequests.model.pullRequestStates.OPEN,
  timestamp: 1524490408,
};

export const pullRequest3: pullRequests.model.PullRequest = {
  id: 'dummyPullRequest3Id',
  message: 'dummyPullRequestMessage',
  sourceTopicId: 'dummySourceTopicId',
  targetTopicId: 'dummyTargetTopicId',
  userId: 'dummyUserId',
  state: pullRequests.model.pullRequestStates.OPEN,
  timestamp: 1524490328,
};

export const rejectedPullRequest: pullRequests.model.PullRequest = {
  id: 'dummyRejectedPullRequestId',
  message: 'dummyPullRequestMessage',
  sourceTopicId: 'dummySourceTopicId',
  targetTopicId: 'dummyTargetTopicId',
  userId: 'dummyUserId',
  state: pullRequests.model.pullRequestStates.REJECTED,
  timestamp: 1524490308,
};

export const acceptedPullRequest: pullRequests.model.PullRequest = {
  id: 'dummyAcceptedPullRequestId',
  message: 'dummyPullRequestMessage',
  sourceTopicId: 'dummySourceTopicId',
  targetTopicId: 'dummyTargetTopicId',
  userId: 'dummyUserId',
  state: pullRequests.model.pullRequestStates.ACCEPTED,
  timestamp: 1524490228,
};
