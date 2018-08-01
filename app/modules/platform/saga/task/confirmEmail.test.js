// @flow

import { expectSaga } from 'redux-saga-test-plan';
import { push } from 'connected-react-router';

import * as paths from 'config/routes';

import actions from '../../actions';

import { sagas } from '..';

describe(`confirmEmail`, (): void => {

  let dummyConfirmationToken: string;

  beforeEach((): void => {
    dummyConfirmationToken = 'foobarToken';
  });

  it(`puts an apiPatchConfirmation action`, (): void => {
    const dummyAction = actions.confirmEmail(dummyConfirmationToken);

    return expectSaga(sagas.confirmEmail, dummyAction)
      .put(actions.apiPatchConfirmation(dummyConfirmationToken))
      .dispatch({ type: 'apiRequestsStatus/SET_SUCCESS' })
      .put(push(paths.AUTH_SIGNIN_ROUTE))
      .run();
  });

});

