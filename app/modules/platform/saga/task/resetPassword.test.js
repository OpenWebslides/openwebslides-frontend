// @flow

import { expectSaga } from 'redux-saga-test-plan';
import { push } from 'connected-react-router';

import * as paths from 'config/routes';

import actions from '../../actions';

import { sagas } from '..';

describe(`resetPassword`, (): void => {

  let dummyPassword: string;
  let dummyResetPasswordToken: string;

  beforeEach((): void => {
    dummyResetPasswordToken = 'foobarToken';
    dummyPassword = 'P@ssword1';
  });

  it(`puts an apiPatchPassword action`, (): void => {
    const dummyAction = actions.resetPassword(dummyPassword, dummyResetPasswordToken);

    return expectSaga(sagas.resetPassword, dummyAction)
      .put(actions.apiPatchPassword(dummyPassword, dummyResetPasswordToken))
      .dispatch({ type: 'apiRequestsStatus/SET_SUCCESS' })
      .put(push(paths.AUTH_SIGNIN_ROUTE))
      .run();
  });

});
