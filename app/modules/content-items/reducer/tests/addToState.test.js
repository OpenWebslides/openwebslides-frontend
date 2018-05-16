// @flow

import reducer from '../../reducer';
import * as t from '../../actionTypes';
import { contentItemTypes } from '../../model';
import type {
  BaseContentItem,
  HeadingContentItem,
  ParagraphContentItem,
  ContentItemsState,
} from '../../model';

describe(`ADD_TO_STATE`, (): void => {

  const dummyExistingContentItem: $Exact<BaseContentItem> = {
    id: 'abcdefghij',
    type: contentItemTypes.PARAGRAPH,
  };
  const dummyNewHeadingContentItem: $Exact<HeadingContentItem> = {
    id: 'qflasjgtxr',
    type: contentItemTypes.HEADING,
    text: 'Lorem ipsum dolor sit amet',
    metadata: {
      tags: [],
      visibilityOverrides: {},
    },
    subItemIds: [],
  };
  const dummyNewParagraphContentItem: $Exact<ParagraphContentItem> = {
    id: 'w4lg2u0p1h',
    type: contentItemTypes.PARAGRAPH,
    text: 'Lorem ipsum dolor sit amet',
    metadata: {
      tags: [],
      visibilityOverrides: {},
    },
    subItemIds: [],
  };

  it(`adds a HeadingContentItem to the state, when the type is HEADING and the passed props are valid`, (): void => {
    const prevState: ContentItemsState = {
      byId: {
        [dummyExistingContentItem.id]: dummyExistingContentItem,
      },
    };
    const addToStateAction: t.AddToStateAction = {
      type: t.ADD_TO_STATE,
      payload: {
        id: dummyNewHeadingContentItem.id,
        type: contentItemTypes.HEADING,
        propsForType: {
          text: dummyNewHeadingContentItem.text,
        },
      },
    };
    const nextState: ContentItemsState = {
      byId: {
        [dummyExistingContentItem.id]: dummyExistingContentItem,
        [dummyNewHeadingContentItem.id]: dummyNewHeadingContentItem,
      },
    };
    const resultState: ContentItemsState = reducer(prevState, addToStateAction);

    expect(resultState).toEqual(nextState);
    expect(resultState).not.toBe(nextState);
    expect(resultState.byId).not.toBe(prevState.byId);
  });

  it(`adds a ParagraphContentItem to the state, when the type is PARAGRAPH and the passed props are valid`, (): void => {
    const prevState: ContentItemsState = {
      byId: {
        [dummyExistingContentItem.id]: dummyExistingContentItem,
      },
    };
    const addToStateAction: t.AddToStateAction = {
      type: t.ADD_TO_STATE,
      payload: {
        id: dummyNewParagraphContentItem.id,
        type: contentItemTypes.PARAGRAPH,
        propsForType: {
          text: dummyNewParagraphContentItem.text,
        },
      },
    };
    const nextState: ContentItemsState = {
      byId: {
        [dummyExistingContentItem.id]: dummyExistingContentItem,
        [dummyNewParagraphContentItem.id]: dummyNewParagraphContentItem,
      },
    };
    const resultState: ContentItemsState = reducer(prevState, addToStateAction);

    expect(resultState).toEqual(nextState);
    expect(resultState).not.toBe(nextState);
    expect(resultState.byId).not.toBe(prevState.byId);
  });

});
