// @flow

import { expectSaga } from 'redux-saga-test-plan';

import * as t from '../../../actionTypes';
import type { EditAction } from '../../../actionTypes';
import { contentItemTypes } from '../../../model';
import editSaga from '../edit';

describe(`editSaga`, (): void => {

  it(`puts an editInState action`, (): void => {
    const dummyEditAction: $Exact<EditAction> = {
      type: t.EDIT,
      payload: {
        id: 'abcdefghij',
        type: contentItemTypes.HEADING,
        propsForType: {
          text: 'Lorem ipsum dolor sit amet.',
        },
      },
    };
    return expectSaga(editSaga, dummyEditAction)
      .put.like({ action: { type: t.EDIT_IN_STATE } })
      .run();
  });

  it(`temporarily replaces empty text props with a delete placeholder`, (): void => {
    const dummyEditAction: $Exact<EditAction> = {
      type: t.EDIT,
      payload: {
        id: 'abcdefghij',
        type: contentItemTypes.HEADING,
        propsForType: {
          text: '',
        },
      },
    };
    return expectSaga(editSaga, dummyEditAction)
      .put.like({
        action: {
          type: t.EDIT_IN_STATE,
          payload: {
            propsForType: {
              text: `*\\[Empty contentItems should be automatically deleted; delete functionality to be implemented later.\\]*`,
            },
          },
        },
      })
      .run();
  });

});
