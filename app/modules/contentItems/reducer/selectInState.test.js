// @flow

import { dummyInitialState, dummyContentItemData as dummyData } from 'lib/testResources';

import * as a from '../actionTypes';
import * as m from '../model';

import reducer from '.';

describe(`selectInState`, (): void => {

  let dummyId: string;
  let dummyContentItem1: m.HeadingContentItem;
  let dummyContentItem2: m.ParagraphContentItem;
  let dummyContentItem3: m.ParagraphContentItem;
  let dummyContentItemParent: m.HeadingContentItem;
  let dummySelection: m.SelectionType;
  let dummyContentItemsById: m.ContentItemsById;

  beforeEach((): void => {
    dummyId = 'dummyId';
    dummyContentItem1 = dummyData.headingContentItem;
    dummyContentItem2 = dummyData.paragraphContentItem;
    dummyContentItem3 = dummyData.paragraphContentItem2;
    dummyContentItemParent = { ...dummyData.headingContentItem2, subItemIds: [dummyContentItem1.id, dummyContentItem2.id, dummyContentItem3.id] };
    dummySelection = m.selectionTypes.NEXT;

    dummyContentItemsById = {
      [dummyContentItem1.id]: dummyContentItem1,
      [dummyContentItem2.id]: dummyContentItem2,
      [dummyContentItem3.id]: dummyContentItem3,
      [dummyContentItemParent.id]: dummyContentItemParent,
    };
  });

  it(`leaves the state unchanged, when there is not selection set in the state`, (): void => {
    const prevState: m.ContentItemsState = {
      byId: {},
      currentlySelectedId: dummyId,
    };
    const selectInStateAction: a.SelectInStateAction = {
      type: a.SELECT_IN_STATE,
      payload: {
        selection: dummySelection,
      },
    };
    const resultState = reducer(prevState, selectInStateAction);

    expect(resultState).toBe(prevState);
    expect(resultState.currentlySelectedId).toBe(prevState.currentlySelectedId);
  });

  it(`sets the parent or super contentItem as currently selected id in the state when PARENT is passed`, (): void => {
    const prevState: m.ContentItemsState = {
      byId: dummyContentItemsById,
      currentlySelectedId: dummyContentItem1.id,
    };
    const selectInStateAction: a.SelectInStateAction = {
      type: a.SELECT_IN_STATE,
      payload: {
        selection: m.selectionTypes.PARENT,
      },
    };
    const nextState: m.ContentItemsState = {
      byId: dummyContentItemsById,
      currentlySelectedId: dummyContentItemParent.id,
    };

    const resultState = reducer(prevState, selectInStateAction);
    expect(resultState).toStrictEqual(nextState);
    expect(resultState).not.toBe(prevState);
    expect(resultState.currentlySelectedId).not.toBe(prevState.currentlySelectedId);
  });

  it(`leaves the state unchanged, when the currently selected contentItem has no parent when PARENT is passed`, (): void => {
    const prevState: m.ContentItemsState = {
      byId: dummyContentItemsById,
      currentlySelectedId: dummyContentItemParent.id,
    };
    const selectInStateAction: a.SelectInStateAction = {
      type: a.SELECT_IN_STATE,
      payload: {
        selection: m.selectionTypes.PARENT,
      },
    };
    const resultState = reducer(prevState, selectInStateAction);

    expect(resultState).toBe(prevState);
    expect(resultState.currentlySelectedId).toBe(prevState.currentlySelectedId);
  });

  it(`sets the first child or sub contentItem as currently selected id in the state when CHILD is passed`, (): void => {
    const prevState: m.ContentItemsState = {
      byId: dummyContentItemsById,
      currentlySelectedId: dummyContentItemParent.id,
    };
    const selectInStateAction: a.SelectInStateAction = {
      type: a.SELECT_IN_STATE,
      payload: {
        selection: m.selectionTypes.CHILD,
      },
    };
    const nextState: m.ContentItemsState = {
      ...prevState,
      currentlySelectedId: dummyContentItem1.id,
    };

    const resultState = reducer(prevState, selectInStateAction);
    expect(resultState).toStrictEqual(nextState);
    expect(resultState).not.toBe(prevState);
    expect(resultState.currentlySelectedId).not.toBe(prevState.currentlySelectedId);
  });

  it(`leaves the state unchanged, when the currently selected contentItem has no children or sub contentItems when CHILD is passed`, (): void => {
    const prevState: m.ContentItemsState = {
      byId: dummyContentItemsById,
      currentlySelectedId: dummyContentItem1.id,
    };
    const selectInStateAction: a.SelectInStateAction = {
      type: a.SELECT_IN_STATE,
      payload: {
        selection: m.selectionTypes.CHILD,
      },
    };
    const resultState = reducer(prevState, selectInStateAction);

    expect(resultState).toBe(prevState);
    expect(resultState.currentlySelectedId).toBe(prevState.currentlySelectedId);
  });

  it(`sets the previous sibling as currently selected id in the state when PREVIOUS is passed`, (): void => {
    const prevState: m.ContentItemsState = {
      byId: dummyContentItemsById,
      currentlySelectedId: dummyContentItem2.id,
    };
    const selectInStateAction: a.SelectInStateAction = {
      type: a.SELECT_IN_STATE,
      payload: {
        selection: m.selectionTypes.PREVIOUS,
      },
    };
    const nextState: m.ContentItemsState = {
      ...prevState,
      currentlySelectedId: dummyContentItem1.id,
    };

    const resultState = reducer(prevState, selectInStateAction);
    expect(resultState).toStrictEqual(nextState);
    expect(resultState).not.toBe(prevState);
    expect(resultState.currentlySelectedId).not.toBe(prevState.currentlySelectedId);
  });

  it(`leaves the state unchanged, when the currently selected contentItem has no previous sibling when PREVIOUS is passed`, (): void => {
    const prevState: m.ContentItemsState = {
      byId: dummyContentItemsById,
      currentlySelectedId: dummyContentItem1.id,
    };
    const selectInStateAction: a.SelectInStateAction = {
      type: a.SELECT_IN_STATE,
      payload: {
        selection: m.selectionTypes.PREVIOUS,
      },
    };
    const resultState = reducer(prevState, selectInStateAction);

    expect(resultState).toBe(prevState);
    expect(resultState.currentlySelectedId).toBe(prevState.currentlySelectedId);
  });

  it(`sets the previous sibling as currently selected id in the state when NEXT is passed`, (): void => {
    const prevState: m.ContentItemsState = {
      byId: dummyContentItemsById,
      currentlySelectedId: dummyContentItem2.id,
    };
    const selectInStateAction: a.SelectInStateAction = {
      type: a.SELECT_IN_STATE,
      payload: {
        selection: m.selectionTypes.NEXT,
      },
    };
    const nextState: m.ContentItemsState = {
      ...prevState,
      currentlySelectedId: dummyContentItem3.id,
    };

    const resultState = reducer(prevState, selectInStateAction);
    expect(resultState).toStrictEqual(nextState);
    expect(resultState).not.toBe(prevState);
    expect(resultState.currentlySelectedId).not.toBe(prevState.currentlySelectedId);
  });

  it(`leaves the state unchanged, when the currently selected contentItem has no previous sibling when NEXT is passed`, (): void => {
    const prevState: m.ContentItemsState = {
      byId: dummyContentItemsById,
      currentlySelectedId: dummyContentItem3.id,
    };
    const selectInStateAction: a.SelectInStateAction = {
      type: a.SELECT_IN_STATE,
      payload: {
        selection: m.selectionTypes.NEXT,
      },
    };
    const resultState = reducer(prevState, selectInStateAction);

    expect(resultState).toBe(prevState);
    expect(resultState.currentlySelectedId).toBe(prevState.currentlySelectedId);
  });

});
