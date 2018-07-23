// @flow

export type User = {|
  +id: string,
  +email: ?string,
  +firstName: string,
  +lastName: ?string,
|};

export type UsersById = {
  +[id: string]: User,
};

export type UsersState = {|
  +byId: UsersById,
|};
