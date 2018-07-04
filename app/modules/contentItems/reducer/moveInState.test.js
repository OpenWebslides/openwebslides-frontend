// @flow

import CorruptedInternalStateError from 'errors/implementation-errors/CorruptedInternalStateError';
import UnsupportedOperationError from 'errors/implementation-errors/UnsupportedOperationError';
import ObjectNotFoundError from 'errors/usage-errors/ObjectNotFoundError';

import * as t from '../actionTypes';
import * as model from '../model';
import * as dummyData from '../lib/testResources/dummyContentItemData';
import edit from '../lib/edit';

import reducer from '.';

const {
  contextTypes,
  RootContentItem,
  HeadingContentItem,
  ParagraphContentItem,
  ContentItemsState,
} = model;

describe(`moveInState`, (): void => {

  let dummyParagraph22: $Exact<ParagraphContentItem>;
  let dummyParagraph21: $Exact<ParagraphContentItem>;
  let dummyHeading2: $Exact<HeadingContentItem>;
  let dummyParagraph12: $Exact<ParagraphContentItem>;
  let dummyParagraph11: $Exact<ParagraphContentItem>;
  let dummyHeading1: $Exact<HeadingContentItem>;
  let dummyRoot: $Exact<RootContentItem>;

  beforeEach((): void => {
    dummyParagraph22 = { ...dummyData.paragraphContentItem4 };
    dummyParagraph21 = { ...dummyData.paragraphContentItem3 };
    dummyHeading2 = { ...dummyData.headingContentItem2 };
    dummyParagraph12 = { ...dummyData.paragraphContentItem2 };
    dummyParagraph11 = { ...dummyData.paragraphContentItem };
    dummyHeading1 = { ...dummyData.headingContentItem };
    dummyRoot = { ...dummyData.rootContentItem };
  });

  it(`removes the contentItem from its previousContext and adds it to the nextContext, when the contentItem was a subItem`, (): void => {
    const prevState: ContentItemsState = {
      byId: {
        [dummyRoot.id]: { ...dummyRoot, childItemIds: [dummyHeading1.id, dummyHeading2.id] },
        [dummyHeading1.id]: { ...dummyHeading1, subItemIds: [dummyParagraph11.id, dummyParagraph12.id] },
        [dummyParagraph11.id]: { ...dummyParagraph11 },
        [dummyParagraph12.id]: { ...dummyParagraph12 },
        [dummyHeading2.id]: { ...dummyHeading2, subItemIds: [dummyParagraph21.id, dummyParagraph22.id] },
        [dummyParagraph21.id]: { ...dummyParagraph21 },
        [dummyParagraph22.id]: { ...dummyParagraph22 },
      },
    };
    const moveInStateAction: t.MoveInStateAction = {
      type: t.MOVE_IN_STATE,
      payload: {
        id: dummyParagraph21.id,
        nextContext: {
          contextType: contextTypes.SUPER,
          contextItemId: dummyHeading1.id,
          indexInSiblingItems: 1,
        },
      },
    };
    const nextState: ContentItemsState = {
      byId: {
        [dummyRoot.id]: { ...dummyRoot, childItemIds: [dummyHeading1.id, dummyHeading2.id] },
        [dummyHeading1.id]: { ...dummyHeading1, subItemIds: [dummyParagraph11.id, dummyParagraph21.id, dummyParagraph12.id] },
        [dummyParagraph11.id]: { ...dummyParagraph11 },
        [dummyParagraph12.id]: { ...dummyParagraph12 },
        [dummyHeading2.id]: { ...dummyHeading2, subItemIds: [dummyParagraph22.id] },
        [dummyParagraph21.id]: { ...dummyParagraph21 },
        [dummyParagraph22.id]: { ...dummyParagraph22 },
      },
    };
    const resultState = reducer(prevState, moveInStateAction);

    expect(resultState).toEqual(nextState);
    expect(resultState).not.toBe(prevState);
    expect(resultState.byId).not.toBe(prevState.byId);
    expect(resultState.byId[dummyHeading1.id]).not.toBe(prevState.byId[dummyHeading1.id]);
    expect((resultState.byId[dummyHeading1.id]: any).subItemIds).not.toBe((prevState.byId[dummyHeading1.id]: any).subItemIds);
    expect(resultState.byId[dummyHeading2.id]).not.toBe(prevState.byId[dummyHeading2.id]);
    expect((resultState.byId[dummyHeading2.id]: any).subItemIds).not.toBe((prevState.byId[dummyHeading2.id]: any).subItemIds);
    expect(resultState.byId[dummyParagraph21.id]).toBe(prevState.byId[dummyParagraph21.id]);
  });

  it(`removes the contentItem from its previousContext and adds it to the nextContext, when the contentItem was a childItem`, (): void => {
    const prevState: ContentItemsState = {
      byId: {
        [dummyRoot.id]: { ...dummyRoot, childItemIds: [dummyHeading1.id, dummyHeading2.id] },
        [dummyHeading1.id]: { ...dummyHeading1, subItemIds: [dummyParagraph11.id, dummyParagraph12.id] },
        [dummyParagraph11.id]: { ...dummyParagraph11 },
        [dummyParagraph12.id]: { ...dummyParagraph12 },
        [dummyHeading2.id]: { ...dummyHeading2, subItemIds: [dummyParagraph21.id, dummyParagraph22.id] },
        [dummyParagraph21.id]: { ...dummyParagraph21 },
        [dummyParagraph22.id]: { ...dummyParagraph22 },
      },
    };
    const moveInStateAction: t.MoveInStateAction = {
      type: t.MOVE_IN_STATE,
      payload: {
        id: dummyHeading2.id,
        nextContext: {
          contextType: contextTypes.SUPER,
          contextItemId: dummyHeading1.id,
          indexInSiblingItems: 2,
        },
      },
    };
    const nextState: ContentItemsState = {
      byId: {
        [dummyRoot.id]: { ...dummyRoot, childItemIds: [dummyHeading1.id] },
        [dummyHeading1.id]: { ...dummyHeading1, subItemIds: [dummyParagraph11.id, dummyParagraph12.id, dummyHeading2.id] },
        [dummyParagraph11.id]: { ...dummyParagraph11 },
        [dummyParagraph12.id]: { ...dummyParagraph12 },
        [dummyHeading2.id]: { ...dummyHeading2, subItemIds: [dummyParagraph21.id, dummyParagraph22.id] },
        [dummyParagraph21.id]: { ...dummyParagraph21 },
        [dummyParagraph22.id]: { ...dummyParagraph22 },
      },
    };
    const resultState = reducer(prevState, moveInStateAction);

    expect(resultState).toEqual(nextState);
    expect(resultState).not.toBe(prevState);
    expect(resultState.byId).not.toBe(prevState.byId);
    expect(resultState.byId[dummyRoot.id]).not.toBe(prevState.byId[dummyRoot.id]);
    expect((resultState.byId[dummyRoot.id]: any).childItemIds).not.toBe((prevState.byId[dummyRoot.id]: any).childItemIds);
    expect(resultState.byId[dummyHeading1.id]).not.toBe(prevState.byId[dummyHeading1.id]);
    expect((resultState.byId[dummyHeading1.id]: any).subItemIds).not.toBe((prevState.byId[dummyHeading1.id]: any).subItemIds);
    expect(resultState.byId[dummyHeading2.id]).toBe(prevState.byId[dummyHeading2.id]);
  });

  it(`does not change the state object, when the contentItem's previousContext is equal to the nextContext`, (): void => {
    const prevState: ContentItemsState = {
      byId: {
        [dummyRoot.id]: { ...dummyRoot, childItemIds: [dummyHeading1.id, dummyHeading2.id] },
        [dummyHeading1.id]: { ...dummyHeading1, subItemIds: [dummyParagraph11.id, dummyParagraph12.id] },
        [dummyParagraph11.id]: { ...dummyParagraph11 },
        [dummyParagraph12.id]: { ...dummyParagraph12 },
        [dummyHeading2.id]: { ...dummyHeading2, subItemIds: [dummyParagraph21.id, dummyParagraph22.id] },
        [dummyParagraph21.id]: { ...dummyParagraph21 },
        [dummyParagraph22.id]: { ...dummyParagraph22 },
      },
    };
    const moveInStateAction: t.MoveInStateAction = {
      type: t.MOVE_IN_STATE,
      payload: {
        id: dummyParagraph21.id,
        nextContext: {
          contextType: contextTypes.SUPER,
          contextItemId: dummyHeading2.id,
          indexInSiblingItems: 0,
        },
      },
    };
    const resultState = reducer(prevState, moveInStateAction);

    expect(resultState).toEqual(prevState);
    expect(resultState).toBe(prevState);
  });

  it(`throws an ObjectNotFoundError, when the contentItem for the passed id could not be found`, (): void => {
    const prevState: ContentItemsState = {
      byId: {
        [dummyRoot.id]: { ...dummyRoot, childItemIds: [dummyHeading1.id, dummyHeading2.id] },
        [dummyHeading1.id]: { ...dummyHeading1, subItemIds: [dummyParagraph11.id, dummyParagraph12.id] },
        [dummyParagraph11.id]: { ...dummyParagraph11 },
        [dummyParagraph12.id]: { ...dummyParagraph12 },
        [dummyHeading2.id]: { ...dummyHeading2, subItemIds: [dummyParagraph21.id, dummyParagraph22.id] },
        [dummyParagraph21.id]: { ...dummyParagraph21 },
        [dummyParagraph22.id]: { ...dummyParagraph22 },
      },
    };
    const moveInStateAction: t.MoveInStateAction = {
      type: t.MOVE_IN_STATE,
      payload: {
        id: 'DefinitelyNotValidId',
        nextContext: {
          contextType: contextTypes.SUPER,
          contextItemId: dummyHeading1.id,
          indexInSiblingItems: 1,
        },
      },
    };

    expect((): void => {
      reducer(prevState, moveInStateAction);
    }).toThrow(ObjectNotFoundError);
  });

  it(`throws a CorruptedInternalStateError, when the passed contentItemsById object contains inconsistencies`, (): void => {
    const prevState: ContentItemsState = {
      byId: {
        [dummyRoot.id]: { ...dummyRoot, childItemIds: [dummyHeading1.id, dummyHeading2.id] },
        [dummyHeading1.id]: { ...dummyHeading1, subItemIds: [dummyParagraph11.id, dummyParagraph12.id] },
        [dummyParagraph11.id]: { ...dummyParagraph11 },
        [dummyParagraph12.id]: { ...dummyParagraph12 },
        [dummyHeading2.id]: { ...dummyHeading2, subItemIds: [dummyParagraph22.id] },
        [dummyParagraph21.id]: { ...dummyParagraph21 },
        [dummyParagraph22.id]: { ...dummyParagraph22 },
      },
    };
    const moveInStateAction: t.MoveInStateAction = {
      type: t.MOVE_IN_STATE,
      payload: {
        id: dummyParagraph21.id,
        nextContext: {
          contextType: contextTypes.SUPER,
          contextItemId: dummyHeading1.id,
          indexInSiblingItems: 1,
        },
      },
    };

    expect((): void => {
      reducer(prevState, moveInStateAction);
    }).toThrow(CorruptedInternalStateError);
  });

  it(`throws an UnsupportedOperationError, when attempting to move a ROOT`, (): void => {
    const prevState: ContentItemsState = {
      byId: {
        [dummyRoot.id]: { ...dummyRoot, childItemIds: [dummyHeading1.id, dummyHeading2.id] },
        [dummyHeading1.id]: { ...dummyHeading1, subItemIds: [dummyParagraph11.id, dummyParagraph12.id] },
        [dummyParagraph11.id]: { ...dummyParagraph11 },
        [dummyParagraph12.id]: { ...dummyParagraph12 },
        [dummyHeading2.id]: { ...dummyHeading2, subItemIds: [dummyParagraph21.id, dummyParagraph22.id] },
        [dummyParagraph21.id]: { ...dummyParagraph21 },
        [dummyParagraph22.id]: { ...dummyParagraph22 },
      },
    };
    const moveInStateAction: t.MoveInStateAction = {
      type: t.MOVE_IN_STATE,
      payload: {
        id: dummyRoot.id,
        nextContext: {
          contextType: contextTypes.PARENT,
          contextItemId: dummyRoot.id,
          indexInSiblingItems: 1,
        },
      },
    };

    expect((): void => {
      reducer(prevState, moveInStateAction);
    }).toThrow(UnsupportedOperationError);
  });

  it(`throws an UnsupportedOperationError, when attempting to move anything other than a HEADING after an existing HEADING in a list of siblings`, (): void => {
    const prevState: ContentItemsState = {
      byId: {
        [dummyRoot.id]: { ...dummyRoot, childItemIds: [dummyHeading1.id, dummyHeading2.id] },
        [dummyHeading1.id]: { ...dummyHeading1, subItemIds: [dummyParagraph11.id, dummyParagraph12.id] },
        [dummyParagraph11.id]: { ...dummyParagraph11 },
        [dummyParagraph12.id]: { ...dummyParagraph12 },
        [dummyHeading2.id]: { ...dummyHeading2, subItemIds: [dummyParagraph21.id, dummyParagraph22.id] },
        [dummyParagraph21.id]: { ...dummyParagraph21 },
        [dummyParagraph22.id]: { ...dummyParagraph22 },
      },
    };
    const moveInStateAction: t.MoveInStateAction = {
      type: t.MOVE_IN_STATE,
      payload: {
        id: dummyParagraph21.id,
        nextContext: {
          contextType: contextTypes.PARENT,
          contextItemId: dummyRoot.id,
          indexInSiblingItems: 1,
        },
      },
    };

    expect((): void => {
      reducer(prevState, moveInStateAction);
    }).toThrow(UnsupportedOperationError);
  });

  it(`throws an UnsupportedOperationError, when attempting to move a HEADING before anything other than an existing HEADING in a list of siblings`, (): void => {
    const prevState: ContentItemsState = {
      byId: {
        [dummyRoot.id]: { ...dummyRoot, childItemIds: [dummyHeading1.id, dummyHeading2.id] },
        [dummyHeading1.id]: { ...dummyHeading1, subItemIds: [dummyParagraph11.id, dummyParagraph12.id] },
        [dummyParagraph11.id]: { ...dummyParagraph11 },
        [dummyParagraph12.id]: { ...dummyParagraph12 },
        [dummyHeading2.id]: { ...dummyHeading2, subItemIds: [dummyParagraph21.id, dummyParagraph22.id] },
        [dummyParagraph21.id]: { ...dummyParagraph21 },
        [dummyParagraph22.id]: { ...dummyParagraph22 },
      },
    };
    const moveInStateAction: t.MoveInStateAction = {
      type: t.MOVE_IN_STATE,
      payload: {
        id: dummyHeading2.id,
        nextContext: {
          contextType: contextTypes.SUPER,
          contextItemId: dummyHeading1.id,
          indexInSiblingItems: 1,
        },
      },
    };

    expect((): void => {
      reducer(prevState, moveInStateAction);
    }).toThrow(UnsupportedOperationError);
  });

  it(`re-throws any error from the validate function that is not a CorruptedInternalStateError`, (): void => {
    const dummyMessage = 'Dummy error message for testing purposes.';
    const prevState: ContentItemsState = {
      byId: {
        [dummyRoot.id]: { ...dummyRoot, childItemIds: [dummyHeading1.id, dummyHeading2.id] },
        [dummyHeading1.id]: { ...dummyHeading1, subItemIds: [dummyParagraph11.id, dummyParagraph12.id] },
        [dummyParagraph11.id]: { ...dummyParagraph11 },
        [dummyParagraph12.id]: { ...dummyParagraph12 },
        [dummyHeading2.id]: { ...dummyHeading2, subItemIds: [dummyParagraph21.id, dummyParagraph22.id] },
        [dummyParagraph21.id]: { ...dummyParagraph21 },
        [dummyParagraph22.id]: { ...dummyParagraph22 },
      },
    };
    const moveInStateAction: t.MoveInStateAction = {
      type: t.MOVE_IN_STATE,
      payload: {
        id: dummyParagraph21.id,
        nextContext: {
          contextType: contextTypes.SUPER,
          contextItemId: dummyHeading1.id,
          indexInSiblingItems: 1,
        },
      },
    };

    edit.validateChildOrSubItemsInContext = jest.fn((): void => {
      throw new Error(dummyMessage);
    });

    expect((): void => {
      reducer(prevState, moveInStateAction);
    }).toThrow(dummyMessage);
  });

});
