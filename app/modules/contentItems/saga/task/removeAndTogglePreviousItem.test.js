// @flow

import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { dynamic } from 'redux-saga-test-plan/providers';

import { ObjectNotFoundError } from 'errors';
import { dummyContentItemData as dummyData } from 'lib/testResources';
import asyncRequests from 'modules/asyncRequests';

import actions from '../../actions';
import * as a from '../../actionTypes';
import * as m from '../../model';

import { sagas } from '..';

describe(`removeAndTogglePreviousItem`, (): void => {

  let dummyParagraph11: m.ParagraphContentItem;
  let dummyHeading1: m.HeadingContentItem;
  let dummyRoot: m.RootContentItem;
  let dummyContentItemsById: m.ContentItemsById;
  let dummyState: any;

  beforeEach((): void => {
    dummyParagraph11 = { ...dummyData.paragraphContentItem };
    dummyHeading1 = {
      ...dummyData.headingContentItem,
      subItemIds: [dummyParagraph11.id],
    };
    dummyRoot = {
      ...dummyData.rootContentItem,
      childItemIds: [dummyHeading1.id],
    };
    dummyContentItemsById = {
      [dummyRoot.id]: dummyRoot,
      [dummyHeading1.id]: dummyHeading1,
      [dummyParagraph11.id]: dummyParagraph11,
    };
    dummyState = {
      modules: {
        contentItems: {
          byId: dummyContentItemsById,
        },
      },
    };
  });

  it(`removes the contentItem`, (): void => {
    const dummyAction = actions.removeAndTogglePreviousItem(dummyHeading1.id);

    return expectSaga(sagas.removeAndTogglePreviousItem, dummyAction)
      .withState(dummyState)
      .provide([
        [matchers.call.fn(asyncRequests.lib.putAndReturn), dynamic(({ args: [action] }: any, next: any): any => {
          return (action.type === a.REMOVE) ? null : next();
        })],
        [matchers.call.fn(asyncRequests.lib.putAndReturn), dynamic(({ args: [action] }: any, next: any): any => {
          return (action.type === a.TOGGLE_EDITING) ? null : next();
        })],
      ])
      .call(asyncRequests.lib.putAndReturn, actions.remove(dummyHeading1.id))
      .run();
  });

  it(`removes the contentItem and moves the isEditing state to the removed contentItem's previousEditorItem, when the removed contentItem has a previousEditorItem`, (): void => {
    const dummyAction = actions.removeAndTogglePreviousItem(dummyParagraph11.id);

    return expectSaga(sagas.removeAndTogglePreviousItem, dummyAction)
      .withState(dummyState)
      .provide([
        [matchers.call.fn(asyncRequests.lib.putAndReturn), dynamic(({ args: [action] }: any, next: any): any => {
          return (action.type === a.REMOVE) ? null : next();
        })],
        [matchers.call.fn(asyncRequests.lib.putAndReturn), dynamic(({ args: [action] }: any, next: any): any => {
          return (action.type === a.TOGGLE_EDITING) ? null : next();
        })],
      ])
      .call(asyncRequests.lib.putAndReturn, actions.toggleEditing(dummyHeading1.id, true))
      .call(asyncRequests.lib.putAndReturn, actions.remove(dummyParagraph11.id))
      .run();
  });

  it(`throws an ObjectNotFoundError, when the contentItem for the passed id cannot be found`, async (): Promise<void> => {
    const dummyAction = actions.removeAndTogglePreviousItem('invalidId');

    // Suppress console.error from redux-saga $FlowFixMe
    console.error = jest.fn();
    await expect(
      expectSaga(sagas.removeAndTogglePreviousItem, dummyAction)
        .withState(dummyState)
        .provide([
          [matchers.call.fn(asyncRequests.lib.putAndReturn), dynamic(({ args: [action] }: any, next: any): any => {
            return (action.type === a.REMOVE) ? null : next();
          })],
          [matchers.call.fn(asyncRequests.lib.putAndReturn), dynamic(({ args: [action] }: any, next: any): any => {
            return (action.type === a.TOGGLE_EDITING) ? null : next();
          })],
        ])
        .run(),
    ).rejects.toBeInstanceOf(ObjectNotFoundError);
  });

});
