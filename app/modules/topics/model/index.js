// @flow

/* eslint-disable flowtype/require-types-at-top */

const PUBLIC: 'topics/PUBLIC' = 'topics/PUBLIC';
const PROTECTED: 'topics/PROTECTED' = 'topics/PROTECTED';
const PRIVATE: 'topics/PRIVATE' = 'topics/PRIVATE';

export const topicAccessTypes = {
  PUBLIC,
  PROTECTED,
  PRIVATE,
};

export type TopicAccessType = $Values<typeof topicAccessTypes>;

export type Topic = {|
  +id: string,
  +title: string,
  +description: ?string,
  +access: TopicAccessType,
  +userId: string,
  +rootContentItemId: string,
  +upstreamTopicId: ?string,
  +forkedTopicIds: $ReadOnlyArray<string>,
  +incomingPullRequestIds: $ReadOnlyArray<string>,
  +outgoingPullRequestIds: $ReadOnlyArray<string>,
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
