// @flow

import InvalidArgumentError from 'errors/implementation-errors/InvalidArgumentError';
import UnsupportedOperationError from 'errors/implementation-errors/UnsupportedOperationError';
import NotYetImplementedError from 'errors/implementation-errors/NotYetImplementedError';

import * as t from '../actionTypes';
import * as model from '../model';
import * as dummyData from '../lib/testResources/dummyContentItemData';
import edit from '../lib/edit';

import reducer from '../reducer';

const {
  contentItemTypes,
  contextTypes,
  RootContentItem,
  HeadingContentItem,
  ParagraphContentItem,
  ContentItemsState,
} = model;

describe(`ADD_TO_STATE`, (): void => {

  let dummyNewRoot: $Exact<RootContentItem>;
  let dummyNewHeading: $Exact<HeadingContentItem>;
  let dummyNewParagraph: $Exact<ParagraphContentItem>;

  let dummyParagraph22: $Exact<ParagraphContentItem>;
  let dummyParagraph21: $Exact<ParagraphContentItem>;
  let dummyHeading2: $Exact<HeadingContentItem>;
  let dummyParagraph12: $Exact<ParagraphContentItem>;
  let dummyParagraph11: $Exact<ParagraphContentItem>;
  let dummyHeading1: $Exact<HeadingContentItem>;
  let dummyRoot: $Exact<RootContentItem>;

  beforeEach((): void => {
    dummyNewRoot = { ...dummyData.rootContentItem2 };
    dummyNewHeading = { ...dummyData.headingContentItem3 };
    dummyNewParagraph = { ...dummyData.paragraphContentItem5 };

    dummyParagraph22 = { ...dummyData.paragraphContentItem4 };
    dummyParagraph21 = { ...dummyData.paragraphContentItem3 };
    dummyHeading2 = { ...dummyData.headingContentItem2 };
    dummyParagraph12 = { ...dummyData.paragraphContentItem2 };
    dummyParagraph11 = { ...dummyData.paragraphContentItem };
    dummyHeading1 = { ...dummyData.headingContentItem };
    dummyRoot = { ...dummyData.rootContentItem };
  });

  it(`adds a HeadingContentItem to the state, when the type is HEADING and the passed props are valid`, (): void => {
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
    const addToStateAction: t.AddToStateAction = {
      type: t.ADD_TO_STATE,
      payload: {
        id: dummyNewHeading.id,
        type: contentItemTypes.HEADING,
        context: {
          contextType: contextTypes.PARENT,
          contextItemId: dummyRoot.id,
          indexInSiblingItems: 2,
        },
        propsForType: {
          text: dummyNewHeading.text,
        },
      },
    };
    const nextState: ContentItemsState = {
      byId: {
        [dummyRoot.id]: { ...dummyRoot, childItemIds: [dummyHeading1.id, dummyHeading2.id, dummyNewHeading.id] },
        [dummyHeading1.id]: { ...dummyHeading1, subItemIds: [dummyParagraph11.id, dummyParagraph12.id] },
        [dummyParagraph11.id]: { ...dummyParagraph11 },
        [dummyParagraph12.id]: { ...dummyParagraph12 },
        [dummyHeading2.id]: { ...dummyHeading2, subItemIds: [dummyParagraph21.id, dummyParagraph22.id] },
        [dummyParagraph21.id]: { ...dummyParagraph21 },
        [dummyParagraph22.id]: { ...dummyParagraph22 },
        [dummyNewHeading.id]: dummyNewHeading,
      },
    };
    const resultState: ContentItemsState = reducer(prevState, addToStateAction);

    expect(resultState).toEqual(nextState);
    expect(resultState).not.toBe(nextState);
    expect(resultState.byId).not.toBe(prevState.byId);
    expect(resultState.byId[dummyRoot.id]).not.toBe(prevState.byId[dummyRoot.id]);
  });

  it(`adds a ParagraphContentItem to the state, when the type is PARAGRAPH and the passed props are valid`, (): void => {
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
    const addToStateAction: t.AddToStateAction = {
      type: t.ADD_TO_STATE,
      payload: {
        id: dummyNewParagraph.id,
        type: contentItemTypes.PARAGRAPH,
        context: {
          contextType: contextTypes.SUPER,
          contextItemId: dummyHeading1.id,
          indexInSiblingItems: 1,
        },
        propsForType: {
          text: dummyNewParagraph.text,
        },
      },
    };
    const nextState: ContentItemsState = {
      byId: {
        [dummyRoot.id]: { ...dummyRoot, childItemIds: [dummyHeading1.id, dummyHeading2.id] },
        [dummyHeading1.id]: { ...dummyHeading1, subItemIds: [dummyParagraph11.id, dummyNewParagraph.id, dummyParagraph12.id] },
        [dummyParagraph11.id]: { ...dummyParagraph11 },
        [dummyParagraph12.id]: { ...dummyParagraph12 },
        [dummyHeading2.id]: { ...dummyHeading2, subItemIds: [dummyParagraph21.id, dummyParagraph22.id] },
        [dummyParagraph21.id]: { ...dummyParagraph21 },
        [dummyParagraph22.id]: { ...dummyParagraph22 },
        [dummyNewParagraph.id]: dummyNewParagraph,
      },
    };
    const resultState: ContentItemsState = reducer(prevState, addToStateAction);

    expect(resultState).toEqual(nextState);
    expect(resultState).not.toBe(nextState);
    expect(resultState.byId).not.toBe(prevState.byId);
    expect(resultState.byId[dummyHeading1.id]).not.toBe(prevState.byId[dummyHeading1.id]);
  });

  it(`adds a RootContentItem to the state, when the type is ROOT and the passed props are valid`, (): void => {
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
    const addToStateAction: t.AddToStateAction = {
      type: t.ADD_TO_STATE,
      payload: {
        id: dummyNewRoot.id,
        type: contentItemTypes.ROOT,
        context: null,
        propsForType: {},
      },
    };
    const nextState: ContentItemsState = {
      byId: {
        [dummyRoot.id]: { ...dummyRoot, childItemIds: [dummyHeading1.id, dummyHeading2.id] },
        [dummyHeading1.id]: { ...dummyHeading1, subItemIds: [dummyParagraph11.id, dummyParagraph12.id] },
        [dummyParagraph11.id]: { ...dummyParagraph11 },
        [dummyParagraph12.id]: { ...dummyParagraph12 },
        [dummyHeading2.id]: { ...dummyHeading2, subItemIds: [dummyParagraph21.id, dummyParagraph22.id] },
        [dummyParagraph21.id]: { ...dummyParagraph21 },
        [dummyParagraph22.id]: { ...dummyParagraph22 },
        [dummyNewRoot.id]: dummyNewRoot,
      },
    };
    const resultState: ContentItemsState = reducer(prevState, addToStateAction);

    expect(resultState).toEqual(nextState);
    expect(resultState).not.toBe(nextState);
    expect(resultState.byId).not.toBe(prevState.byId);
  });

  it(`uses a default of '' for the text prop of a PlainTextContentItem, when the type is a PlainTextContentItemType`, (): void => {
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
    const addToStateAction: t.AddToStateAction = {
      type: t.ADD_TO_STATE,
      payload: {
        id: dummyNewParagraph.id,
        type: contentItemTypes.PARAGRAPH,
        context: {
          contextType: contextTypes.SUPER,
          contextItemId: dummyHeading1.id,
          indexInSiblingItems: 1,
        },
        propsForType: {},
      },
    };
    const nextState: ContentItemsState = {
      byId: {
        [dummyRoot.id]: { ...dummyRoot, childItemIds: [dummyHeading1.id, dummyHeading2.id] },
        [dummyHeading1.id]: { ...dummyHeading1, subItemIds: [dummyParagraph11.id, dummyNewParagraph.id, dummyParagraph12.id] },
        [dummyParagraph11.id]: { ...dummyParagraph11 },
        [dummyParagraph12.id]: { ...dummyParagraph12 },
        [dummyHeading2.id]: { ...dummyHeading2, subItemIds: [dummyParagraph21.id, dummyParagraph22.id] },
        [dummyParagraph21.id]: { ...dummyParagraph21 },
        [dummyParagraph22.id]: { ...dummyParagraph22 },
        [dummyNewParagraph.id]: { ...dummyNewParagraph, text: '' },
      },
    };
    const resultState: ContentItemsState = reducer(prevState, addToStateAction);

    expect(resultState).toEqual(nextState);
  });

  it(`uses a default of 0 for context.positionInSiblings, when context.positionInSiblings is not set`, (): void => {
    const prevState: ContentItemsState = {
      byId: {
        [dummyRoot.id]: { ...dummyRoot, childItemIds: [dummyHeading1.id, dummyHeading2.id] },
        [dummyHeading1.id]: { ...dummyHeading1, subItemIds: [dummyParagraph11.id, dummyNewParagraph.id, dummyParagraph12.id] },
        [dummyParagraph11.id]: { ...dummyParagraph11 },
        [dummyParagraph12.id]: { ...dummyParagraph12 },
        [dummyHeading2.id]: { ...dummyHeading2, subItemIds: [dummyParagraph21.id, dummyParagraph22.id] },
        [dummyParagraph21.id]: { ...dummyParagraph21 },
        [dummyParagraph22.id]: { ...dummyParagraph22 },
      },
    };
    const addToStateAction: t.AddToStateAction = {
      type: t.ADD_TO_STATE,
      payload: {
        id: dummyNewParagraph.id,
        type: contentItemTypes.PARAGRAPH,
        context: {
          contextType: contextTypes.SUPER,
          contextItemId: dummyHeading1.id,
        },
        propsForType: {
          text: dummyNewParagraph.text,
        },
      },
    };
    const nextState: ContentItemsState = {
      byId: {
        [dummyRoot.id]: { ...dummyRoot, childItemIds: [dummyHeading1.id, dummyHeading2.id] },
        [dummyHeading1.id]: { ...dummyHeading1, subItemIds: [dummyNewParagraph.id, dummyParagraph11.id, dummyNewParagraph.id, dummyParagraph12.id] },
        [dummyParagraph11.id]: { ...dummyParagraph11 },
        [dummyParagraph12.id]: { ...dummyParagraph12 },
        [dummyHeading2.id]: { ...dummyHeading2, subItemIds: [dummyParagraph21.id, dummyParagraph22.id] },
        [dummyParagraph21.id]: { ...dummyParagraph21 },
        [dummyParagraph22.id]: { ...dummyParagraph22 },
        [dummyNewParagraph.id]: dummyNewParagraph,
      },
    };
    const resultState: ContentItemsState = reducer(prevState, addToStateAction);

    expect(resultState).toEqual(nextState);
  });

  it(`throws an InvalidArgumentError, when the type is not a valid contentItemType`, (): void => {
    const prevState: ContentItemsState = {
      byId: {
        [dummyRoot.id]: { ...dummyRoot, childItemIds: [dummyHeading1.id, dummyHeading2.id] },
        [dummyHeading1.id]: { ...dummyHeading1, subItemIds: [dummyParagraph11.id, dummyNewParagraph.id, dummyParagraph12.id] },
        [dummyParagraph11.id]: { ...dummyParagraph11 },
        [dummyParagraph12.id]: { ...dummyParagraph12 },
        [dummyHeading2.id]: { ...dummyHeading2, subItemIds: [dummyParagraph21.id, dummyParagraph22.id] },
        [dummyParagraph21.id]: { ...dummyParagraph21 },
        [dummyParagraph22.id]: { ...dummyParagraph22 },
      },
    };
    const addToStateAction: any = {
      type: t.ADD_TO_STATE,
      payload: {
        id: 'abcdefghijklmnopqrst',
        type: 'DEFINITELY_NOT_A_VALID_TYPE',
        context: {
          contextType: contextTypes.SUPER,
          contextItemId: dummyHeading1.id,
          indexInSiblingItems: 1,
        },
        propsForType: {},
      },
    };
    expect((): void => {
      reducer(prevState, addToStateAction);
    }).toThrow(InvalidArgumentError);
  });

  it(`throws an InvalidArgumentError, when the type is anything other than ROOT and there is no context defined`, (): void => {
    const prevState: ContentItemsState = {
      byId: {
        [dummyRoot.id]: { ...dummyRoot, childItemIds: [dummyHeading1.id, dummyHeading2.id] },
        [dummyHeading1.id]: { ...dummyHeading1, subItemIds: [dummyParagraph11.id, dummyNewParagraph.id, dummyParagraph12.id] },
        [dummyParagraph11.id]: { ...dummyParagraph11 },
        [dummyParagraph12.id]: { ...dummyParagraph12 },
        [dummyHeading2.id]: { ...dummyHeading2, subItemIds: [dummyParagraph21.id, dummyParagraph22.id] },
        [dummyParagraph21.id]: { ...dummyParagraph21 },
        [dummyParagraph22.id]: { ...dummyParagraph22 },
      },
    };
    const addToStateAction: any = {
      type: t.ADD_TO_STATE,
      payload: {
        id: dummyNewParagraph.id,
        type: contentItemTypes.PARAGRAPH,
        context: null,
        propsForType: {
          text: dummyNewParagraph.text,
        },
      },
    };
    expect((): void => {
      reducer(prevState, addToStateAction);
    }).toThrow(InvalidArgumentError);
  });

  it(`throws an UnsupportedOperationError, when attempting to move a HEADING before anything other than an existing HEADING in a list of siblings`, (): void => {
    const prevState: ContentItemsState = {
      byId: {
        [dummyRoot.id]: { ...dummyRoot, childItemIds: [dummyHeading1.id, dummyHeading2.id] },
        [dummyHeading1.id]: { ...dummyHeading1, subItemIds: [dummyParagraph11.id, dummyNewParagraph.id, dummyParagraph12.id] },
        [dummyParagraph11.id]: { ...dummyParagraph11 },
        [dummyParagraph12.id]: { ...dummyParagraph12 },
        [dummyHeading2.id]: { ...dummyHeading2, subItemIds: [dummyParagraph21.id, dummyParagraph22.id] },
        [dummyParagraph21.id]: { ...dummyParagraph21 },
        [dummyParagraph22.id]: { ...dummyParagraph22 },
      },
    };
    const addToStateAction: t.AddToStateAction = {
      type: t.ADD_TO_STATE,
      payload: {
        id: dummyHeading2.id,
        type: contentItemTypes.HEADING,
        context: {
          contextType: contextTypes.SUPER,
          contextItemId: dummyHeading1.id,
          indexInSiblingItems: 1,
        },
        propsForType: {
          text: dummyNewHeading.text,
        },
      },
    };

    expect((): void => {
      reducer(prevState, addToStateAction);
    }).toThrow(UnsupportedOperationError);
  });

  it(`re-throws any error from the validate function that is not a CorruptedInternalStateError`, (): void => {
    const dummyMessage = 'Dummy error message for testing purposes.';
    const prevState: ContentItemsState = {
      byId: {
        [dummyRoot.id]: { ...dummyRoot, childItemIds: [dummyHeading1.id, dummyHeading2.id] },
        [dummyHeading1.id]: { ...dummyHeading1, subItemIds: [dummyParagraph11.id, dummyNewParagraph.id, dummyParagraph12.id] },
        [dummyParagraph11.id]: { ...dummyParagraph11 },
        [dummyParagraph12.id]: { ...dummyParagraph12 },
        [dummyHeading2.id]: { ...dummyHeading2, subItemIds: [dummyParagraph21.id, dummyParagraph22.id] },
        [dummyParagraph21.id]: { ...dummyParagraph21 },
        [dummyParagraph22.id]: { ...dummyParagraph22 },
      },
    };
    const addToStateAction: t.AddToStateAction = {
      type: t.ADD_TO_STATE,
      payload: {
        id: dummyNewHeading.id,
        type: contentItemTypes.HEADING,
        context: {
          contextType: contextTypes.PARENT,
          contextItemId: dummyRoot.id,
          indexInSiblingItems: 2,
        },
        propsForType: {
          text: dummyNewHeading.text,
        },
      },
    };

    edit.validateChildOrSubItemsInContext = jest.fn((): void => {
      throw new Error(dummyMessage);
    });

    expect((): void => {
      reducer(prevState, addToStateAction);
    }).toThrow(dummyMessage);
  });

  it(`temporarily throws a NotYetImplementedError, when the type is anything other than HEADING or PARAGRAPH`, (): void => {
    const prevState: ContentItemsState = {
      byId: {
        [dummyRoot.id]: { ...dummyRoot, childItemIds: [dummyHeading1.id, dummyHeading2.id] },
        [dummyHeading1.id]: { ...dummyHeading1, subItemIds: [dummyParagraph11.id, dummyNewParagraph.id, dummyParagraph12.id] },
        [dummyParagraph11.id]: { ...dummyParagraph11 },
        [dummyParagraph12.id]: { ...dummyParagraph12 },
        [dummyHeading2.id]: { ...dummyHeading2, subItemIds: [dummyParagraph21.id, dummyParagraph22.id] },
        [dummyParagraph21.id]: { ...dummyParagraph21 },
        [dummyParagraph22.id]: { ...dummyParagraph22 },
      },
    };
    const addToStateAction: t.AddToStateAction = {
      type: t.ADD_TO_STATE,
      payload: {
        id: 'abcdefghijklmnopqrst',
        type: contentItemTypes.LIST,
        context: {
          contextType: contextTypes.SUPER,
          contextItemId: dummyHeading1.id,
          indexInSiblingItems: 1,
        },
        propsForType: {},
      },
    };
    expect((): void => {
      reducer(prevState, addToStateAction);
    }).toThrow(NotYetImplementedError);
  });

});
