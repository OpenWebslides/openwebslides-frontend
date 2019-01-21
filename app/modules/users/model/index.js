// @flow

import { countryTypes, type CountryType } from './countries';

/* eslint-disable flowtype/require-types-at-top */

const MALE: 'users/MALE' = 'users/MALE';
const FEMALE: 'users/FEMALE' = 'users/FEMALE';
const OTHER: 'users/OTHER' = 'users/OTHER';

const LEARNER: 'users/LEARNER' = 'users/LEARNER';
const TEACHER: 'users/TEACHER' = 'users/TEACHER';
const COTEACHER: 'users/COTEACHER' = 'users/COTEACHER';

export const genderTypes = {
  MALE,
  FEMALE,
  OTHER,
};

export const roleTypes = {
  LEARNER,
  TEACHER,
  COTEACHER,
};

export { countryTypes };

export type GenderType = $Values<typeof genderTypes>;

export type RoleType = $Values<typeof roleTypes>;

export type { CountryType };

export type User = {|
  +id: string,
  +email: ?string,
  +name: string,
  +gravatarHash: string,
  +locale: ?string,
  +alertEmails: ?boolean,
  +topicIds: $ReadOnlyArray<string>,
  +age: ?number,
  +gender: ?GenderType,
  +role: ?RoleType,
  +country: ?CountryType,
|};

// eslint-disable-next-line flowtype/require-exact-type
export type UsersById = {
  +[id: string]: User,
};

export type UsersState = {|
  +byId: UsersById,
|};
