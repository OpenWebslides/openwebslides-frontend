// @flow

/* eslint-disable flowtype/require-types-at-top */

const COMMENT: 'notificationTypes/COMMENT' = 'notificationTypes/COMMENT';
const CREATE: 'notificationTypes/CREATE' = 'notificationTypes/CREATE';
const FORK: 'notificationTypes/FORK' = 'notificationTypes/FORK';
const UPDATE: 'notificationTypes/UPDATE' = 'notificationTypes/UPDATE';

export const notificationTypes = {
  COMMENT,
  CREATE,
  FORK,
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
export type NotificationsById = {
  +[notificationId: string]: Notification,
};

export type NotificationsState = {|
  +byId: NotificationsById,
|};
