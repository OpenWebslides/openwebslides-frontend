// @flow

import { expectSaga } from 'redux-saga-test-plan';

import contentItems from 'modules/contentItems';

import actions from '../../actions';

import { sagas } from '..';

describe(`fetchWithContent`, (): void => {

  let dummyId: string;

  beforeEach((): void => {
    dummyId = 'dummyId';
  });

  it(`puts a topics API_GET action, then puts a contentItems API_GET_ALL_BY_TOPIC_ID action, then puts a toggleContentFetched action on the passed topic id`, (): void => {
    const dummyAction = actions.fetchWithContent(dummyId);

    return expectSaga(sagas.fetchWithContent, dummyAction)
      .put(actions.apiGet(dummyId))
      .put(contentItems.actions.apiGetAllByTopicId(dummyId))
      .put(actions.toggleContentFetched(dummyId))
      .run();
  });

});
