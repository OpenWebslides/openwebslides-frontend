// @flow

import { expectSaga } from 'redux-saga-test-plan';

import users from 'modules/users';

import * as actions from '../../../actions';
import * as t from '../../../actionTypes';
import signupSaga from '../signup';

describe(`signupEmail`, (): void => {
  it(`puts an apiPostUser action`, (): void => {
    const dummySignupAction: t.SignupAction = actions.signup('foo', 'faz', 'bak', 'MahPasswordY0', true);

    return expectSaga(signupSaga, dummySignupAction)
      .put(users.actions.apiPostUser('foo', 'faz', 'bak', 'MahPasswordY0', true))
      .run();
  });
});
