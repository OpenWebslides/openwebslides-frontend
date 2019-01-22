// @flow

import { countryTypes, type CountryType } from './countries';

/* eslint-disable flowtype/require-types-at-top */

const MALE: 'genders/MALE' = 'genders/MALE';
const FEMALE: 'genders/FEMALE' = 'genders/FEMALE';
const OTHER: 'genders/OTHER' = 'genders/OTHER';

const LEARNER: 'roles/LEARNER' = 'roles/LEARNER';
const TEACHER: 'roles/TEACHER' = 'roles/TEACHER';
const COTEACHER: 'roles/COTEACHER' = 'roles/COTEACHER';

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
