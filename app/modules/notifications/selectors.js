// @flow

import { type State } from 'types/state';

import * as m from './model';

const getModule = (state: State): m.NotificationsState => {
  return state.modules.notifications;
};

export const getById = (state: State, id: string): m.Notification => {
  return getModule(state)[id];
};

export const getAllById = (state: State): m.NotificationsById => {
  return getModule(state).byId;
};

export const getAll = (state: State): $ReadOnlyArray<m.Notification> => {
  const eventsById = getAllById(state);
  return Object.keys(eventsById).map((key) => eventsById[key]);
};
