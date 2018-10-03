// @flow

import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { dynamic } from 'redux-saga-test-plan/providers';
import { push } from 'connected-react-router';

import * as paths from 'config/routes';
import asyncRequests from 'modules/asyncRequests';

import actions from '../../actions';
import * as a from '../../actionTypes';

import { sagas } from '..';

describe(`confirmEmail`, (): void => {

  let dummyConfirmationToken: string;

  beforeEach((): void => {
    dummyConfirmationToken = 'foobarToken';
  });

  it(`puts an apiPatchConfirmation action and redirects to signin on successful request`, (): void => {
    const dummyAction = actions.confirmEmail(dummyConfirmationToken);

    return expectSaga(sagas.confirmEmail, dummyAction)
      .provide([
        [matchers.call.fn(asyncRequests.lib.putAndReturn), dynamic(({ args: [action] }: any, next: any): any => {
          return (action.type === a.API_PATCH_CONFIRMATION) ? null : next();
        })],
      ])
      .call(asyncRequests.lib.putAndReturn, actions.apiPatchConfirmation(dummyConfirmationToken))
      .put(push(paths.AUTH_SIGNIN_ROUTE))
      .run();
  });

});

