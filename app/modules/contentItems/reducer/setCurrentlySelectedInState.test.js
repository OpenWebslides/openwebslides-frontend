// @flow

import { dummyContentItemData as dummyData } from 'lib/testResources';
import { ObjectNotFoundError } from 'errors';

import * as a from '../actionTypes';
import * as m from '../model';

import reducer from '.';

describe(`setCurrentlySelectedInState`, (): void => {

  let dummyContentItem: m.ContentItem;
  let dummyRootContentItem: m.ContentItem;
  let dummyEmptyRootContentItem: m.ContentItem;

  let dummyContentItemsById: m.ContentItemsById;

  beforeEach((): void => {
    dummyContentItem = dummyData.paragraphContentItem;
    dummyRootContentItem = { ...dummyData.rootContentItem, subItemIds: [dummyContentItem.id] };
    dummyEmptyRootContentItem = { ...dummyData.rootContentItem2, subItemIds: [] };

    dummyContentItemsById = {
      [dummyContentItem.id]: dummyContentItem,
      [dummyRootContentItem.id]: dummyRootContentItem,
      [dummyEmptyRootContentItem.id]: dummyEmptyRootContentItem,
    };
  });

  it(`leaves the state unchanged, when the passed id is already set in the state`, (): void => {
    const prevState: m.ContentItemsState = {
      byId: dummyContentItemsById,
      currentlySelectedId: dummyContentItem.id,
    };
    const setCurrentlySelectedInStateAction: a.SetCurrentlySelectedInStateAction = {
      type: a.SET_CURRENTLY_SELECTED_IN_STATE,
      payload: {
        id: dummyContentItem.id,
      },
    };
    const resultState = reducer(prevState, setCurrentlySelectedInStateAction);

    expect(resultState).toBe(prevState);
    expect(resultState.currentlySelectedId).toBe(prevState.currentlySelectedId);
  });

  it(`leaves the state unchanged, when the NULL is already set in the state`, (): void => {
    const prevState: m.ContentItemsState = {
      byId: dummyContentItemsById,
      currentlySelectedId: null,
    };
    const setCurrentlySelectedInStateAction: a.SetCurrentlySelectedInStateAction = {
      type: a.SET_CURRENTLY_SELECTED_IN_STATE,
      payload: {
        id: null,
      },
    };
    const resultState = reducer(prevState, setCurrentlySelectedInStateAction);

    expect(resultState).toBe(prevState);
    expect(resultState.currentlySelectedId).toBe(prevState.currentlySelectedId);
  });

  it(`sets NULL in the state`, (): void => {
    const prevState: m.ContentItemsState = {
      byId: dummyContentItemsById,
      currentlySelectedId: dummyContentItem.id,
    };
    const setCurrentlySelectedInStateAction: a.SetCurrentlySelectedInStateAction = {
      type: a.SET_CURRENTLY_SELECTED_IN_STATE,
      payload: {
        id: null,
      },
    };
    const nextState: m.ContentItemsState = {
      byId: dummyContentItemsById,
      currentlySelectedId: null,
    };

    const resultState = reducer(prevState, setCurrentlySelectedInStateAction);
    expect(resultState).toStrictEqual(nextState);
    expect(resultState).not.toBe(prevState);
    expect(resultState.currentlySelectedId).not.toBe(prevState.currentlySelectedId);
  });

  it(`sets the currently selected id in the state`, (): void => {
    const prevState: m.ContentItemsState = {
      byId: dummyContentItemsById,
      currentlySelectedId: null,
    };
    const setCurrentlySelectedInStateAction: a.SetCurrentlySelectedInStateAction = {
      type: a.SET_CURRENTLY_SELECTED_IN_STATE,
      payload: {
        id: dummyContentItem.id,
      },
    };
    const nextState: m.ContentItemsState = {
      byId: dummyContentItemsById,
      currentlySelectedId: dummyContentItem.id,
    };

    const resultState = reducer(prevState, setCurrentlySelectedInStateAction);
    expect(resultState).toStrictEqual(nextState);
    expect(resultState).not.toBe(prevState);
    expect(resultState.currentlySelectedId).not.toBe(prevState.currentlySelectedId);
  });

  it(`sets the first subItem of the passed contentItem in the state, when the passed contentItem is a ROOT content item and it has subItems`, (): void => {
    const prevState: m.ContentItemsState = {
      byId: dummyContentItemsById,
      currentlySelectedId: null,
    };
    const setCurrentlySelectedInStateAction: a.SetCurrentlySelectedInStateAction = {
      type: a.SET_CURRENTLY_SELECTED_IN_STATE,
      payload: {
        id: dummyRootContentItem.id,
      },
    };
    const nextState: m.ContentItemsState = {
      byId: dummyContentItemsById,
      currentlySelectedId: dummyContentItem.id,
    };

    const resultState = reducer(prevState, setCurrentlySelectedInStateAction);
    expect(resultState).toStrictEqual(nextState);
    expect(resultState).not.toBe(prevState);
    expect(resultState.currentlySelectedId).not.toBe(prevState.currentlySelectedId);
  });

  it(`leaves the state unchanged, when the passed contentItem is a ROOT content item and it has subItems, and the state was already set to the subItem`, (): void => {
    const prevState: m.ContentItemsState = {
      byId: dummyContentItemsById,
      currentlySelectedId: dummyContentItem.id,
    };
    const setCurrentlySelectedInStateAction: a.SetCurrentlySelectedInStateAction = {
      type: a.SET_CURRENTLY_SELECTED_IN_STATE,
      payload: {
        id: dummyRootContentItem.id,
      },
    };

    const resultState = reducer(prevState, setCurrentlySelectedInStateAction);
    expect(resultState).toBe(prevState);
    expect(resultState.currentlySelectedId).toBe(prevState.currentlySelectedId);
  });

  it(`sets null in the state, when the passed contentItem is a ROOT content item and it does not have subItems`, (): void => {
    const prevState: m.ContentItemsState = {
      byId: dummyContentItemsById,
      currentlySelectedId: dummyContentItem.id,
    };
    const setCurrentlySelectedInStateAction: a.SetCurrentlySelectedInStateAction = {
      type: a.SET_CURRENTLY_SELECTED_IN_STATE,
      payload: {
        id: dummyEmptyRootContentItem.id,
      },
    };
    const nextState: m.ContentItemsState = {
      byId: dummyContentItemsById,
      currentlySelectedId: null,
    };

    const resultState = reducer(prevState, setCurrentlySelectedInStateAction);
    expect(resultState).toStrictEqual(nextState);
    expect(resultState).not.toBe(prevState);
    expect(resultState.currentlySelectedId).not.toBe(prevState.currentlySelectedId);
  });

  it(`leaves the state unchanged, when the passed contentItem is a ROOT content item and it does not have subItems, and the state was already NULL`, (): void => {
    const prevState: m.ContentItemsState = {
      byId: dummyContentItemsById,
      currentlySelectedId: null,
    };
    const setCurrentlySelectedInStateAction: a.SetCurrentlySelectedInStateAction = {
      type: a.SET_CURRENTLY_SELECTED_IN_STATE,
      payload: {
        id: dummyEmptyRootContentItem.id,
      },
    };

    const resultState = reducer(prevState, setCurrentlySelectedInStateAction);
    expect(resultState).toBe(prevState);
    expect(resultState.currentlySelectedId).toBe(prevState.currentlySelectedId);
  });

  it(`throws an ObjectNotFoundError, when the contentItem for the passed id could not be found`, (): void => {
    const prevState: m.ContentItemsState = {
      byId: dummyContentItemsById,
      currentlySelectedId: null,
    };
    const setCurrentlySelectedInStateAction: a.SetCurrentlySelectedInStateAction = {
      type: a.SET_CURRENTLY_SELECTED_IN_STATE,
      payload: {
        id: 'DefinitelyNotValidId',
      },
    };

    expect((): void => {
      reducer(prevState, setCurrentlySelectedInStateAction);
    }).toThrow(ObjectNotFoundError);
  });

});
