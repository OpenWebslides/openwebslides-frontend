// @flow

import { expectSaga } from 'redux-saga-test-plan';

import * as t from '../../actionTypes';
import * as model from '../../model';
import * as dummyContentItemData from '../../lib/testResources/dummyContentItemData';

import addSaga from './add';

const {
  contentItemTypes,
  contextTypes,
  RootContentItem,
  HeadingContentItem,
  ParagraphContentItem,
  ContentItemsById,
} = model;

describe(`addSaga`, (): void => {

  let dummyParagraph22: $Exact<ParagraphContentItem>;
  let dummyParagraph21: $Exact<ParagraphContentItem>;
  let dummyHeading2: $Exact<HeadingContentItem>;
  let dummyParagraph12: $Exact<ParagraphContentItem>;
  let dummyParagraph11: $Exact<ParagraphContentItem>;
  let dummyHeading1: $Exact<HeadingContentItem>;
  let dummyRoot: $Exact<RootContentItem>;
  let dummyContentItemsById: $Exact<ContentItemsById>;
  let dummyState: any;

  beforeEach((): void => {
    dummyParagraph22 = { ...dummyContentItemData.paragraphContentItem4 };
    dummyParagraph21 = { ...dummyContentItemData.paragraphContentItem3 };
    dummyHeading2 = { ...dummyContentItemData.headingContentItem2, subItemIds: [dummyParagraph21.id, dummyParagraph22.id] };
    dummyParagraph12 = { ...dummyContentItemData.paragraphContentItem2 };
    dummyParagraph11 = { ...dummyContentItemData.paragraphContentItem };
    dummyHeading1 = { ...dummyContentItemData.headingContentItem, subItemIds: [dummyParagraph11.id, dummyParagraph12.id] };
    dummyRoot = { ...dummyContentItemData.rootContentItem, childItemIds: [dummyHeading1.id, dummyHeading2.id] };
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

  it(`puts an ADD_TO_STATE action`, (): void => {
    const dummyAddAction: t.AddAction = {
      type: t.ADD,
      payload: {
        type: contentItemTypes.PARAGRAPH,
        context: {
          contextType: contextTypes.SUPER,
          contextItemId: dummyHeading1.id,
          indexInSiblingItems: 0,
        },
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
            propsForType: dummyAddAction.payload.propsForType,
          },
        },
      })
      .run();
  });

  it(`puts a TOGGLE_EDITING action`, (): void => {
    const dummyAddAction: t.AddAction = {
      type: t.ADD,
      payload: {
        type: contentItemTypes.PARAGRAPH,
        context: {
          contextType: contextTypes.SUPER,
          contextItemId: dummyHeading1.id,
          indexInSiblingItems: 0,
        },
        propsForType: {
          text: 'Lorem ipsum dolor sit amet.',
        },
      },
    };
    return expectSaga(addSaga, dummyAddAction)
      .withState(dummyState)
      .put.actionType(t.TOGGLE_EDITING)
      .run();
  });

  it(`sets the context to NULL, if it was NULL or UNDEFINED`, (): void => {
    const dummyAddAction: t.AddAction = {
      type: t.ADD,
      payload: {
        type: contentItemTypes.ROOT,
        context: undefined,
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
            propsForType: dummyAddAction.payload.propsForType,
          },
        },
      })
      .run();
  });

  it(`converts the passed context to a VerticalContext before putting an ADD_TO_STATE action, when the passed context is a HorizontalContext`, (): void => {
    const dummyAddAction: t.AddAction = {
      type: t.ADD,
      payload: {
        type: contentItemTypes.HEADING,
        context: {
          contextType: contextTypes.SIBLING,
          contextItemId: dummyHeading1.id,
          indexInSiblingItemsShift: 0,
        },
        propsForType: {
          text: 'Lorem ipsum',
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
            context: {
              contextType: contextTypes.PARENT,
              contextItemId: dummyRoot.id,
              indexInSiblingItems: 1,
            },
            propsForType: dummyAddAction.payload.propsForType,
          },
        },
      })
      .run();
  });

});
