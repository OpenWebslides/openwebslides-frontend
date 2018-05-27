// @flow

import InvalidArgumentError from 'errors/implementation-errors/InvalidArgumentError';
import NotYetImplementedError from 'errors/implementation-errors/NotYetImplementedError';
import ObjectNotFoundError from 'errors/usage-errors/ObjectNotFoundError';

import reducer from '../../reducer';
import * as t from '../../actionTypes';
import { contentItemTypes } from '../../model';
import type {
  PlainTextContentItem,
  ContentItemsState,
} from '../../model';
import * as dummyContentItemData from '../../lib/test-resources/dummyContentItemData';

describe(`EDIT_IN_STATE`, (): void => {

  const dummyPlainTextContentItem: $Exact<PlainTextContentItem> = {
    id: 'abcdefghij',
    type: contentItemTypes.HEADING,
    isEditing: false,
    text: 'Lorem ipsum dolor sit amet',
  };

  it(`changes a plainText contentItem's props, when the passed props are valid`, (): void => {
    const editedText = 'Consectetur adipiscing elit';
    const editedPlainTextContentItem: PlainTextContentItem = {
      ...dummyPlainTextContentItem,
      text: editedText,
    };
    const prevState: ContentItemsState = {
      byId: {
        [dummyPlainTextContentItem.id]: dummyPlainTextContentItem,
      },
    };
    const editPlainTextInStateAction: t.EditInStateAction = {
      type: t.EDIT_IN_STATE,
      payload: {
        id: dummyPlainTextContentItem.id,
        type: dummyPlainTextContentItem.type,
        isEditing: false,
        propsForType: {
          text: editedText,
        },
      },
    };
    const nextState: ContentItemsState = {
      byId: {
        [dummyPlainTextContentItem.id]: editedPlainTextContentItem,
      },
    };
    const resultState = reducer(prevState, editPlainTextInStateAction);

    expect(resultState).toEqual(nextState);
    expect(resultState).not.toBe(prevState);
    expect(resultState.byId).not.toBe(prevState.byId);
    expect(resultState.byId[dummyPlainTextContentItem.id]).not.toBe(prevState.byId[dummyPlainTextContentItem.id]);
  });

  it(`leaves the state unchanged, when all propsForType are undefined`, (): void => {
    const prevState: ContentItemsState = {
      byId: {
        [dummyPlainTextContentItem.id]: dummyPlainTextContentItem,
      },
    };
    const editPlainTextInStateAction: t.EditInStateAction = {
      type: t.EDIT_IN_STATE,
      payload: {
        id: dummyPlainTextContentItem.id,
        type: dummyPlainTextContentItem.type,
        isEditing: false,
        propsForType: {},
      },
    };
    const resultState = reducer(prevState, editPlainTextInStateAction);

    expect(resultState).toBe(prevState);
    expect(resultState.byId).toBe(prevState.byId);
    expect(resultState.byId[dummyPlainTextContentItem.id]).toBe(prevState.byId[dummyPlainTextContentItem.id]);
  });

  it(`leaves the state unchanged, when the action contains no meaninful changes`, (): void => {
    const prevState: ContentItemsState = {
      byId: {
        [dummyPlainTextContentItem.id]: dummyPlainTextContentItem,
      },
    };
    const editPlainTextInStateAction: t.EditInStateAction = {
      type: t.EDIT_IN_STATE,
      payload: {
        id: dummyPlainTextContentItem.id,
        type: dummyPlainTextContentItem.type,
        isEditing: false,
        propsForType: {
          text: dummyPlainTextContentItem.text,
        },
      },
    };
    const resultState = reducer(prevState, editPlainTextInStateAction);

    expect(resultState).toBe(prevState);
    expect(resultState.byId).toBe(prevState.byId);
    expect(resultState.byId[dummyPlainTextContentItem.id]).toBe(prevState.byId[dummyPlainTextContentItem.id]);
  });

  it(`throws an ObjectNotFoundError, when the contentItem for the passed id cannot be found`, (): void => {
    const dummyInvalidId = 'ExtremelyUnlikelyIdX';
    const prevState: ContentItemsState = {
      byId: {},
    };
    const editPlainTextInStateAction: t.EditInStateAction = {
      type: t.EDIT_IN_STATE,
      payload: {
        id: dummyInvalidId,
        type: contentItemTypes.HEADING,
        isEditing: false,
        propsForType: {
          text: 'Lorem ipsum',
        },
      },
    };
    expect((): any => reducer(
      prevState,
      editPlainTextInStateAction,
    )).toThrow(ObjectNotFoundError);
  });

  it(`throws an InvalidArgumentError, when the contentItem for the passed id does not match the action's type prop`, (): void => {
    const prevState: ContentItemsState = {
      byId: {
        [dummyContentItemData.rootContentItem.id]: dummyContentItemData.rootContentItem,
      },
    };
    const editPlainTextInStateAction: t.EditInStateAction = {
      type: t.EDIT_IN_STATE,
      payload: {
        id: dummyContentItemData.rootContentItem.id,
        type: contentItemTypes.HEADING,
        isEditing: false,
        propsForType: {
          text: 'Lorem ipsum',
        },
      },
    };
    expect((): any => reducer(
      prevState,
      editPlainTextInStateAction,
    )).toThrow(InvalidArgumentError);
  });

  it(`temporarily throws a NotYetImplementedError, when the contentItem's type is not a plainTextContentItemType`, (): void => {
    const prevState: ContentItemsState = {
      byId: {
        [dummyContentItemData.rootContentItem.id]: dummyContentItemData.rootContentItem,
      },
    };
    const editPlainTextInStateAction: t.EditInStateAction = {
      type: t.EDIT_IN_STATE,
      payload: {
        id: dummyContentItemData.rootContentItem.id,
        type: dummyContentItemData.rootContentItem.type,
        isEditing: false,
        propsForType: {},
      },
    };
    expect((): any => reducer(
      prevState,
      editPlainTextInStateAction,
    )).toThrow(NotYetImplementedError);
  });

});
