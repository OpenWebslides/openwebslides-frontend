// @flow

import { dummyContentItemData as dummyData } from 'lib/testResources';

import * as a from '../actionTypes';
import * as m from '../model';

import reducer from '.';

describe(`selectInState`, (): void => {

  let dummyId: string;
  let dummyParagraph1: m.ParagraphContentItem;
  let dummyParagraph2: m.ParagraphContentItem;
  let dummyParagraph3: m.ParagraphContentItem;
  let dummyParagraph4: m.ParagraphContentItem;
  let dummyHeading1: m.HeadingContentItem;
  let dummyHeading2: m.HeadingContentItem;
  let dummyRoot: m.RootContentItem;
  let dummySelection: m.SelectionType;
  let dummyContentItemsById: m.ContentItemsById;

  beforeEach((): void => {
    dummyId = 'dummyId';
    dummyParagraph1 = dummyData.paragraphContentItem;
    dummyParagraph2 = dummyData.paragraphContentItem2;
    dummyParagraph3 = dummyData.paragraphContentItem3;
    dummyParagraph4 = dummyData.paragraphContentItem4;
    dummyHeading1 = { ...dummyData.headingContentItem, subItemIds: [dummyParagraph1.id, dummyParagraph2.id, dummyParagraph3.id] };
    dummyHeading2 = { ...dummyData.headingContentItem2, subItemIds: [dummyParagraph4.id] };
    dummyRoot = { ...dummyData.rootContentItem, subItemIds: [dummyHeading1.id, dummyHeading2.id] };
    dummySelection = m.selectionTypes.NEXT;

    dummyContentItemsById = {
      [dummyRoot.id]: dummyRoot,
      [dummyHeading1.id]: dummyHeading1,
      [dummyParagraph1.id]: dummyParagraph1,
      [dummyParagraph2.id]: dummyParagraph2,
      [dummyParagraph3.id]: dummyParagraph3,
      [dummyHeading2.id]: dummyHeading2,
      [dummyParagraph4.id]: dummyParagraph4,
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

  describe(`when SUPER is passed as selectionType`, (): void => {

    it(`sets the super contentItem as currently selected contentItem in the state`, (): void => {
      const prevState: m.ContentItemsState = {
        byId: dummyContentItemsById,
        currentlySelectedId: dummyParagraph1.id,
      };
      const selectInStateAction: a.SelectInStateAction = {
        type: a.SELECT_IN_STATE,
        payload: {
          selection: m.selectionTypes.SUPER,
        },
      };
      const nextState: m.ContentItemsState = {
        byId: dummyContentItemsById,
        currentlySelectedId: dummyHeading1.id,
      };

      const resultState = reducer(prevState, selectInStateAction);
      expect(resultState).toStrictEqual(nextState);
      expect(resultState).not.toBe(prevState);
      expect(resultState.currentlySelectedId).not.toBe(prevState.currentlySelectedId);
    });

    it(`leaves the state unchanged, when the currently selected contentItem has no super contentItem`, (): void => {
      const prevState: m.ContentItemsState = {
        byId: dummyContentItemsById,
        currentlySelectedId: dummyRoot.id,
      };
      const selectInStateAction: a.SelectInStateAction = {
        type: a.SELECT_IN_STATE,
        payload: {
          selection: m.selectionTypes.SUPER,
        },
      };
      const resultState = reducer(prevState, selectInStateAction);

      expect(resultState).toBe(prevState);
      expect(resultState.currentlySelectedId).toBe(prevState.currentlySelectedId);
    });

  });

  describe(`when SUB is passed as selectionType`, (): void => {

    it(`sets the first sub contentItem as currently selected contentItem in the state`, (): void => {
      const prevState: m.ContentItemsState = {
        byId: dummyContentItemsById,
        currentlySelectedId: dummyHeading1.id,
      };
      const selectInStateAction: a.SelectInStateAction = {
        type: a.SELECT_IN_STATE,
        payload: {
          selection: m.selectionTypes.SUB,
        },
      };
      const nextState: m.ContentItemsState = {
        ...prevState,
        currentlySelectedId: dummyParagraph1.id,
      };

      const resultState = reducer(prevState, selectInStateAction);
      expect(resultState).toStrictEqual(nextState);
      expect(resultState).not.toBe(prevState);
      expect(resultState.currentlySelectedId).not.toBe(prevState.currentlySelectedId);
    });

    it(`leaves the state unchanged, when the currently selected contentItem has no sub contentItems`, (): void => {
      const prevState: m.ContentItemsState = {
        byId: dummyContentItemsById,
        currentlySelectedId: dummyParagraph1.id,
      };
      const selectInStateAction: a.SelectInStateAction = {
        type: a.SELECT_IN_STATE,
        payload: {
          selection: m.selectionTypes.SUB,
        },
      };
      const resultState = reducer(prevState, selectInStateAction);

      expect(resultState).toBe(prevState);
      expect(resultState.currentlySelectedId).toBe(prevState.currentlySelectedId);
    });

  });

  describe(`when PREVIOUS is passed as selectionType`, (): void => {

    it(`sets the previous direct sibling as currently selected contentItem in the state`, (): void => {
      const prevState: m.ContentItemsState = {
        byId: dummyContentItemsById,
        currentlySelectedId: dummyParagraph2.id,
      };
      const selectInStateAction: a.SelectInStateAction = {
        type: a.SELECT_IN_STATE,
        payload: {
          selection: m.selectionTypes.PREVIOUS,
        },
      };
      const previousState: m.ContentItemsState = {
        ...prevState,
        currentlySelectedId: dummyParagraph1.id,
      };

      const resultState = reducer(prevState, selectInStateAction);
      expect(resultState).toStrictEqual(previousState);
      expect(resultState).not.toBe(prevState);
      expect(resultState.currentlySelectedId).not.toBe(prevState.currentlySelectedId);
    });

    it(`sets the previous contentItem in editor order as currently selected contentItem in the state, when the currently selected contentItem has no direct previous sibling`, (): void => {
      const prevState: m.ContentItemsState = {
        byId: dummyContentItemsById,
        currentlySelectedId: dummyParagraph4.id,
      };
      const selectInStateAction: a.SelectInStateAction = {
        type: a.SELECT_IN_STATE,
        payload: {
          selection: m.selectionTypes.PREVIOUS,
        },
      };
      const previousState: m.ContentItemsState = {
        ...prevState,
        currentlySelectedId: dummyHeading2.id,
      };

      const resultState = reducer(prevState, selectInStateAction);
      expect(resultState).toStrictEqual(previousState);
      expect(resultState).not.toBe(prevState);
      expect(resultState.currentlySelectedId).not.toBe(prevState.currentlySelectedId);
    });

    it(`leaves the state unchanged, when the currently selected contentItem has no previous sibling or contentItem in editor order`, (): void => {
      const prevState: m.ContentItemsState = {
        byId: dummyContentItemsById,
        currentlySelectedId: dummyRoot.id,
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

  });

  describe(`when NEXT is passed as selectionType`, (): void => {

    it(`sets the next direct sibling as currently selected contentItem in the state`, (): void => {
      const prevState: m.ContentItemsState = {
        byId: dummyContentItemsById,
        currentlySelectedId: dummyParagraph2.id,
      };
      const selectInStateAction: a.SelectInStateAction = {
        type: a.SELECT_IN_STATE,
        payload: {
          selection: m.selectionTypes.NEXT,
        },
      };
      const nextState: m.ContentItemsState = {
        ...prevState,
        currentlySelectedId: dummyParagraph3.id,
      };

      const resultState = reducer(prevState, selectInStateAction);
      expect(resultState).toStrictEqual(nextState);
      expect(resultState).not.toBe(prevState);
      expect(resultState.currentlySelectedId).not.toBe(prevState.currentlySelectedId);
    });

    it(`sets the next contentItem in editor order as currently selected contentItem in the state, when the currently selected contentItem has no direct next sibling`, (): void => {
      const prevState: m.ContentItemsState = {
        byId: dummyContentItemsById,
        currentlySelectedId: dummyParagraph3.id,
      };
      const selectInStateAction: a.SelectInStateAction = {
        type: a.SELECT_IN_STATE,
        payload: {
          selection: m.selectionTypes.NEXT,
        },
      };
      const nextState: m.ContentItemsState = {
        ...prevState,
        currentlySelectedId: dummyHeading2.id,
      };

      const resultState = reducer(prevState, selectInStateAction);
      expect(resultState).toStrictEqual(nextState);
      expect(resultState).not.toBe(prevState);
      expect(resultState.currentlySelectedId).not.toBe(prevState.currentlySelectedId);
    });

    it(`leaves the state unchanged, when the currently selected contentItem has no next sibling or contentItem in editor order`, (): void => {
      const prevState: m.ContentItemsState = {
        byId: dummyContentItemsById,
        currentlySelectedId: dummyParagraph4.id,
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

});
