// @flow

import { expectSaga } from 'redux-saga-test-plan';
import ObjectNotFoundError from 'errors/usage-errors/ObjectNotFoundError';

import * as t from '../../../actionTypes';
import { contextTypes } from '../../../model';
import type {
  RootContentItem,
  HeadingContentItem,
  ParagraphContentItem,
  ContentItemsById,
  ContentItemsState,
} from '../../../model';
import * as dummyData from '../../../lib/testResources/dummyContentItemData';

import reverseIndentSaga from '../reverseIndent';

describe(`reverseIndentSaga`, (): void => {

  let dummyHeading221: $Exact<HeadingContentItem>;
  let dummyParagraph22: $Exact<ParagraphContentItem>;
  let dummyParagraph21: $Exact<ParagraphContentItem>;
  let dummyHeading2: $Exact<HeadingContentItem>;
  let dummyParagraph13: $Exact<ParagraphContentItem>;
  let dummyParagraph121: $Exact<ParagraphContentItem>;
  let dummyParagraph122: $Exact<ParagraphContentItem>;
  let dummyParagraph12: $Exact<ParagraphContentItem>;
  let dummyParagraph11: $Exact<ParagraphContentItem>;
  let dummyHeading1: $Exact<HeadingContentItem>;
  let dummyRoot: $Exact<RootContentItem>;
  let dummyContentItemsById: ContentItemsById;
  let dummyContentItemsState: ContentItemsState;
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

  it(`puts a MOVE action whichs moves the contentItem right after its parentOrSuperItem, when it has a valid parentOrSuperItem`, (): void => {
    const dummyReverseIndentAction: t.ReverseIndentAction = {
      type: t.REVERSE_INDENT,
      payload: {
        id: dummyParagraph122.id,
      },
    };
    return expectSaga(reverseIndentSaga, dummyReverseIndentAction)
      .withState(dummyState)
      .put.like({
        action: {
          type: t.MOVE,
          payload: {
            id: dummyParagraph122.id,
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

  it(`correctly calculates the indexInSiblings for the MOVE action context`, (): void => {
    const dummyReverseIndentAction: t.ReverseIndentAction = {
      type: t.REVERSE_INDENT,
      payload: {
        id: dummyHeading221.id,
      },
    };
    return expectSaga(reverseIndentSaga, dummyReverseIndentAction)
      .withState(dummyState)
      .put.like({
        action: {
          type: t.MOVE,
          payload: {
            id: dummyHeading221.id,
            nextContext: {
              contextType: contextTypes.SUPER,
              contextItemId: dummyHeading2.id,
              indexInSiblingItems: 2,
            },
          },
        },
      })
      .run();
  });

  it(`does not put a MOVE action, when the contentItem does not have a parentOrSuperItem`, (): void => {
    const dummyReverseIndentAction: t.ReverseIndentAction = {
      type: t.REVERSE_INDENT,
      payload: {
        id: dummyRoot.id,
      },
    };
    return expectSaga(reverseIndentSaga, dummyReverseIndentAction)
      .withState(dummyState)
      .not.put.actionType(t.MOVE)
      .run();
  });

  it(`does not put a MOVE action, when the contentItem's parentOrSuperItem does not have a parentOrSuperItem`, (): void => {
    const dummyReverseIndentAction: t.ReverseIndentAction = {
      type: t.REVERSE_INDENT,
      payload: {
        id: dummyHeading2.id,
      },
    };
    return expectSaga(reverseIndentSaga, dummyReverseIndentAction)
      .withState(dummyState)
      .not.put.actionType(t.MOVE)
      .run();
  });

  it(`does not put a MOVE action, when the move would result in a HEADING being followed by anything other than a HEADING`, (): void => {
    const dummyReverseIndentAction: t.ReverseIndentAction = {
      type: t.REVERSE_INDENT,
      payload: {
        id: dummyParagraph12.id,
      },
    };
    return expectSaga(reverseIndentSaga, dummyReverseIndentAction)
      .withState(dummyState)
      .not.put.actionType(t.MOVE)
      .run();
  });

  it(`throws an ObjectNotFoundError, when the contentItem for the passed id could not be found`, async (): Promise<*> => {
    const dummyReverseIndentAction: t.ReverseIndentAction = {
      type: t.REVERSE_INDENT,
      payload: {
        id: 'DefinitelyNotValidId',
      },
    };

    // Suppress console.error from redux-saga $FlowFixMe
    console.error = jest.fn();
    await expect(
      expectSaga(reverseIndentSaga, dummyReverseIndentAction)
        .withState(dummyState)
        .run(),
    ).rejects.toBeInstanceOf(ObjectNotFoundError);
  });

});
