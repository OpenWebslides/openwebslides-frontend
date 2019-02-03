// @flow

import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { dynamic } from 'redux-saga-test-plan/providers';

import asyncRequests from 'modules/asyncRequests';

import actions from '../../actions';
import * as a from '../../actionTypes';
import lib from '../../lib';
import * as m from '../../model';

import { sagas } from '..';

describe(`generateRoot`, (): void => {

  let dummyGeneratedId: string;

  beforeEach((): void => {
    dummyGeneratedId = 'dummyGeneratedId';
    lib.generateId = jest.fn();
    lib.generateId.mockReturnValueOnce(dummyGeneratedId);
  });

  it(`generates a new ROOT, adds it to the state, generates a placeholder editable contentItem, and returns the ROOT id`, (): void => {
    const dummyAction = actions.generateRoot();

    return expectSaga(sagas.generateRoot, dummyAction)
      .provide([
        [matchers.call.fn(asyncRequests.lib.putAndReturn), dynamic(({ args: [action] }: any, next: any): any => {
          return (action.type === a.GENERATE_PLACEHOLDER) ? null : next();
        })],
      ])
      .put(actions.addToState(dummyGeneratedId, m.contentItemTypes.ROOT, null, {}))
      .call(asyncRequests.lib.putAndReturn, actions.generatePlaceholder(dummyGeneratedId))
      .returns({ rootContentItemId: dummyGeneratedId })
      .run();
  });

});
