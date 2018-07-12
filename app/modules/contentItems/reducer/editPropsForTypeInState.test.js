// @flow

import CorruptedInternalStateError from 'errors/implementation-errors/CorruptedInternalStateError';
import NotYetImplementedError from 'errors/implementation-errors/NotYetImplementedError';
import ObjectNotFoundError from 'errors/usage-errors/ObjectNotFoundError';

import * as t from '../actionTypes';
import * as m from '../model';
import { dummyContentItemData as dummyData } from '../lib/testResources';

import reducer from '.';

describe(`EDIT_PROPS_FOR_TYPE_IN_STATE`, (): void => {

  let dummyPlainTextContentItem: m.HeadingContentItem;

  beforeEach((): void => {
    dummyPlainTextContentItem = {
      ...dummyData.headingContentItem,
    };
  });

  it(`changes a plainText contentItem's props, when the passed props are valid`, (): void => {
    const editedText = 'This text has been edited.';
    const editedPlainTextContentItem: m.HeadingContentItem = {
      ...dummyPlainTextContentItem,
      text: editedText,
    };
    const prevState: m.ContentItemsState = {
      byId: {
        [dummyPlainTextContentItem.id]: dummyPlainTextContentItem,
      },
    };
    const editPropsForTypeInStateAction: t.EditPropsForTypeInStateAction = {
      type: t.EDIT_PROPS_FOR_TYPE_IN_STATE,
      payload: {
        contentItem: dummyPlainTextContentItem,
        propsForType: {
          text: editedText,
        },
      },
    };
    const nextState: m.ContentItemsState = {
      byId: {
        [dummyPlainTextContentItem.id]: editedPlainTextContentItem,
      },
    };
    const resultState = reducer(prevState, editPropsForTypeInStateAction);

    expect(resultState).toEqual(nextState);
    expect(resultState).not.toBe(prevState);
    expect(resultState.byId).not.toBe(prevState.byId);
    expect(resultState.byId[dummyPlainTextContentItem.id]).not.toBe(prevState.byId[dummyPlainTextContentItem.id]);
  });

  it(`leaves the state unchanged, when all propsForType are undefined`, (): void => {
    const prevState: m.ContentItemsState = {
      byId: {
        [dummyPlainTextContentItem.id]: dummyPlainTextContentItem,
      },
    };
    const editPropsForTypeInStateAction: t.EditPropsForTypeInStateAction = {
      type: t.EDIT_PROPS_FOR_TYPE_IN_STATE,
      payload: {
        contentItem: dummyPlainTextContentItem,
        propsForType: {},
      },
    };
    const resultState = reducer(prevState, editPropsForTypeInStateAction);

    expect(resultState).toBe(prevState);
    expect(resultState.byId).toBe(prevState.byId);
    expect(resultState.byId[dummyPlainTextContentItem.id]).toBe(prevState.byId[dummyPlainTextContentItem.id]);
  });

  it(`leaves the state unchanged, when the action contains no meaninful changes`, (): void => {
    const prevState: m.ContentItemsState = {
      byId: {
        [dummyPlainTextContentItem.id]: dummyPlainTextContentItem,
      },
    };
    const editPropsForTypeInStateAction: t.EditPropsForTypeInStateAction = {
      type: t.EDIT_PROPS_FOR_TYPE_IN_STATE,
      payload: {
        contentItem: dummyPlainTextContentItem,
        propsForType: {
          text: dummyPlainTextContentItem.text,
        },
      },
    };
    const resultState = reducer(prevState, editPropsForTypeInStateAction);

    expect(resultState).toBe(prevState);
    expect(resultState.byId).toBe(prevState.byId);
    expect(resultState.byId[dummyPlainTextContentItem.id]).toBe(prevState.byId[dummyPlainTextContentItem.id]);
  });

  it(`throws an ObjectNotFoundError, when the passed contentItem could not be found in the state`, (): void => {
    const prevState: m.ContentItemsState = {
      byId: {},
    };
    const editPropsForTypeInStateAction: t.EditPropsForTypeInStateAction = {
      type: t.EDIT_PROPS_FOR_TYPE_IN_STATE,
      payload: {
        contentItem: dummyPlainTextContentItem,
        propsForType: {
          text: 'Lorem ipsum',
        },
      },
    };
    expect((): any => reducer(
      prevState,
      editPropsForTypeInStateAction,
    )).toThrow(ObjectNotFoundError);
  });

  it(`throws a CorruptedInternalStateError, when the passed contentItem does not match the contentItem with the same id fetched from the state`, (): void => {
    const prevState: m.ContentItemsState = {
      byId: {
        [dummyPlainTextContentItem.id]: dummyPlainTextContentItem,
      },
    };
    const editPropsForTypeInStateAction: t.EditPropsForTypeInStateAction = {
      type: t.EDIT_PROPS_FOR_TYPE_IN_STATE,
      payload: {
        contentItem: ({
          ...dummyPlainTextContentItem,
          text: 'Text should not be edited outside of a reducer. This will throw an error.',
        }: m.HeadingContentItem),
        propsForType: {
          text: 'Lorem ipsum',
        },
      },
    };
    expect((): any => reducer(
      prevState,
      editPropsForTypeInStateAction,
    )).toThrow(CorruptedInternalStateError);
  });

  it(`temporarily throws a NotYetImplementedError, when the contentItem's type is not a plainTextContentItemType`, (): void => {
    const prevState: m.ContentItemsState = {
      byId: {
        [dummyData.rootContentItem.id]: dummyData.rootContentItem,
      },
    };
    const editPropsForTypeInStateAction: t.EditPropsForTypeInStateAction = {
      type: t.EDIT_PROPS_FOR_TYPE_IN_STATE,
      payload: {
        contentItem: dummyData.rootContentItem,
        propsForType: {},
      },
    };
    expect((): any => reducer(
      prevState,
      editPropsForTypeInStateAction,
    )).toThrow(NotYetImplementedError);
  });

});
