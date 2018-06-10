// @flow

import { expectSaga } from 'redux-saga-test-plan';

import * as t from '../../../actionTypes';
import {
  contentItemTypes,
  contextTypes,
} from '../../../model';
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

  it(`puts a toggleEditing action`, (): void => {
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

  it(`converts a context with contextType.SIBLING to a context with contextType.PARENT, when the contentItem with id context.contextItemId is a childItem`, (): void => {
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

  it(`converts a context with contextType.SIBLING to a context with contextType.SUPER, when the contentItem with id context.contextItemId is a subItem`, (): void => {
    const dummyAddAction: t.AddAction = {
      type: t.ADD,
      payload: {
        type: contentItemTypes.PARAGRAPH,
        context: {
          contextType: contextTypes.SIBLING,
          contextItemId: dummyParagraph4.id,
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
              contextType: contextTypes.SUPER,
              contextItemId: dummyHeading2.id,
              indexInSiblingItems: 2,
            },
            propsForType: dummyAddAction.payload.propsForType,
          },
        },
      })
      .run();
  });

});
