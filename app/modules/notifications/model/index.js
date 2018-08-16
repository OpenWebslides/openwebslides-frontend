// @flow

/* eslint-disable flowtype/require-types-at-top */

const CREATE: 'notificationTypes/CREATE' = 'notificationTypes/CREATE';
const FORK: 'notificationTypes/FORK' = 'notificationTypes/FORK';
const COMMENT: 'notificationTypes/COMMENT' = 'notificationTypes/COMMENT';
const UPDATE: 'notificationTypes/UPDATE' = 'notificationTypes/UPDATE';

export const notificationTypes = {
  CREATE,
  FORK,
  COMMENT,
  UPDATE,
};

export type NotificationType = $Values<typeof notificationTypes>;

export type Notification = {|
  +id: string,
  +userId: string,
  +topicId: string,
  +type: NotificationType,
  +timestamp: number,
|};

// eslint-disable-next-line flowtype/require-exact-type
export type NotificationsState = {
  +[notificationId: string]: Notification,
};
