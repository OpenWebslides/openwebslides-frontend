// @flow

import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { dynamic } from 'redux-saga-test-plan/providers';

import { dummyContentItemData as dummyData } from 'lib/testResources';
import asyncRequests from 'modules/asyncRequests';

import actions from '../../actions';
import * as a from '../../actionTypes';
import lib from '../../lib';
import * as m from '../../model';

import { sagas } from '..';

describe(`add`, (): void => {

  let dummyId: string;
  let dummyText: string;

  let dummyParagraph22: m.ParagraphContentItem;
  let dummyParagraph21: m.ParagraphContentItem;
  let dummyHeading2: m.HeadingContentItem;
  let dummyParagraph12: m.ParagraphContentItem;
  let dummyParagraph11: m.ParagraphContentItem;
  let dummyHeading1: m.HeadingContentItem;
  let dummyRoot: m.RootContentItem;
  let dummyContentItemsById: m.ContentItemsById;
  let dummyState: any;

  beforeEach((): void => {
    dummyId = 'dummyId';
    dummyText = 'Lorem ipsum dolor sit amet.';

    lib.generateId = jest.fn((): string => dummyId);

    dummyParagraph22 = { ...dummyData.paragraphContentItem4 };
    dummyParagraph21 = { ...dummyData.paragraphContentItem3 };
    dummyHeading2 = { ...dummyData.headingContentItem2, subItemIds: [dummyParagraph21.id, dummyParagraph22.id] };
    dummyParagraph12 = { ...dummyData.paragraphContentItem2 };
    dummyParagraph11 = { ...dummyData.paragraphContentItem };
    dummyHeading1 = { ...dummyData.headingContentItem, subItemIds: [dummyParagraph11.id, dummyParagraph12.id] };
    dummyRoot = { ...dummyData.rootContentItem, childItemIds: [dummyHeading1.id, dummyHeading2.id] };
    dummyContentItemsById = {
      [dummyRoot.id]: dummyRoot,
      [dummyHeading1.id]: dummyHeading1,
      [dummyParagraph11.id]: dummyParagraph11,
      [dummyParagraph12.id]: dummyParagraph12,
      [dummyHeading2.id]: dummyHeading2,
      [dummyParagraph21.id]: dummyParagraph21,
      [dummyParagraph22.id]: dummyParagraph22,
    };
    dummyState = {
      modules: {
        contentItems: {
          byId: dummyContentItemsById,
        },
      },
    };
  });

  it(`puts an ADD_TO_STATE action, then toggles the new contentItem's isEditing status to TRUE`, (): void => {
    const dummyType = m.contentItemTypes.PARAGRAPH;
    const dummyContext = {
      contextType: m.contextTypes.SUPER,
      contextItemId: dummyHeading1.id,
      indexInSiblingItems: 0,
    };
    const dummyAction = actions.add(dummyType, dummyContext, { text: dummyText });

    return expectSaga(sagas.add, dummyAction)
      .withState(dummyState)
      .provide([
        [matchers.call.fn(asyncRequests.lib.putAndReturn), dynamic(({ args: [action] }: any, next: any): any => {
          return (action.type === a.TOGGLE_EDITING) ? null : next();
        })],
      ])
      .put(actions.addToState(dummyId, dummyType, dummyContext, { text: dummyText }))
      .call(asyncRequests.lib.putAndReturn, actions.toggleEditing(dummyId, true))
      .run();
  });

  it(`sets the context to NULL, if it was NULL or UNDEFINED`, (): void => {
    const dummyType = m.contentItemTypes.PARAGRAPH;
    const dummyAction = actions.add(dummyType, undefined, { text: dummyText });

    return expectSaga(sagas.add, dummyAction)
      .withState(dummyState)
      .provide([
        [matchers.call.fn(asyncRequests.lib.putAndReturn), dynamic(({ args: [action] }: any, next: any): any => {
          return (action.type === a.TOGGLE_EDITING) ? null : next();
        })],
      ])
      .put(actions.addToState(dummyId, dummyType, null, { text: dummyText }))
      .run();
  });

  it(`converts the passed context to a VerticalContext before putting an ADD_TO_STATE action, when the passed context is a HorizontalContext`, (): void => {
    const dummyType = m.contentItemTypes.HEADING;
    const dummyHorizontalContext = {
      contextType: m.contextTypes.SIBLING,
      contextItemId: dummyHeading1.id,
      indexInSiblingItemsShift: 0,
    };
    const dummyAction = actions.add(dummyType, dummyHorizontalContext, { text: dummyText });
    const expectedVerticalContext = lib.convertContextToVerticalContext(dummyHorizontalContext, dummyContentItemsById);

    return expectSaga(sagas.add, dummyAction)
      .withState(dummyState)
      .provide([
        [matchers.call.fn(asyncRequests.lib.putAndReturn), dynamic(({ args: [action] }: any, next: any): any => {
          return (action.type === a.TOGGLE_EDITING) ? null : next();
        })],
      ])
      .put(actions.addToState(dummyId, dummyType, expectedVerticalContext, { text: dummyText }))
      .run();
  });

});
