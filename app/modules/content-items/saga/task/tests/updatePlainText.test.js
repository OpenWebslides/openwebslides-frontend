// @flow

import { expectSaga } from 'redux-saga-test-plan';

import * as t from '../../../actionTypes';
import type { UpdatePlainTextAction } from '../../../actionTypes';
import updatePlainTextSaga from '../updatePlainText';

describe(`updatePlainTextSaga`, (): void => {

  it(`puts an editPlainText action`, (): void => {
    const dummyUpdatePlainTextAction: $Exact<UpdatePlainTextAction> = {
      type: t.UPDATE_PLAIN_TEXT,
      payload: {
        id: 'abcdefghij',
        text: 'Lorem ipsum dolor sit amet.',
      },
    };
    return expectSaga(updatePlainTextSaga, dummyUpdatePlainTextAction)
      .put.like({ action: { type: t.EDIT_PLAIN_TEXT } })
      .run();
  });

  it(`temporarily replaces empty text props with a delete placeholder`, (): void => {
    const dummyUpdatePlainTextAction: $Exact<UpdatePlainTextAction> = {
      type: t.UPDATE_PLAIN_TEXT,
      payload: {
        id: 'abcdefghij',
        text: '',
      },
    };
    return expectSaga(updatePlainTextSaga, dummyUpdatePlainTextAction)
      .put.like({ action: { type: t.EDIT_PLAIN_TEXT, payload: { text: `*\\[Empty contentItems should be automatically deleted; delete functionality to be implemented later.\\]*` } } })
      .run();
  });

});
