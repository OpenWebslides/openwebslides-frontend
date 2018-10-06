// @flow

import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { dynamic } from 'redux-saga-test-plan/providers';

import asyncRequests from 'modules/asyncRequests';
import contentItems from 'modules/contentItems';

import actions from '../../actions';
import * as a from '../../actionTypes';

import { sagas } from '..';

describe(`create`, (): void => {

  let dummyId: string;
  let dummyTitle: string;
  let dummyDescription: string;
  let dummyUserId: string;
  let dummyRootId: string;

  beforeEach((): void => {
    dummyId = 'dummyId';
    dummyTitle = 'dummyTitle';
    dummyDescription = 'Lorem ipsum dolor sit amet.';
    dummyUserId = 'dummyUserId';
    dummyRootId = 'dummyRootId';
  });

  it(`puts a contentItems generateRoot action, puts a topics apiPost action and a updateContent action and returns the apiPost result`, (): void => {
    const dummyAction = actions.create(dummyTitle, dummyDescription, dummyUserId);

    return expectSaga(sagas.create, dummyAction)
      .provide([
        [matchers.call.fn(asyncRequests.lib.putAndReturn), dynamic(({ args: [action] }: any, next: any): any => {
          return (action.type === contentItems.actionTypes.GENERATE_ROOT) ? { rootContentItemId: dummyRootId } : next();
        })],
        [matchers.call.fn(asyncRequests.lib.putAndReturn), dynamic(({ args: [action] }: any, next: any): any => {
          return (action.type === a.API_POST) ? { id: dummyId } : next();
        })],
        [matchers.call.fn(asyncRequests.lib.putAndReturn), dynamic(({ args: [action] }: any, next: any): any => {
          return (action.type === a.FETCH) ? null : next();
        })],
      ])
      .call(asyncRequests.lib.putAndReturn, contentItems.actions.generateRoot())
      .call(asyncRequests.lib.putAndReturn, actions.apiPost(dummyTitle, dummyDescription, dummyRootId, dummyUserId))
      .call(asyncRequests.lib.putAndReturn, actions.fetch(dummyId))
      .put(actions.updateContent(dummyId))
      .returns({ id: dummyId })
      .run();
  });

});
