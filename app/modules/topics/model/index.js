// @flow

/* eslint-disable flowtype/require-types-at-top */

const PUBLIC: 'topics/PUBLIC' = 'topics/PUBLIC';
const PROTECTED: 'topics/PROTECTED' = 'topics/PROTECTED';
const PRIVATE: 'topics/PRIVATE' = 'topics/PRIVATE';

export const accessTypes = {
  PUBLIC,
  PROTECTED,
  PRIVATE,
};

export type AccessType = $Values<typeof accessTypes>;

export type Topic = {|
  +id: string,
  +title: string,
  +description: ?string,
  +access: AccessType,
  +userId: string,
  +rootContentItemId: string,
  +hasOpenPullRequest: boolean,
  +timestamp: number,
  +upstreamTopicId: ?string,
  +forkedTopicIds: $ReadOnlyArray<string>,
  +incomingPullRequestIds: $ReadOnlyArray<string>,
  +outgoingPullRequestIds: $ReadOnlyArray<string>,
  +collaboratorUserIds: $ReadOnlyArray<string>,
  +isContentFetched: boolean,
  +isDirty: boolean,
|};

// eslint-disable-next-line flowtype/require-exact-type
export type TopicsById = {
  +[topicId: string]: Topic,
};

export type TopicsState = {|
  +byId: TopicsById,
|};
