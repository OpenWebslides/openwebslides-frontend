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

describe(`indent`, (): void => {

  let dummyParagraph24: m.ParagraphContentItem;
  let dummySlideBreak23: m.SlideBreakContentItem;
  let dummyParagraph22: m.ParagraphContentItem;
  let dummyParagraph21: m.ParagraphContentItem;
  let dummyHeading2: m.HeadingContentItem;
  let dummyParagraph12: m.ParagraphContentItem;
  let dummyParagraph11: m.ParagraphContentItem;
  let dummyHeading1: m.HeadingContentItem;
  let dummyRoot: m.RootContentItem;
  let dummyContentItemsById: m.ContentItemsById;
  let dummyContentItemsState: m.ContentItemsState;
  let dummyState: Object;

  beforeEach((): void => {
    dummyParagraph24 = { ...dummyData.paragraphContentItem5 };
    dummySlideBreak23 = { ...dummyData.slideBreakContentItem };
    dummyParagraph22 = { ...dummyData.paragraphContentItem4 };
    dummyParagraph21 = { ...dummyData.paragraphContentItem3 };
    dummyHeading2 = {
      ...dummyData.headingContentItem2,
      subItemIds: [dummyParagraph21.id, dummyParagraph22.id, dummySlideBreak23.id, dummyParagraph24.id],
    };
    dummyParagraph12 = { ...dummyData.paragraphContentItem2 };
    dummyParagraph11 = { ...dummyData.paragraphContentItem };
    dummyHeading1 = {
      ...dummyData.headingContentItem,
      subItemIds: [dummyParagraph11.id, dummyParagraph12.id],
    };
    dummyRoot = {
      ...dummyData.rootContentItem,
      childItemIds: [dummyHeading1.id, dummyHeading2.id],
    };
    dummyContentItemsById = {
      [dummyRoot.id]: dummyRoot,
      [dummyHeading1.id]: dummyHeading1,
      [dummyParagraph11.id]: dummyParagraph11,
      [dummyParagraph12.id]: dummyParagraph12,
      [dummyHeading2.id]: dummyHeading2,
      [dummyParagraph21.id]: dummyParagraph21,
      [dummyParagraph22.id]: dummyParagraph22,
      [dummySlideBreak23.id]: dummySlideBreak23,
      [dummyParagraph24.id]: dummyParagraph24,
    };
    dummyContentItemsState = { byId: dummyContentItemsById };
    dummyState = { modules: { contentItems: dummyContentItemsState } };
  });

  it(`moves the contentItem to the end of the subItems of its previousSiblingItem, when the contentItem has a subable previousSiblingItem`, (): void => {
    const dummyAction = actions.indent(dummyParagraph12.id);

    return expectSaga(sagas.indent, dummyAction)
      .withState(dummyState)
      .provide([
        [matchers.call.fn(asyncRequests.lib.putAndReturn), dynamic(({ args: [action] }: any, next: any): any => {
          return (action.type === a.MOVE) ? null : next();
        })],
      ])
      .call(asyncRequests.lib.putAndReturn, actions.move(dummyParagraph12.id, {
        contextType: m.contextTypes.SUPER,
        contextItemId: dummyParagraph11.id,
        indexInSiblingItems: 0,
      }))
      .run();
  });

  it(`correctly calculates the indexInSiblings for the MOVE action context`, (): void => {
    const dummyAction = actions.indent(dummyHeading2.id);

    return expectSaga(sagas.indent, dummyAction)
      .withState(dummyState)
      .provide([
        [matchers.call.fn(asyncRequests.lib.putAndReturn), dynamic(({ args: [action] }: any, next: any): any => {
          return (action.type === a.MOVE) ? null : next();
        })],
      ])
      .call(asyncRequests.lib.putAndReturn, actions.move(dummyHeading2.id, {
        contextType: m.contextTypes.SUPER,
        contextItemId: dummyHeading1.id,
        indexInSiblingItems: 2,
      }))
      .run();
  });

  it(`does not move the contentItem, when the contentItem does not have a previousSiblingItem`, (): void => {
    const dummyAction = actions.indent(dummyParagraph11.id);

    return expectSaga(sagas.indent, dummyAction)
      .withState(dummyState)
      .provide([
        [matchers.call.fn(asyncRequests.lib.putAndReturn), dynamic(({ args: [action] }: any, next: any): any => {
          return (action.type === a.MOVE) ? null : next();
        })],
      ])
      .not.call.fn(asyncRequests.lib.putAndReturn)
      .run();
  });

  it(`does not move the contentItem, when the contentItem's previousSiblingItem is not subable`, (): void => {
    const dummyAction = actions.indent(dummyParagraph24.id);

    return expectSaga(sagas.indent, dummyAction)
      .withState(dummyState)
      .provide([
        [matchers.call.fn(asyncRequests.lib.putAndReturn), dynamic(({ args: [action] }: any, next: any): any => {
          return (action.type === a.MOVE) ? null : next();
        })],
      ])
      .not.call.fn(asyncRequests.lib.putAndReturn)
      .run();
  });

  it(`throws an ObjectNotFoundError, when the contentItem for the passed id could not be found`, async (): Promise<void> => {
    const dummyAction = actions.indent('invalidId');

    // Suppress console.error from redux-saga $FlowFixMe
    console.error = jest.fn();
    await expect(
      expectSaga(sagas.indent, dummyAction)
        .withState(dummyState)
        .provide([
          [matchers.call.fn(asyncRequests.lib.putAndReturn), dynamic(({ args: [action] }: any, next: any): any => {
            return (action.type === a.MOVE) ? null : next();
          })],
        ])
        .run(),
    ).rejects.toBeInstanceOf(ObjectNotFoundError);
  });

});
