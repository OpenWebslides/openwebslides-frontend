// @flow

/* eslint-disable flowtype/require-types-at-top */

const PENDING: 'pullRequestStates/PENDING' = 'pullRequestStates/PENDING';
const OPEN: 'pullRequestStates/OPEN' = 'pullRequestStates/OPEN';
const INCOMPATIBLE: 'pullRequestStates/INCOMPATIBLE' = 'pullRequestStates/INCOMPATIBLE';
const WORKING: 'pullRequestStates/WORKING' = 'pullRequestStates/WORKING';
const ACCEPTED: 'pullRequestStates/ACCEPTED' = 'pullRequestStates/ACCEPTED';
const REJECTED: 'pullRequestStates/REJECTED' = 'pullRequestStates/REJECTED';

export const pullRequestStates = {
  PENDING,
  OPEN,
  INCOMPATIBLE,
  WORKING,
  ACCEPTED,
  REJECTED,
};

export type PullRequestState = $Values<typeof pullRequestStates>;

export type PullRequest = {|
  +id: string,
  +message: string,
  +feedback: ?string,
  +sourceTopicId: string,
  +targetTopicId: string,
  +userId: string,
  +state: PullRequestState,
  +timestamp: number,
|};

// eslint-disable-next-line flowtype/require-exact-type
export type PullRequestsById = {
  +[id: string]: PullRequest,
};

export type PullRequestsState = {|
  +byId: PullRequestsById,
|};
