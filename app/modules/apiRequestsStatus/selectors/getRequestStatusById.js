// @flow

import { type State } from 'types/state';

import * as m from '../model';

const getRequestStatusById = (state: State, props: { requestId: string }): ?m.RequestStatus => {
  const { requestId } = props;
  return state.modules.apiRequestsStatus[requestId] || null;
};

export default getRequestStatusById;
