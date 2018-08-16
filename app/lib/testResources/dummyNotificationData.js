// @flow

import notifications from 'modules/notifications';

export const notification: notifications.model.Notification = {
  id: 'dummyNotificationId',
  userId: 'dummyUserId',
  topicId: 'dummyTopicId',
  type: notifications.model.notificationTypes.CREATE,
  timestamp: 1524490428,
};

export const notification2: notifications.model.Notification = {
  id: 'dummyNotification2Id',
  userId: 'dummyUserId',
  topicId: 'dummyTopicId',
  type: notifications.model.notificationTypes.UPDATE,
  timestamp: 1524890428,
};

export const notification3: notifications.model.Notification = {
  id: 'dummyNotification3Id',
  userId: 'dummyUserId',
  topicId: 'dummyTopicId',
  type: notifications.model.notificationTypes.FORK,
  timestamp: 1224890428,
};
