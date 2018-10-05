// @flow

import { expectSaga } from 'redux-saga-test-plan';

import actions from '../../actions';
import * as a from '../../actionTypes';

import { sagas } from '..';

describe(`update`, (): void => {

  let dummyId: string;
  let dummyUpdatedProps: $PropertyType<$PropertyType<a.UpdateAction, 'payload'>, 'updatedProps'>;

  beforeEach((): void => {
    dummyId = 'dummyId';
    dummyUpdatedProps = {
      title: 'dummyTitle',
      description: null,
    };
  });

  it(`puts a topics updateInState action`, (): void => {
    const dummyAction = actions.update(dummyId, dummyUpdatedProps);

    return expectSaga(sagas.update, dummyAction)
      .put(actions.editInState(dummyId, dummyUpdatedProps))
      .run();
  });

});
