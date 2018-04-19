// @flow

import { expectSaga } from 'redux-saga-test-plan';

import * as t from '../../../actionTypes';
import type { UpdateMediaAction } from '../../../actionTypes';
import updateMediaSaga from '../updateMedia';

describe(`updateMediaSaga`, (): void => {

  it(`puts an editMedia action`, (): void => {
    const dummyUpdateMediaAction: $Exact<UpdateMediaAction> = {
      type: t.UPDATE_MEDIA,
      payload: {
        id: 'abcdefghij',
        src: 'https://google.com',
        alt: 'Dummy alt text.',
        caption: 'Dummy caption text.',
      },
    };
    return expectSaga(updateMediaSaga, dummyUpdateMediaAction)
      .put.like({ action: { type: t.EDIT_MEDIA } })
      .run();
  });

});
