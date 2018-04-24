// @flow

import { expectSaga } from 'redux-saga-test-plan';

import * as t from '../../../actionTypes';
import type { EditPlainTextAction } from '../../../actionTypes';
import editPlainTextSaga from '../editPlainText';

describe(`editPlainTextSaga`, (): void => {

  it(`puts an editPlainTextInState action`, (): void => {
    const dummyEditPlainTextAction: $Exact<EditPlainTextAction> = {
      type: t.EDIT_PLAIN_TEXT,
      payload: {
        id: 'abcdefghij',
        text: 'Lorem ipsum dolor sit amet.',
      },
    };
    return expectSaga(editPlainTextSaga, dummyEditPlainTextAction)
      .put.like({ action: { type: t.EDIT_PLAIN_TEXT_IN_STATE } })
      .run();
  });

  it(`temporarily replaces empty text props with a delete placeholder`, (): void => {
    const dummyEditPlainTextAction: $Exact<EditPlainTextAction> = {
      type: t.EDIT_PLAIN_TEXT,
      payload: {
        id: 'abcdefghij',
        text: '',
      },
    };
    return expectSaga(editPlainTextSaga, dummyEditPlainTextAction)
      .put.like({
        action: {
          type: t.EDIT_PLAIN_TEXT_IN_STATE,
          payload: {
            text: `*\\[Empty contentItems should be automatically deleted; delete functionality to be implemented later.\\]*`,
          },
        },
      })
      .run();
  });

});
