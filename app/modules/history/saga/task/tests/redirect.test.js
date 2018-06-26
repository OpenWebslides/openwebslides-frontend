// @flow

import { expectSaga } from 'redux-saga-test-plan';

import * as t from '../../../actionTypes';
import type { RedirectAction } from '../../../actionTypes';
import redirectSaga from '../redirect';

describe(`redirect`, (): void => {
  it(`puts an setInState action`, (): void => {
    const dummyRedirectAction: RedirectAction = {
      type: t.REDIRECT,
      payload: {
        location: '/foobar',
      },
    };

    return expectSaga(redirectSaga, dummyRedirectAction)
      .put.like({ action: { type: t.SET_IN_STATE, payload: { location: '/foobar' } } })
      .run();
  });
});
