// @flow

export type Topic = {|
  +id: string,
  +title: string,
  +description: ?string,
  +rootContentItemId: string,
  +upstreamTopicId: ?string,
  +forkedTopicIds: $ReadOnlyArray<string>,
  +isContentFetched: boolean,
|};

// eslint-disable-next-line flowtype/require-exact-type
export type TopicsById = {
  +[topicId: string]: Topic,
};

export type TopicsState = {|
  +byId: TopicsById,
|};
