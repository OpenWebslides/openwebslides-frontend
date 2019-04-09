// @flow

import { dummyContentItemData as dummyData } from 'lib/testResources';

import * as a from '../actionTypes';
import * as m from '../model';

import reducer from '.';

describe(`setCurrentlySelectedInState`, (): void => {

  let dummyId: string;

  beforeEach((): void => {
    dummyId = 'dummyId';
  });

  it(`leaves the state unchanged, when the passed id is already set in the state`, (): void => {
    const prevState: m.ContentItemsState = {
      byId: {},
      currentlySelectedId: dummyId,
    };
    const setCurrentlySelectedInStateAction: a.SetCurrentlySelectedInStateAction = {
      type: a.SET_CURRENTLY_SELECTED_IN_STATE,
      payload: {
        id: dummyId,
      },
    };
    const resultState = reducer(prevState, setCurrentlySelectedInStateAction);

    expect(resultState).toBe(prevState);
    expect(resultState.currentlySelectedId).toBe(prevState.currentlySelectedId);
  });

  it(`sets the currently selected id in the state`, (): void => {
    const prevState: m.ContentItemsState = {
      byId: {},
      currentlySelectedId: null,
    };
    const setCurrentlySelectedInStateAction: a.SetCurrentlySelectedInStateAction = {
      type: a.SET_CURRENTLY_SELECTED_IN_STATE,
      payload: {
        id: dummyId,
      },
    };
    const nextState: m.ContentItemsState = {
      byId: {},
      currentlySelectedId: dummyId,
    };

    const resultState = reducer(prevState, setCurrentlySelectedInStateAction);
    expect(resultState).toStrictEqual(nextState);
    expect(resultState).not.toBe(prevState);
    expect(resultState.currentlySelectedId).not.toBe(prevState.currentlySelectedId);
  });

});
