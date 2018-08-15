// @flow

import { expectSaga } from 'redux-saga-test-plan';

import actions from '../../actions';
import * as a from '../../actionTypes';

import { sagas } from '..';

describe(`edit`, (): void => {

  let dummyId: string;
  let dummyEditedProps: $PropertyType<$PropertyType<a.EditAction, 'payload'>, 'editedProps'>;

  beforeEach((): void => {
    dummyId = 'dummyId';
    dummyEditedProps = {
      title: 'dummyTitle',
      description: null,
    };
  });

  it(`puts a topics editInState action`, (): void => {
    const dummyAction = actions.edit(dummyId, dummyEditedProps);

    return expectSaga(sagas.edit, dummyAction)
      .put(actions.editInState(dummyId, dummyEditedProps))
      .run();
  });

});
