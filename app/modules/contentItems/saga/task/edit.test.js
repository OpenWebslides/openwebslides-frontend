// @flow

import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { dynamic } from 'redux-saga-test-plan/providers';

import { NotYetImplementedError, ObjectNotFoundError } from 'errors';
import { dummyContentItemData as dummyData } from 'lib/testResources';
import asyncRequests from 'modules/asyncRequests';

import actions from '../../actions';
import * as a from '../../actionTypes';
import * as m from '../../model';

import { sagas } from '..';

describe(`edit`, (): void => {

  let dummyEditedText: string;

  let dummyParagraph12: m.ParagraphContentItem;
  let dummyParagraph11: m.ParagraphContentItem;
  let dummyHeading1: m.HeadingContentItem;
  let dummyRoot: m.RootContentItem;
  let dummyContentItemsById: m.ContentItemsById;
  let dummyContentItemsState: m.ContentItemsState;
  let dummyState: any;

  beforeEach((): void => {
    dummyEditedText = 'This text has been edited.';

    dummyParagraph12 = { ...dummyData.paragraphContentItem2 };
    dummyParagraph11 = { ...dummyData.paragraphContentItem };
    dummyHeading1 = {
      ...dummyData.headingContentItem,
      subItemIds: [dummyParagraph11.id, dummyParagraph12.id],
    };
    dummyRoot = {
      ...dummyData.rootContentItem,
      childItemIds: [dummyHeading1.id],
    };
    dummyContentItemsById = {
      [dummyRoot.id]: dummyRoot,
      [dummyHeading1.id]: dummyHeading1,
      [dummyParagraph11.id]: dummyParagraph11,
      [dummyParagraph12.id]: dummyParagraph12,
    };
    dummyContentItemsState = {
      byId: dummyContentItemsById,
    };
    dummyState = {
      modules: {
        contentItems: dummyContentItemsState,
      },
    };
  });

  it(`puts an EDIT_PROPS_FOR_TYPE_IN_STATE action`, (): void => {
    const dummyAction = actions.edit(dummyParagraph11.id, { text: dummyEditedText });

    return expectSaga(sagas.edit, dummyAction)
      .withState(dummyState)
      .provide([
        [matchers.call.fn(asyncRequests.lib.putAndReturn), dynamic(({ args: [action] }: any, next: any): any => {
          return (action.type === a.REMOVE) ? null : next();
        })],
      ])
      .put(actions.editPropsForTypeInState(dummyParagraph11, { text: dummyEditedText }))
      .run();
  });

  it(`removes the contentItem, when a plainText contentItem's isEditing state is FALSE and its text property is being set to an empty string`, (): void => {
    const dummyAction = actions.edit(dummyParagraph11.id, { text: '' });

    return expectSaga(sagas.edit, dummyAction)
      .withState(dummyState)
      .provide([
        [matchers.call.fn(asyncRequests.lib.putAndReturn), dynamic(({ args: [action] }: any, next: any): any => {
          return (action.type === a.REMOVE) ? null : next();
        })],
      ])
      .call(asyncRequests.lib.putAndReturn, actions.remove(dummyParagraph11.id))
      .run();
  });

  it(`does not remove the contentItem, when a plainText contentItem's isEditing state is TRUE and its text property is being set to an empty string`, (): void => {
    dummyParagraph11.isEditing = true;
    const dummyAction = actions.edit(dummyParagraph11.id, { text: '' });

    return expectSaga(sagas.edit, dummyAction)
      .withState(dummyState)
      .provide([
        [matchers.call.fn(asyncRequests.lib.putAndReturn), dynamic(({ args: [action] }: any, next: any): any => {
          return (action.type === a.REMOVE) ? null : next();
        })],
      ])
      .not.call(asyncRequests.lib.putAndReturn, actions.remove(dummyParagraph11.id))
      .run();
  });

  it(`throws an ObjectNotFoundError, when the contentItem for the passed id cannot be found`, async (): Promise<mixed> => {
    const dummyAction = actions.edit('dummyInvalidId', { text: dummyEditedText });

    // Suppress console.error from redux-saga $FlowFixMe
    console.error = jest.fn();
    await expect(
      expectSaga(sagas.edit, dummyAction)
        .withState(dummyState)
        .provide([
          [matchers.call.fn(asyncRequests.lib.putAndReturn), dynamic(({ args: [action] }: any, next: any): any => {
            return (action.type === a.REMOVE) ? null : next();
          })],
        ])
        .run(),
    ).rejects.toBeInstanceOf(ObjectNotFoundError);
  });

  it(`temporarily throws a NotYetImplementedError, when the contentItem's type is not a plainTextContentItemType`, async (): Promise<mixed> => {
    const dummyAction = actions.edit(dummyRoot.id, {});

    // Suppress console.error from redux-saga $FlowFixMe
    console.error = jest.fn();
    await expect(
      expectSaga(sagas.edit, dummyAction)
        .withState(dummyState)
        .provide([
          [matchers.call.fn(asyncRequests.lib.putAndReturn), dynamic(({ args: [action] }: any, next: any): any => {
            return (action.type === a.REMOVE) ? null : next();
          })],
        ])
        .run(),
    ).rejects.toBeInstanceOf(NotYetImplementedError);
  });

});
