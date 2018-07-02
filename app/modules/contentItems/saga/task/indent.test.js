// @flow

import { expectSaga } from 'redux-saga-test-plan';
import ObjectNotFoundError from 'errors/usage-errors/ObjectNotFoundError';

import * as t from '../../actionTypes';
import { contextTypes } from '../../model';
import type {
  RootContentItem,
  HeadingContentItem,
  ParagraphContentItem,
  SlideBreakContentItem,
  ContentItemsById,
  ContentItemsState,
} from '../../model';
import * as dummyData from '../../lib/testResources/dummyContentItemData';

import indentSaga from './indent';

describe(`indentSaga`, (): void => {

  let dummyParagraph24: $Exact<ParagraphContentItem>;
  let dummySlideBreak23: $Exact<SlideBreakContentItem>;
  let dummyParagraph22: $Exact<ParagraphContentItem>;
  let dummyParagraph21: $Exact<ParagraphContentItem>;
  let dummyHeading2: $Exact<HeadingContentItem>;
  let dummyParagraph12: $Exact<ParagraphContentItem>;
  let dummyParagraph11: $Exact<ParagraphContentItem>;
  let dummyHeading1: $Exact<HeadingContentItem>;
  let dummyRoot: $Exact<RootContentItem>;
  let dummyContentItemsById: ContentItemsById;
  let dummyContentItemsState: ContentItemsState;
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

  it(`puts a MOVE action whichs moves the contentItem to the end of the subItems of its previousSiblingItem, when the contentItem has a subable previousSiblingItem`, (): void => {
    const dummyIndentAction: t.IndentAction = {
      type: t.INDENT,
      payload: {
        id: dummyParagraph12.id,
      },
    };
    return expectSaga(indentSaga, dummyIndentAction)
      .withState(dummyState)
      .put.like({
        action: {
          type: t.MOVE,
          payload: {
            id: dummyParagraph12.id,
            nextContext: {
              contextType: contextTypes.SUPER,
              contextItemId: dummyParagraph11.id,
              indexInSiblingItems: 0,
            },
          },
        },
      })
      .run();
  });

  it(`correctly calculates the indexInSiblings for the MOVE action context`, (): void => {
    const dummyIndentAction: t.IndentAction = {
      type: t.INDENT,
      payload: {
        id: dummyHeading2.id,
      },
    };
    return expectSaga(indentSaga, dummyIndentAction)
      .withState(dummyState)
      .put.like({
        action: {
          type: t.MOVE,
          payload: {
            id: dummyHeading2.id,
            nextContext: {
              contextType: contextTypes.SUPER,
              contextItemId: dummyHeading1.id,
              indexInSiblingItems: 2,
            },
          },
        },
      })
      .run();
  });

  it(`does not put a MOVE action, when the contentItem does not have a previousSiblingItem`, (): void => {
    const dummyIndentAction: t.IndentAction = {
      type: t.INDENT,
      payload: {
        id: dummyParagraph11.id,
      },
    };
    return expectSaga(indentSaga, dummyIndentAction)
      .withState(dummyState)
      .not.put.actionType(t.MOVE)
      .run();
  });

  it(`does not put a MOVE action, when the contentItem's previousSiblingItem is not subable`, (): void => {
    const dummyIndentAction: t.IndentAction = {
      type: t.INDENT,
      payload: {
        id: dummyParagraph24.id,
      },
    };
    return expectSaga(indentSaga, dummyIndentAction)
      .withState(dummyState)
      .not.put.actionType(t.MOVE)
      .run();
  });

  it(`throws an ObjectNotFoundError, when the contentItem for the passed id could not be found`, async (): Promise<*> => {
    const dummyIndentAction: t.IndentAction = {
      type: t.INDENT,
      payload: {
        id: 'DefinitelyNotValidId',
      },
    };

    // Suppress console.error from redux-saga $FlowFixMe
    console.error = jest.fn();
    await expect(
      expectSaga(indentSaga, dummyIndentAction)
        .withState(dummyState)
        .run(),
    ).rejects.toBeInstanceOf(ObjectNotFoundError);
  });

});
