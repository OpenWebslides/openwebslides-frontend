// @flow

import { expectSaga } from 'redux-saga-test-plan';

import asyncRequests from 'modules/asyncRequests';

import actions from '../../actions';

import { sagas } from '..';

describe(`update`, (): void => {

  let dummyId: string;
  let dummyTitle: string;
  let dummyDescription: string;

  beforeEach((): void => {
    dummyId = 'dummyId';
    dummyTitle = 'dummyTitle';
    dummyDescription = 'dummyDescription';
  });

  it(`puts a topics apiPatch action, and a fetch action`, (): void => {
    const dummyAction = actions.update(dummyId, dummyTitle, dummyDescription);

    return expectSaga(sagas.update, dummyAction)
      .call(asyncRequests.lib.putAndReturn, actions.apiPatch(dummyId, dummyTitle, dummyDescription))
      .call(asyncRequests.lib.putAndReturn, actions.fetch(dummyId))
      .run();
  });

});
