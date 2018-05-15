// @flow

import reducer from '../../reducer';
import * as t from '../../actionTypes';
import type {
  HeadingContentItem,
  ContentItemsState,
} from '../../model';
import * as dummyContentItemData from '../../lib/test-resources/dummyContentItemData';

describe(`SET_MULTIPLE_IN_STATE`, (): void => {
  it(`leaves the state unchanged when the passed array is empty`, (): void => {
    const prevState: ContentItemsState = {
      byId: {
        [dummyContentItemData.rootContentItem.id]: dummyContentItemData.rootContentItem,
      },
    };

    const setMultipleInStateAction: t.SetMultipleInStateAction = {
      type: t.SET_MULTIPLE_IN_STATE,
      payload: {
        contentItems: [],
      },
    };

    expect(reducer(prevState, setMultipleInStateAction)).toEqual(prevState);
  });

  it(`adds new content items to the state`, (): void => {
    const prevState: ContentItemsState = {
      byId: {
        [dummyContentItemData.rootContentItem.id]: dummyContentItemData.rootContentItem,
      },
    };

    const setMultipleInStateAction: t.SetMultipleInStateAction = {
      type: t.SET_MULTIPLE_IN_STATE,
      payload: {
        contentItems: [dummyContentItemData.headingContentItem],
      },
    };

    const nextState: ContentItemsState = {
      byId: {
        [dummyContentItemData.rootContentItem.id]: dummyContentItemData.rootContentItem,
        [dummyContentItemData.headingContentItem.id]: dummyContentItemData.headingContentItem,
      },
    };

    const resultState = reducer(prevState, setMultipleInStateAction);
    expect(resultState).toEqual(nextState);
    expect(resultState).not.toBe(prevState);
  });

  it(`replaces existing content items in the state`, (): void => {
    const prevState: ContentItemsState = {
      byId: {
        [dummyContentItemData.rootContentItem.id]: dummyContentItemData.rootContentItem,
        [dummyContentItemData.headingContentItem.id]: dummyContentItemData.headingContentItem,
      },
    };

    const newContentItem: HeadingContentItem = {
      ...dummyContentItemData.headingContentItem,
      text: 'This is a new, replaced heading!!!',
    };

    expect(dummyContentItemData.headingContentItem).not.toBe(newContentItem);

    const setMultipleInStateAction: t.SetMultipleInStateAction = {
      type: t.SET_MULTIPLE_IN_STATE,
      payload: {
        contentItems: [newContentItem],
      },
    };

    const nextState: ContentItemsState = {
      byId: {
        [dummyContentItemData.rootContentItem.id]: dummyContentItemData.rootContentItem,
        [dummyContentItemData.headingContentItem.id]: newContentItem,
      },
    };

    const resultState = reducer(prevState, setMultipleInStateAction);
    expect(resultState).toEqual(nextState);
    expect(resultState).not.toBe(prevState);
  });
});
