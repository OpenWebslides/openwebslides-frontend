// @flow

import { type AppState } from 'types/redux';

import * as m from '../model';

const getById = (state: AppState, props: { id: string }): ?m.Alert => {
  const { id } = props;
  return state.modules.alerts.byId[id] || null;
};

export default getById;
