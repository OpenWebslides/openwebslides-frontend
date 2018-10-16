// @flow

import { ObjectNotFoundError } from 'errors';
import { dummyContentItemData } from 'lib/testResources';

import * as a from '../actionTypes';
import * as m from '../model';

import reducer from '.';

describe(`setDirtyInState`, (): void => {

  let dummyRootContentItem: m.RootContentItem;

  beforeEach((): void => {
    dummyRootContentItem = { ...dummyContentItemData.rootContentItem, isDirty: false };
  });

  it(`sets the isDirty property to TRUE when passed TRUE for the root content item with the passed id`, (): void => {
    const prevState: m.ContentItemsState = {
      byId: {
        [dummyRootContentItem.id]: { ...dummyRootContentItem, isDirty: false },
      },
    };
    const setDirtyInStateAction: a.SetDirtyInStateAction = {
      type: a.SET_DIRTY_IN_STATE,
      payload: {
        id: dummyRootContentItem.id,
        dirty: true,
      },
    };
    const nextState: m.ContentItemsState = {
      byId: {
        [dummyRootContentItem.id]: { ...dummyRootContentItem, isDirty: true },
      },
    };
    const resultState = reducer(prevState, setDirtyInStateAction);

    expect(resultState).toStrictEqual(nextState);
    expect(resultState).not.toBe(prevState);
    expect(resultState.byId).not.toBe(prevState.byId);
    expect(resultState.byId[dummyRootContentItem.id]).not.toBe(prevState.byId[dummyRootContentItem.id]);
  });

  it(`sets the isDirty property to FALSE when passed FALSE for the root content item with the passed id`, (): void => {
    const prevState: m.ContentItemsState = {
      byId: {
        [dummyRootContentItem.id]: { ...dummyRootContentItem, isDirty: true },
      },
    };
    const setDirtyInStateAction: a.SetDirtyInStateAction = {
      type: a.SET_DIRTY_IN_STATE,
      payload: {
        id: dummyRootContentItem.id,
        dirty: false,
      },
    };
    const nextState: m.ContentItemsState = {
      byId: {
        [dummyRootContentItem.id]: { ...dummyRootContentItem, isDirty: false },
      },
    };
    const resultState = reducer(prevState, setDirtyInStateAction);

    expect(resultState).toStrictEqual(nextState);
    expect(resultState).not.toBe(prevState);
    expect(resultState.byId).not.toBe(prevState.byId);
    expect(resultState.byId[dummyRootContentItem.id]).not.toBe(prevState.byId[dummyRootContentItem.id]);
  });

  it(`returns the state unchanged, when the root content item's isDirty property was already set to the parameter's value`, (): void => {
    const prevState: m.ContentItemsState = {
      byId: {
        [dummyRootContentItem.id]: { ...dummyRootContentItem, isDirty: true },
      },
    };
    const setDirtyInStateAction: a.SetDirtyInStateAction = {
      type: a.SET_DIRTY_IN_STATE,
      payload: {
        id: dummyRootContentItem.id,
        dirty: true,
      },
    };
    const resultState = reducer(prevState, setDirtyInStateAction);

    expect(resultState).toStrictEqual(prevState);
    expect(resultState).toBe(prevState);
    expect(resultState.byId).toBe(prevState.byId);
    expect(resultState.byId[dummyRootContentItem.id]).toBe(prevState.byId[dummyRootContentItem.id]);
  });

  it(`throws an ObjectNotFoundError, when the root content item for the passed id could not be found in the state`, (): void => {
    const prevState: m.ContentItemsState = {
      byId: {
        [dummyRootContentItem.id]: { ...dummyRootContentItem, isDirty: true },
      },
    };
    const setDirtyInStateAction: a.SetDirtyInStateAction = {
      type: a.SET_DIRTY_IN_STATE,
      payload: {
        id: 'InvalidId',
        dirty: true,
      },
    };

    expect((): void => {
      reducer(prevState, setDirtyInStateAction);
    }).toThrow(ObjectNotFoundError);
  });

});
