// @flow

import { expectSaga } from 'redux-saga-test-plan';
import NotYetImplementedError from 'errors/implementation-errors/NotYetImplementedError';

import * as t from '../../../actionTypes';
import { contentItemTypes } from '../../../model';
import type {
  RootContentItem,
  HeadingContentItem,
  ParagraphContentItem,
  ContentItemsById,
} from '../../../model';
import * as dummyContentItemData from '../../../lib/test-resources/dummyContentItemData';

import addSaga from '../add';

describe(`addSaga`, (): void => {

  const dummyParagraph4: $Exact<ParagraphContentItem> = {
    ...dummyContentItemData.paragraphContentItem4,
  };
  const dummyParagraph3: $Exact<ParagraphContentItem> = {
    ...dummyContentItemData.paragraphContentItem3,
  };
  const dummyHeading2: $Exact<HeadingContentItem> = {
    ...dummyContentItemData.headingContentItem2,
    subItemIds: [dummyParagraph3.id, dummyParagraph4.id],
  };
  const dummyParagraph2: $Exact<ParagraphContentItem> = {
    ...dummyContentItemData.paragraphContentItem2,
  };
  const dummyParagraph1: $Exact<ParagraphContentItem> = {
    ...dummyContentItemData.paragraphContentItem,
  };
  const dummyHeading1: $Exact<HeadingContentItem> = {
    ...dummyContentItemData.headingContentItem,
    subItemIds: [dummyParagraph1.id, dummyParagraph2.id],
  };
  const dummyRoot: $Exact<RootContentItem> = {
    ...dummyContentItemData.rootContentItem,
    childItemIds: [dummyHeading1.id, dummyHeading2.id],
  };
  const dummyContentItemsById: $Exact<ContentItemsById> = {
    [dummyRoot.id]: dummyRoot,
    [dummyHeading1.id]: dummyHeading1,
    [dummyParagraph1.id]: dummyParagraph1,
    [dummyParagraph2.id]: dummyParagraph2,
    [dummyHeading2.id]: dummyHeading2,
    [dummyParagraph3.id]: dummyParagraph3,
    [dummyParagraph4.id]: dummyParagraph4,
  };
  const dummyState: any = {
    modules: {
      contentItems: {
        byId: dummyContentItemsById,
      },
    },
  };

  it(`puts an addToState action`, (): void => {
    const dummyAddAction: t.AddAction = {
      type: t.ADD,
      payload: {
        type: contentItemTypes.PARAGRAPH,
        context: {
          contextType: t.actionPayloadSagaContextTypes.SUPER,
          contextItemId: dummyHeading1.id,
          positionInSiblings: 0,
        },
        isEditing: false,
        propsForType: {
          text: 'Lorem ipsum dolor sit amet.',
        },
      },
    };
    return expectSaga(addSaga, dummyAddAction)
      .withState(dummyState)
      .put.like({
        action: {
          type: t.ADD_TO_STATE,
          payload: {
            type: dummyAddAction.payload.type,
            context: dummyAddAction.payload.context,
            isEditing: dummyAddAction.payload.isEditing,
            propsForType: dummyAddAction.payload.propsForType,
          },
        },
      })
      .run();
  });

  it(`sets the context to NULL, if it was NULL or UNDEFINED`, (): void => {
    const dummyAddAction: t.AddAction = {
      type: t.ADD,
      payload: {
        type: contentItemTypes.ROOT,
        context: undefined,
        isEditing: false,
        propsForType: {},
      },
    };
    return expectSaga(addSaga, dummyAddAction)
      .withState(dummyState)
      .put.like({
        action: {
          type: t.ADD_TO_STATE,
          payload: {
            type: dummyAddAction.payload.type,
            context: null,
            isEditing: dummyAddAction.payload.isEditing,
            propsForType: dummyAddAction.payload.propsForType,
          },
        },
      })
      .run();
  });

  it(`temporarily throws a NotYetImplementedError, when context.contextType is SIBLING`, (): void => {
    const dummyAddAction: t.AddAction = {
      type: t.ADD,
      payload: {
        type: contentItemTypes.PARAGRAPH,
        context: {
          contextType: t.actionPayloadSagaContextTypes.SIBLING,
          contextItemId: dummyParagraph1.id,
          positionInSiblings: 0,
        },
        isEditing: false,
        propsForType: {},
      },
    };
    expect((): void => {
      expectSaga(addSaga, dummyAddAction).run();
    }).toThrow(NotYetImplementedError);
  });

});
