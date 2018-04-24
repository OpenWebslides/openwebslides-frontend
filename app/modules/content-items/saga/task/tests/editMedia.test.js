// @flow

import { expectSaga } from 'redux-saga-test-plan';

import * as t from '../../../actionTypes';
import type { EditMediaAction } from '../../../actionTypes';
import editMediaSaga from '../editMedia';

describe(`editMediaSaga`, (): void => {

  it(`puts an editMediaInState action`, (): void => {
    const dummyEditMediaAction: $Exact<EditMediaAction> = {
      type: t.EDIT_MEDIA,
      payload: {
        id: 'abcdefghij',
        src: 'https://google.com',
        alt: 'Dummy alt text.',
        caption: 'Dummy caption text.',
      },
    };
    return expectSaga(editMediaSaga, dummyEditMediaAction)
      .put.like({ action: { type: t.EDIT_MEDIA_IN_STATE } })
      .run();
  });

});
