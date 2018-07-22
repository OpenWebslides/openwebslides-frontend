// @flow

export type User = {
  +id: string,
  +firstName: string,
  +lastName?: ?string,
  +email?: string,
};

export type UsersState = {
  +[userId: string]: User,
};

export const getName = (user: User): string => {
  if (user.lastName) return `${user.firstName} ${user.lastName}`;
  else return user.firstName;
};
