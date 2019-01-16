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

describe(`reverseIndent`, (): void => {

  let dummyHeading221: m.HeadingContentItem;
  let dummyParagraph22: m.ParagraphContentItem;
  let dummyParagraph21: m.ParagraphContentItem;
  let dummyHeading2: m.HeadingContentItem;
  let dummyParagraph13: m.ParagraphContentItem;
  let dummyParagraph121: m.ParagraphContentItem;
  let dummyParagraph122: m.ParagraphContentItem;
  let dummyParagraph12: m.ParagraphContentItem;
  let dummyParagraph11: m.ParagraphContentItem;
  let dummyHeading1: m.HeadingContentItem;
  let dummyRoot: m.RootContentItem;
  let dummyContentItemsById: m.ContentItemsById;
  let dummyContentItemsState: m.ContentItemsState;
  let dummyState: Object;

  beforeEach((): void => {
    dummyHeading221 = { ...dummyData.headingContentItem3 };
    dummyParagraph22 = {
      ...dummyData.paragraphContentItem7,
      subItemIds: [dummyHeading221.id],
    };
    dummyParagraph21 = { ...dummyData.paragraphContentItem6 };
    dummyHeading2 = {
      ...dummyData.headingContentItem2,
      subItemIds: [dummyParagraph21.id, dummyParagraph22.id],
    };
    dummyParagraph13 = { ...dummyData.paragraphContentItem5 };
    dummyParagraph122 = { ...dummyData.paragraphContentItem4 };
    dummyParagraph121 = { ...dummyData.paragraphContentItem3 };
    dummyParagraph12 = {
      ...dummyData.paragraphContentItem2,
      subItemIds: [dummyParagraph121.id, dummyParagraph122.id],
    };
    dummyParagraph11 = { ...dummyData.paragraphContentItem };
    dummyHeading1 = {
      ...dummyData.headingContentItem,
      subItemIds: [dummyParagraph11.id, dummyParagraph12.id, dummyParagraph13.id],
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
      [dummyParagraph121.id]: dummyParagraph121,
      [dummyParagraph122.id]: dummyParagraph122,
      [dummyParagraph13.id]: dummyParagraph13,
      [dummyHeading2.id]: dummyHeading2,
      [dummyParagraph21.id]: dummyParagraph21,
      [dummyParagraph22.id]: dummyParagraph22,
      [dummyHeading221.id]: dummyHeading221,
    };
    dummyContentItemsState = { byId: dummyContentItemsById };
    dummyState = { modules: { contentItems: dummyContentItemsState } };
  });

  it(`moves the contentItem right after its parentOrSuperItem, when it has a valid parentOrSuperItem`, (): void => {
    const dummyAction = actions.reverseIndent(dummyParagraph122.id);

    return expectSaga(sagas.reverseIndent, dummyAction)
      .withState(dummyState)
      .provide([
        [matchers.call.fn(asyncRequests.lib.putAndReturn), dynamic(({ args: [action] }: any, next: any): any => {
          return (action.type === a.MOVE) ? null : next();
        })],
      ])
      .call(asyncRequests.lib.putAndReturn, actions.move(
        dummyParagraph122.id,
        {
          contextType: m.contextTypes.SUPER,
          contextItemId: dummyHeading1.id,
          indexInSiblingItems: 2,
        },
      ))
      .run();
  });

  it(`correctly calculates the indexInSiblings for the MOVE action context`, (): void => {
    const dummyAction = actions.reverseIndent(dummyHeading221.id);

    return expectSaga(sagas.reverseIndent, dummyAction)
      .withState(dummyState)
      .provide([
        [matchers.call.fn(asyncRequests.lib.putAndReturn), dynamic(({ args: [action] }: any, next: any): any => {
          return (action.type === a.MOVE) ? null : next();
        })],
      ])
      .call(asyncRequests.lib.putAndReturn, actions.move(
        dummyHeading221.id,
        {
          contextType: m.contextTypes.SUPER,
          contextItemId: dummyHeading2.id,
          indexInSiblingItems: 2,
        },
      ))
      .run();
  });

  it(`does not move the contentItem, when the contentItem does not have a parentOrSuperItem`, (): void => {
    const dummyAction = actions.reverseIndent(dummyRoot.id);

    return expectSaga(sagas.reverseIndent, dummyAction)
      .withState(dummyState)
      .provide([
        [matchers.call.fn(asyncRequests.lib.putAndReturn), dynamic(({ args: [action] }: any, next: any): any => {
          return (action.type === a.MOVE) ? null : next();
        })],
      ])
      .not.call.fn(asyncRequests.lib.putAndReturn)
      .run();
  });

  it(`does not move the contentItem, when the contentItem's parentOrSuperItem does not have a parentOrSuperItem`, (): void => {
    const dummyAction = actions.reverseIndent(dummyHeading2.id);

    return expectSaga(sagas.reverseIndent, dummyAction)
      .withState(dummyState)
      .provide([
        [matchers.call.fn(asyncRequests.lib.putAndReturn), dynamic(({ args: [action] }: any, next: any): any => {
          return (action.type === a.MOVE) ? null : next();
        })],
      ])
      .not.call.fn(asyncRequests.lib.putAndReturn)
      .run();
  });

  it(`does not move the contentItem, when the move would result in a HEADING being followed by anything other than a HEADING`, (): void => {
    const dummyAction = actions.reverseIndent(dummyParagraph12.id);

    return expectSaga(sagas.reverseIndent, dummyAction)
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
    const dummyAction = actions.reverseIndent('invalidId');

    // Suppress console.error from redux-saga $FlowFixMe
    console.error = jest.fn();
    await expect(
      expectSaga(sagas.reverseIndent, dummyAction)
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
