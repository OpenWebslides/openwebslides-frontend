// @flow

import { expectSaga } from 'redux-saga-test-plan';

import { dummyContentItemData as dummyData } from 'lib/testResources';

import * as a from '../../actionTypes';
import * as m from '../../model';

import { sagas } from '..';

describe(`add`, (): void => {

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

  it(`puts an ADD_TO_STATE action`, (): void => {
    const dummyAddAction: a.AddAction = {
      type: a.ADD,
      payload: {
        type: m.contentItemTypes.PARAGRAPH,
        context: {
          contextType: m.contextTypes.SUPER,
          contextItemId: dummyHeading1.id,
          indexInSiblingItems: 0,
        },
        propsForType: {
          text: 'Lorem ipsum dolor sit amet.',
        },
      },
    };
    return expectSaga(sagas.add, dummyAddAction)
      .withState(dummyState)
      .put.like({
        action: {
          type: a.ADD_TO_STATE,
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
    const dummyAddAction: a.AddAction = {
      type: a.ADD,
      payload: {
        type: m.contentItemTypes.PARAGRAPH,
        context: {
          contextType: m.contextTypes.SUPER,
          contextItemId: dummyHeading1.id,
          indexInSiblingItems: 0,
        },
        propsForType: {
          text: 'Lorem ipsum dolor sit amet.',
        },
      },
    };
    return expectSaga(sagas.add, dummyAddAction)
      .withState(dummyState)
      .put.actionType(a.TOGGLE_EDITING)
      .run();
  });

  it(`sets the context to NULL, if it was NULL or UNDEFINED`, (): void => {
    const dummyAddAction: a.AddAction = {
      type: a.ADD,
      payload: {
        type: m.contentItemTypes.ROOT,
        context: undefined,
        propsForType: {},
      },
    };
    return expectSaga(sagas.add, dummyAddAction)
      .withState(dummyState)
      .put.like({
        action: {
          type: a.ADD_TO_STATE,
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
    const dummyAddAction: a.AddAction = {
      type: a.ADD,
      payload: {
        type: m.contentItemTypes.HEADING,
        context: {
          contextType: m.contextTypes.SIBLING,
          contextItemId: dummyHeading1.id,
          indexInSiblingItemsShift: 0,
        },
        propsForType: {
          text: 'Lorem ipsum',
        },
      },
    };
    return expectSaga(sagas.add, dummyAddAction)
      .withState(dummyState)
      .put.like({
        action: {
          type: a.ADD_TO_STATE,
          payload: {
            type: dummyAddAction.payload.type,
            context: {
              contextType: m.contextTypes.PARENT,
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
