// @flow

import _ from 'lodash';
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

describe(`toggleEditing`, (): void => {

  let dummyHeading2: m.HeadingContentItem;
  let dummyHeading1: m.HeadingContentItem;
  let dummyRoot: m.RootContentItem;
  let dummyContentItemsById: m.ContentItemsById;
  let dummyContentItemsState: m.ContentItemsState;
  let dummyState: any;

  beforeEach((): void => {
    dummyHeading2 = { ...dummyData.headingContentItem2, isEditing: false };
    dummyHeading1 = { ...dummyData.headingContentItem, isEditing: false };
    dummyRoot = {
      ...dummyData.rootContentItem,
      isEditing: false,
      childItemIds: [dummyHeading1.id, dummyHeading2.id],
    };
    dummyContentItemsById = {
      [dummyRoot.id]: dummyRoot,
      [dummyHeading1.id]: dummyHeading1,
      [dummyHeading2.id]: dummyHeading2,
    };
    dummyContentItemsState = { byId: dummyContentItemsById };
    dummyState = { modules: { contentItems: dummyContentItemsState } };
  });

  it(`switches the contentItem's isEditing value from TRUE to FALSE, when no explicit value was passed`, (): void => {
    dummyHeading1.isEditing = true;
    const dummyAction = actions.toggleEditing(dummyHeading1.id);

    return expectSaga(sagas.toggleEditing, dummyAction)
      .withState(dummyState)
      .provide([
        [matchers.call.fn(asyncRequests.lib.putAndReturn), dynamic(({ args: [action] }: any, next: any): any => {
          return (action.type === a.EDIT) ? null : next();
        })],
        [matchers.call.fn(asyncRequests.lib.putAndReturn), dynamic(({ args: [action] }: any, next: any): any => {
          return (action.type === a.REMOVE) ? null : next();
        })],
      ])
      .put(actions.switchEditingInState(dummyHeading1.id, null))
      .run();
  });

  it(`switches the contentItem's isEditing value from FALSE to TRUE, when no explicit value was passed`, (): void => {
    const dummyAction = actions.toggleEditing(dummyHeading1.id);

    return expectSaga(sagas.toggleEditing, dummyAction)
      .withState(dummyState)
      .provide([
        [matchers.call.fn(asyncRequests.lib.putAndReturn), dynamic(({ args: [action] }: any, next: any): any => {
          return (action.type === a.EDIT) ? null : next();
        })],
        [matchers.call.fn(asyncRequests.lib.putAndReturn), dynamic(({ args: [action] }: any, next: any): any => {
          return (action.type === a.REMOVE) ? null : next();
        })],
      ])
      .put(actions.switchEditingInState(null, dummyHeading1.id))
      .run();
  });

  it(`switches the contentItem's isEditing value to TRUE, when the passed value was TRUE`, (): void => {
    const dummyAction = actions.toggleEditing(dummyHeading1.id, true);

    return expectSaga(sagas.toggleEditing, dummyAction)
      .withState(dummyState)
      .provide([
        [matchers.call.fn(asyncRequests.lib.putAndReturn), dynamic(({ args: [action] }: any, next: any): any => {
          return (action.type === a.EDIT) ? null : next();
        })],
        [matchers.call.fn(asyncRequests.lib.putAndReturn), dynamic(({ args: [action] }: any, next: any): any => {
          return (action.type === a.REMOVE) ? null : next();
        })],
      ])
      .put(actions.switchEditingInState(null, dummyHeading1.id))
      .run();
  });

  it(`switches the contentItem's isEditing value to FALSE, when the passed value was FALSE`, (): void => {
    dummyHeading1.isEditing = true;
    const dummyAction = actions.toggleEditing(dummyHeading1.id, false);

    return expectSaga(sagas.toggleEditing, dummyAction)
      .withState(dummyState)
      .provide([
        [matchers.call.fn(asyncRequests.lib.putAndReturn), dynamic(({ args: [action] }: any, next: any): any => {
          return (action.type === a.EDIT) ? null : next();
        })],
        [matchers.call.fn(asyncRequests.lib.putAndReturn), dynamic(({ args: [action] }: any, next: any): any => {
          return (action.type === a.REMOVE) ? null : next();
        })],
      ])
      .put(actions.switchEditingInState(dummyHeading1.id, null))
      .run();
  });

  it(`doesn't do anything, when the contentItem's new isEditing value equals the previous one`, (): void => {
    const dummyAction = actions.toggleEditing(dummyHeading1.id, false);

    return expectSaga(sagas.toggleEditing, dummyAction)
      .withState(dummyState)
      .provide([
        [matchers.call.fn(asyncRequests.lib.putAndReturn), dynamic(({ args: [action] }: any, next: any): any => {
          return (action.type === a.EDIT) ? null : next();
        })],
        [matchers.call.fn(asyncRequests.lib.putAndReturn), dynamic(({ args: [action] }: any, next: any): any => {
          return (action.type === a.REMOVE) ? null : next();
        })],
      ])
      .not.put.actionType(a.SWITCH_EDITING_IN_STATE)
      .run();
  });

  it(`correctly sets the SWITCH_EDITING_IN_STATE action's previousEditingItemId, when another item was previously active`, (): void => {
    dummyHeading2.isEditing = true;
    const dummyAction = actions.toggleEditing(dummyHeading1.id, true);

    return expectSaga(sagas.toggleEditing, dummyAction)
      .withState(dummyState)
      .provide([
        [matchers.call.fn(asyncRequests.lib.putAndReturn), dynamic(({ args: [action] }: any, next: any): any => {
          return (action.type === a.EDIT) ? null : next();
        })],
        [matchers.call.fn(asyncRequests.lib.putAndReturn), dynamic(({ args: [action] }: any, next: any): any => {
          return (action.type === a.REMOVE) ? null : next();
        })],
      ])
      .put(actions.switchEditingInState(dummyHeading2.id, dummyHeading1.id))
      .run();
  });

  it(`removes the previousEditingItem, when it is empty`, (): void => {
    dummyHeading2.isEditing = true;
    dummyHeading2.text = '';
    const dummyAction = actions.toggleEditing(dummyHeading1.id, true);

    return expectSaga(sagas.toggleEditing, dummyAction)
      .withState(dummyState)
      .provide([
        [matchers.call.fn(asyncRequests.lib.putAndReturn), dynamic(({ args: [action] }: any, next: any): any => {
          return (action.type === a.EDIT) ? null : next();
        })],
        [matchers.call.fn(asyncRequests.lib.putAndReturn), dynamic(({ args: [action] }: any, next: any): any => {
          return (action.type === a.REMOVE) ? null : next();
        })],
      ])
      .call(asyncRequests.lib.putAndReturn, actions.remove(dummyHeading2.id))
      .run();
  });

  it(`executes an EDIT action on the previousEditingItem containing all its editablePropsForType`, (): void => {
    dummyHeading1.isEditing = true;
    const dummyAction = actions.toggleEditing(dummyHeading1.id, false);

    return expectSaga(sagas.toggleEditing, dummyAction)
      .withState(dummyState)
      .provide([
        [matchers.call.fn(asyncRequests.lib.putAndReturn), dynamic(({ args: [action] }: any, next: any): any => {
          return (action.type === a.EDIT) ? null : next();
        })],
        [matchers.call.fn(asyncRequests.lib.putAndReturn), dynamic(({ args: [action] }: any, next: any): any => {
          return (action.type === a.REMOVE) ? null : next();
        })],
      ])
      .call(asyncRequests.lib.putAndReturn, actions.edit(dummyHeading1.id, _.pick(dummyHeading1, m.editablePropsForType[dummyHeading1.type])))
      .run();
  });

  it(`throws an ObjectNotFoundError, when the contentItem for the passed id cannot be found`, async (): Promise<void> => {
    const dummyAction = actions.toggleEditing('invalidId');

    // Suppress console.error from redux-saga $FlowFixMe
    console.error = jest.fn();
    await expect(
      expectSaga(sagas.toggleEditing, dummyAction)
        .withState(dummyState)
        .provide([
          [matchers.call.fn(asyncRequests.lib.putAndReturn), dynamic(({ args: [action] }: any, next: any): any => {
            return (action.type === a.EDIT) ? null : next();
          })],
        ])
        .run(),
    ).rejects.toBeInstanceOf(ObjectNotFoundError);
  });

});
