// @flow

import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { dynamic } from 'redux-saga-test-plan/providers';

import asyncRequests from 'modules/asyncRequests';
import contentItems from 'modules/contentItems';

import actions from '../../actions';
import * as a from '../../actionTypes';

import { sagas } from '..';

describe(`fetchWithContent`, (): void => {

  let dummyId: string;

  beforeEach((): void => {
    dummyId = 'dummyId';
  });

  it(`puts a topics API_GET action, then puts a contentItems API_GET_ALL_BY_TOPIC_ID action, then puts a toggleContentFetched action on the passed topic id`, (): void => {
    const dummyAction = actions.fetchWithContent(dummyId);

    return expectSaga(sagas.fetchWithContent, dummyAction)
      .provide([
        [matchers.call.fn(asyncRequests.lib.putAndReturn), dynamic(({ args: [action] }: any, next: any): any => {
          return (action.type === a.API_GET) ? null : next();
        })],
        [matchers.call.fn(asyncRequests.lib.putAndReturn), dynamic(({ args: [action] }: any, next: any): any => {
          return (action.type === contentItems.actionTypes.API_GET_ALL_BY_TOPIC_ID) ? null : next();
        })],
        [matchers.call.fn(asyncRequests.lib.putAndReturn), dynamic(({ args: [action] }: any, next: any): any => {
          return (action.type === a.TOGGLE_CONTENT_FETCHED_IN_STATE) ? null : next();
        })],
      ])
      .call(asyncRequests.lib.putAndReturn, actions.apiGet(dummyId))
      .call(asyncRequests.lib.putAndReturn, contentItems.actions.apiGetAllByTopicId(dummyId))
      .put(actions.toggleContentFetchedInState(dummyId))
      .run();
  });

});
