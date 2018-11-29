// @flow

export type User = {|
  +id: string,
  +email: ?string,
  +name: string,
  +gravatarHash: string,
  +alertEmails: ?boolean,
  +topicIds: $ReadOnlyArray<string>,
|};

// eslint-disable-next-line flowtype/require-exact-type
export type UsersById = {
  +[id: string]: User,
};

export type UsersState = {|
  +byId: UsersById,
|};
