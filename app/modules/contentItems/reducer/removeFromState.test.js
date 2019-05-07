// @flow

import { CorruptedInternalStateError, ObjectNotFoundError } from 'errors';
import { dummyContentItemData as dummyData } from 'lib/testResources';

import * as a from '../actionTypes';
import * as m from '../model';

import reducer from '.';

describe(`removeFromState`, (): void => {

  let dummyRoot2: m.RootContentItem;
  let dummyHeading12: m.HeadingContentItem;
  let dummyParagraph112: m.ParagraphContentItem;
  let dummyParagraph111: m.ParagraphContentItem;
  let dummyHeading11: m.HeadingContentItem;
  let dummyRoot1: m.RootContentItem;

  beforeEach((): void => {
    dummyRoot2 = { ...dummyData.rootContentItem2 };
    dummyHeading12 = { ...dummyData.headingContentItem2 };
    dummyParagraph112 = { ...dummyData.paragraphContentItem2 };
    dummyParagraph111 = { ...dummyData.paragraphContentItem };
    dummyHeading11 = { ...dummyData.headingContentItem };
    dummyRoot1 = { ...dummyData.rootContentItem };
  });

  it(`removes the contentItem from the state, when the context is NULL`, (): void => {
    const prevState: m.ContentItemsState = {
      byId: {
        [dummyRoot1.id]: { ...dummyRoot1 },
        [dummyRoot2.id]: { ...dummyRoot2 },
      },
      currentlySelectedId: null,
    };
    const removeFromStateAction: a.RemoveFromStateAction = {
      type: a.REMOVE_FROM_STATE,
      payload: {
        id: dummyRoot1.id,
      },
    };
    const nextState: m.ContentItemsState = {
      byId: {
        [dummyRoot2.id]: { ...dummyRoot2 },
      },
      currentlySelectedId: null,
    };
    const resultState: m.ContentItemsState = reducer(prevState, removeFromStateAction);

    expect(resultState).toStrictEqual(nextState);
    expect(resultState).not.toBe(nextState);
    expect(resultState.byId).not.toBe(nextState.byId);
  });

  it(`removes the contentItem from the state`, (): void => {
    const prevState: m.ContentItemsState = {
      byId: {
        [dummyRoot1.id]: { ...dummyRoot1, subItemIds: [dummyHeading11.id, dummyHeading12.id] },
        [dummyHeading11.id]: { ...dummyHeading11, subItemIds: [dummyParagraph111.id, dummyParagraph112.id] },
        [dummyParagraph111.id]: { ...dummyParagraph111 },
        [dummyParagraph112.id]: { ...dummyParagraph112 },
        [dummyHeading12.id]: { ...dummyHeading12 },
      },
      currentlySelectedId: null,
    };
    const removeFromStateAction: a.RemoveFromStateAction = {
      type: a.REMOVE_FROM_STATE,
      payload: {
        id: dummyParagraph111.id,
      },
    };
    const nextState: m.ContentItemsState = {
      byId: {
        [dummyRoot1.id]: { ...dummyRoot1, subItemIds: [dummyHeading11.id, dummyHeading12.id] },
        [dummyHeading11.id]: { ...dummyHeading11, subItemIds: [dummyParagraph112.id] },
        [dummyParagraph112.id]: { ...dummyParagraph112 },
        [dummyHeading12.id]: { ...dummyHeading12 },
      },
      currentlySelectedId: null,
    };
    const resultState: m.ContentItemsState = reducer(prevState, removeFromStateAction);

    expect(resultState).toStrictEqual(nextState);
    expect(resultState).not.toBe(nextState);
    expect(resultState.byId).not.toBe(nextState.byId);
    expect(resultState.byId[dummyHeading11.id]).not.toBe(nextState.byId[dummyHeading11.id]);
    expect(((resultState.byId[dummyHeading11.id]: any): m.SubableContentItem).subItemIds).not.toBe(((nextState.byId[dummyHeading11.id]: any): m.SubableContentItem).subItemIds);
  });

  it(`does not change the currently selected contentItem, if the contentItem was not selected`, (): void => {
    const prevState: m.ContentItemsState = {
      byId: {
        [dummyRoot1.id]: { ...dummyRoot1, subItemIds: [dummyHeading11.id, dummyHeading12.id] },
        [dummyHeading11.id]: { ...dummyHeading11, subItemIds: [dummyParagraph111.id, dummyParagraph112.id] },
        [dummyParagraph111.id]: { ...dummyParagraph111 },
        [dummyParagraph112.id]: { ...dummyParagraph112 },
        [dummyHeading12.id]: { ...dummyHeading12 },
      },
      currentlySelectedId: dummyHeading11.id,
    };
    const removeFromStateAction: a.RemoveFromStateAction = {
      type: a.REMOVE_FROM_STATE,
      payload: {
        id: dummyHeading12.id,
      },
    };
    const nextState: m.ContentItemsState = {
      byId: {
        [dummyRoot1.id]: { ...dummyRoot1, subItemIds: [dummyHeading11.id] },
        [dummyHeading11.id]: { ...dummyHeading11, subItemIds: [dummyParagraph111.id, dummyParagraph112.id] },
        [dummyParagraph111.id]: { ...dummyParagraph111 },
        [dummyParagraph112.id]: { ...dummyParagraph112 },
      },
      currentlySelectedId: dummyHeading11.id,
    };
    const resultState: m.ContentItemsState = reducer(prevState, removeFromStateAction);

    expect(resultState).toStrictEqual(nextState);
    expect(resultState).not.toBe(nextState);
    expect(resultState.byId).not.toBe(nextState.byId);
    expect(resultState.byId[dummyRoot1.id]).not.toBe(nextState.byId[dummyRoot1.id]);
  });

  it(`sets the previous contentItem as new selection, if the contentItem was selected`, (): void => {
    const prevState: m.ContentItemsState = {
      byId: {
        [dummyRoot1.id]: { ...dummyRoot1, subItemIds: [dummyHeading11.id, dummyHeading12.id] },
        [dummyHeading11.id]: { ...dummyHeading11, subItemIds: [dummyParagraph111.id, dummyParagraph112.id] },
        [dummyParagraph111.id]: { ...dummyParagraph111 },
        [dummyParagraph112.id]: { ...dummyParagraph112 },
        [dummyHeading12.id]: { ...dummyHeading12 },
      },
      currentlySelectedId: dummyHeading12.id,
    };
    const removeFromStateAction: a.RemoveFromStateAction = {
      type: a.REMOVE_FROM_STATE,
      payload: {
        id: dummyHeading12.id,
      },
    };
    const nextState: m.ContentItemsState = {
      byId: {
        [dummyRoot1.id]: { ...dummyRoot1, subItemIds: [dummyHeading11.id] },
        [dummyHeading11.id]: { ...dummyHeading11, subItemIds: [dummyParagraph111.id, dummyParagraph112.id] },
        [dummyParagraph111.id]: { ...dummyParagraph111 },
        [dummyParagraph112.id]: { ...dummyParagraph112 },
      },
      currentlySelectedId: dummyParagraph112.id,
    };
    const resultState: m.ContentItemsState = reducer(prevState, removeFromStateAction);

    expect(resultState).toStrictEqual(nextState);
    expect(resultState).not.toBe(nextState);
    expect(resultState.byId).not.toBe(nextState.byId);
    expect(resultState.byId[dummyRoot1.id]).not.toBe(nextState.byId[dummyRoot1.id]);
  });

  it(`clears the new selection, if the contentItem was selected but there is no previous contentItem`, (): void => {
    const prevState: m.ContentItemsState = {
      byId: {
        [dummyRoot1.id]: { ...dummyRoot1, subItemIds: [dummyHeading11.id, dummyHeading12.id] },
        [dummyHeading11.id]: { ...dummyHeading11, subItemIds: [dummyParagraph111.id, dummyParagraph112.id] },
        [dummyParagraph111.id]: { ...dummyParagraph111 },
        [dummyParagraph112.id]: { ...dummyParagraph112 },
        [dummyHeading12.id]: { ...dummyHeading12 },
      },
      currentlySelectedId: dummyRoot1.id,
    };
    const removeFromStateAction: a.RemoveFromStateAction = {
      type: a.REMOVE_FROM_STATE,
      payload: {
        id: dummyRoot1.id,
      },
    };
    const nextState: m.ContentItemsState = {
      byId: {},
      currentlySelectedId: null,
    };
    const resultState: m.ContentItemsState = reducer(prevState, removeFromStateAction);

    expect(resultState).toStrictEqual(nextState);
    expect(resultState).not.toBe(nextState);
    expect(resultState.byId).not.toBe(nextState.byId);
  });

  it(`removes all subItems as well, when the contentItem to delete is a superItem`, (): void => {
    const prevState: m.ContentItemsState = {
      byId: {
        [dummyRoot1.id]: { ...dummyRoot1, subItemIds: [dummyHeading11.id, dummyHeading12.id] },
        [dummyHeading11.id]: { ...dummyHeading11, subItemIds: [dummyParagraph111.id, dummyParagraph112.id] },
        [dummyParagraph111.id]: { ...dummyParagraph111 },
        [dummyParagraph112.id]: { ...dummyParagraph112 },
        [dummyHeading12.id]: { ...dummyHeading12 },
      },
      currentlySelectedId: null,
    };
    const removeFromStateAction: a.RemoveFromStateAction = {
      type: a.REMOVE_FROM_STATE,
      payload: {
        id: dummyHeading11.id,
      },
    };
    const nextState: m.ContentItemsState = {
      byId: {
        [dummyRoot1.id]: { ...dummyRoot1, subItemIds: [dummyHeading12.id] },
        [dummyHeading12.id]: { ...dummyHeading12 },
      },
      currentlySelectedId: null,
    };
    const resultState: m.ContentItemsState = reducer(prevState, removeFromStateAction);

    expect(resultState).toStrictEqual(nextState);
  });

  it(`throws an ObjectNotFoundError, when the contentItem for the passed id cannot be found`, (): void => {
    const prevState: m.ContentItemsState = {
      byId: {
        [dummyRoot1.id]: { ...dummyRoot1, subItemIds: [dummyHeading11.id, dummyHeading12.id] },
        [dummyHeading11.id]: { ...dummyHeading11, subItemIds: [dummyParagraph111.id, dummyParagraph112.id] },
        [dummyParagraph111.id]: { ...dummyParagraph111 },
        [dummyParagraph112.id]: { ...dummyParagraph112 },
        [dummyHeading12.id]: { ...dummyHeading12 },
      },
      currentlySelectedId: null,
    };
    const removeFromStateAction: a.RemoveFromStateAction = {
      type: a.REMOVE_FROM_STATE,
      payload: {
        id: 'DefinitelyNotValidId',
      },
    };

    expect((): void => {
      reducer(prevState, removeFromStateAction);
    }).toThrow(ObjectNotFoundError);
  });

  it(`throws a CorruptedInternalStateError, when a subItem cannot be found`, (): void => {
    const prevState: m.ContentItemsState = {
      byId: {
        [dummyRoot1.id]: { ...dummyRoot1, subItemIds: [dummyHeading11.id, dummyHeading12.id] },
        [dummyHeading11.id]: { ...dummyHeading11, subItemIds: [dummyParagraph111.id, dummyParagraph112.id, 'DefinitelyNotValidId'] },
        [dummyParagraph111.id]: { ...dummyParagraph111 },
        [dummyParagraph112.id]: { ...dummyParagraph112 },
        [dummyHeading12.id]: { ...dummyHeading12 },
      },
      currentlySelectedId: null,
    };
    const removeFromStateAction: a.RemoveFromStateAction = {
      type: a.REMOVE_FROM_STATE,
      payload: {
        id: dummyHeading11.id,
      },
    };

    expect((): void => {
      reducer(prevState, removeFromStateAction);
    }).toThrow(CorruptedInternalStateError);
  });

  it(`throws a CorruptedInternalStateError, when a superItem cannot be found for a non-root contentItem`, async (): Promise<void> => {
    const prevState: m.ContentItemsState = {
      byId: {
        [dummyRoot1.id]: { ...dummyRoot1, subItemIds: [dummyHeading11.id, dummyHeading12.id] },
        [dummyHeading11.id]: { ...dummyHeading11, subItemIds: ['DefinitelyNotValidId', dummyParagraph112.id] },
        [dummyParagraph111.id]: { ...dummyParagraph111 },
        [dummyParagraph112.id]: { ...dummyParagraph112 },
        [dummyHeading12.id]: { ...dummyHeading12 },
      },
      currentlySelectedId: null,
    };
    const removeFromStateAction: a.RemoveFromStateAction = {
      type: a.REMOVE_FROM_STATE,
      payload: {
        id: dummyParagraph111.id,
      },
    };

    expect((): void => {
      reducer(prevState, removeFromStateAction);
    }).toThrow(CorruptedInternalStateError);
  });

});
