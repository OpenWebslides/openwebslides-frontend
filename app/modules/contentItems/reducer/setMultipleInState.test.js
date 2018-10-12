// @flow

import { dummyContentItemData as dummyData } from 'lib/testResources';

import * as a from '../actionTypes';
import * as m from '../model';

import reducer from '.';

describe(`SET_MULTIPLE_IN_STATE`, (): void => {

  it(`leaves the state unchanged, when the passed array is empty`, (): void => {
    const prevState: m.ContentItemsState = {
      byId: {
        [dummyData.rootContentItem.id]: dummyData.rootContentItem,
      },
    };
    const setMultipleInStateAction: a.SetMultipleInStateAction = {
      type: a.SET_MULTIPLE_IN_STATE,
      payload: {
        contentItems: [],
      },
    };
    const resultState = reducer(prevState, setMultipleInStateAction);

    expect(resultState).toBe(prevState);
    expect(resultState.byId).toBe(prevState.byId);
  });

  it(`adds new content items to the state`, (): void => {
    const prevState: m.ContentItemsState = {
      byId: {
        [dummyData.rootContentItem.id]: dummyData.rootContentItem,
      },
    };
    const setMultipleInStateAction: a.SetMultipleInStateAction = {
      type: a.SET_MULTIPLE_IN_STATE,
      payload: {
        contentItems: [dummyData.headingContentItem],
      },
    };
    const nextState: m.ContentItemsState = {
      byId: {
        [dummyData.rootContentItem.id]: dummyData.rootContentItem,
        [dummyData.headingContentItem.id]: dummyData.headingContentItem,
      },
    };
    const resultState = reducer(prevState, setMultipleInStateAction);

    expect(resultState).toStrictEqual(nextState);
    expect(resultState).not.toBe(prevState);
    expect(resultState.byId).not.toBe(prevState.byId);
  });

  it(`replaces existing content items in the state`, (): void => {
    const prevState: m.ContentItemsState = {
      byId: {
        [dummyData.rootContentItem.id]: dummyData.rootContentItem,
        [dummyData.headingContentItem.id]: dummyData.headingContentItem,
      },
    };
    const newContentItem: m.HeadingContentItem = {
      ...dummyData.headingContentItem,
      text: 'This is a new, replaced heading!!!',
    };
    const setMultipleInStateAction: a.SetMultipleInStateAction = {
      type: a.SET_MULTIPLE_IN_STATE,
      payload: {
        contentItems: [newContentItem],
      },
    };
    const nextState: m.ContentItemsState = {
      byId: {
        [dummyData.rootContentItem.id]: dummyData.rootContentItem,
        [dummyData.headingContentItem.id]: newContentItem,
      },
    };

    const resultState = reducer(prevState, setMultipleInStateAction);
    expect(resultState).toStrictEqual(nextState);
    expect(resultState).not.toBe(prevState);
    expect(resultState.byId).not.toBe(prevState.byId);
    expect(resultState.byId[dummyData.headingContentItem.id]).not.toBe(prevState.byId[dummyData.headingContentItem.id]);
  });

});
