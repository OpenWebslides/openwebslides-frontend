// @flow

/* eslint-disable flowtype/require-types-at-top */

const OPEN: 'pullRequestStates/OPEN' = 'pullRequestStates/OPEN';
const ACCEPTED: 'pullRequestStates/ACCEPTED' = 'pullRequestStates/ACCEPTED';
const REJECTED: 'pullRequestStates/REJECTED' = 'pullRequestStates/REJECTED';

export const pullRequestStates = {
  OPEN,
  ACCEPTED,
  REJECTED,
};

export type PullRequestState = $Values<typeof pullRequestStates>;

export type PullRequest = {|
  +id: string,
  +message: string,
  // Identifier of forked topic
  +topicId: string,
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
