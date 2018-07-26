// @flow

export type User = {|
  +id: string,
  +email: ?string,
  +name: string,
  +gravatarHash: string,
|};

export type UsersById = {
  +[id: string]: User,
};

export type UsersState = {|
  +byId: UsersById,
|};
