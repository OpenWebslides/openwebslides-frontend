// @flow

export type Topic = {|
  +id: string,
  +title: string,
  +description: ?string,
  +rootContentItemId: string,
|};

// eslint-disable-next-line flowtype/require-exact-type
export type TopicsById = {
  +[topicId: string]: Topic,
};

export type TopicsState = {|
  +byId: TopicsById,
|};