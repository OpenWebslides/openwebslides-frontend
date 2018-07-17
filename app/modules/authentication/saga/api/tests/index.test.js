// @flow

import { expectSaga } from 'redux-saga-test-plan';

import apiSaga from '..';

import {
  apiPostTokenSaga,
  apiDeleteTokenSaga,
} from '../token';
import { apiPostPasswordSaga } from '../password';
import { apiPostConfirmationSaga } from '../confirmation';
import * as t from '../../../actionTypes';

describe(`apiSaga`, (): void => {
  it(`takes every API_POST_TOKEN action and forks apiPostTokenSaga`, (): void => {
    return expectSaga(apiSaga)
      .take(t.API_POST_TOKEN, apiPostTokenSaga)
      .silentRun();
  });

  it(`takes every API_DELETE_TOKEN action and forks apiDeleteTokenSaga`, (): void => {
    return expectSaga(apiSaga)
      .take(t.API_DELETE_TOKEN, apiDeleteTokenSaga)
      .silentRun();
  });

  it(`takes every API_POST_PASSWORD action and forks apiPostPasswordSaga`, (): void => {
    return expectSaga(apiSaga)
      .take(t.API_POST_PASSWORD, apiPostPasswordSaga)
      .silentRun();
  });

  it(`takes every API_POST_CONFIRMATION action and forks apiPostConfirmationSaga`, (): void => {
    return expectSaga(apiSaga)
      .take(t.API_POST_CONFIRMATION, apiPostConfirmationSaga)
      .silentRun();
  });
});
