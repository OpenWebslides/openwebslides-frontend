// @flow

import { expectSaga } from 'redux-saga-test-plan';

import * as t from '../../../actionTypes';
import type {
  RootContentItem,
  HeadingContentItem,
  ParagraphContentItem,
  ContentItemsById,
} from '../../../model';
import * as dummyData from '../../../lib/test-resources/dummyContentItemData';

import removeSaga from '../remove';

describe(`removeSaga`, (): void => {

  let dummyParagraph11: $Exact<ParagraphContentItem>;
  let dummyHeading1: $Exact<HeadingContentItem>;
  let dummyRoot: $Exact<RootContentItem>;
  let dummyContentItemsById: $Exact<ContentItemsById>;
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

  it(`puts a removeFromState action`, (): void => {
    const dummyRemoveAction: t.RemoveAction = {
      type: t.REMOVE,
      payload: {
        id: dummyParagraph11.id,
      },
    };
    return expectSaga(removeSaga, dummyRemoveAction)
      .withState(dummyState)
      .put.like({
        action: {
          type: t.REMOVE_FROM_STATE,
          payload: {
            id: dummyParagraph11.id,
          },
        },
      })
      .run();
  });

});
