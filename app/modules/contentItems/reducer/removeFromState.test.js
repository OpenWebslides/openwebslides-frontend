// @flow

import CorruptedInternalStateError from 'errors/implementation-errors/CorruptedInternalStateError';
import ObjectNotFoundError from 'errors/usage-errors/ObjectNotFoundError';

import * as t from '../actionTypes';
import * as model from '../model';
import * as dummyData from '../lib/testResources/dummyContentItemData';

import reducer from '../reducer';

const {
  SubableContentItem,
  ContainerContentItem,
  RootContentItem,
  HeadingContentItem,
  ParagraphContentItem,
  ContentItemsState,
} = model;

describe(`removeFromState`, (): void => {

  let dummyRoot2: $Exact<RootContentItem>;
  let dummyHeading12: $Exact<HeadingContentItem>;
  let dummyParagraph112: $Exact<ParagraphContentItem>;
  let dummyParagraph111: $Exact<ParagraphContentItem>;
  let dummyHeading11: $Exact<HeadingContentItem>;
  let dummyRoot1: $Exact<RootContentItem>;

  beforeEach((): void => {
    dummyRoot2 = { ...dummyData.rootContentItem2 };
    dummyHeading12 = { ...dummyData.headingContentItem2 };
    dummyParagraph112 = { ...dummyData.paragraphContentItem2 };
    dummyParagraph111 = { ...dummyData.paragraphContentItem };
    dummyHeading11 = { ...dummyData.headingContentItem };
    dummyRoot1 = { ...dummyData.rootContentItem };
  });

  it(`removes the contentItem from the state, when the context is NULL`, (): void => {
    const prevState: ContentItemsState = {
      byId: {
        [dummyRoot1.id]: { ...dummyRoot1 },
        [dummyRoot2.id]: { ...dummyRoot2 },
      },
    };
    const removeFromStateAction: t.RemoveFromStateAction = {
      type: t.REMOVE_FROM_STATE,
      payload: {
        id: dummyRoot1.id,
      },
    };
    const nextState: ContentItemsState = {
      byId: {
        [dummyRoot2.id]: { ...dummyRoot2 },
      },
    };
    const resultState: ContentItemsState = reducer(prevState, removeFromStateAction);

    expect(resultState).toEqual(nextState);
    expect(resultState).not.toBe(nextState);
    expect(resultState.byId).not.toBe(nextState.byId);
  });

  it(`removes the contentItem from the state, when the contentItem is a subItem`, (): void => {
    const prevState: ContentItemsState = {
      byId: {
        [dummyRoot1.id]: { ...dummyRoot1, childItemIds: [dummyHeading11.id, dummyHeading12.id] },
        [dummyHeading11.id]: { ...dummyHeading11, subItemIds: [dummyParagraph111.id, dummyParagraph112.id] },
        [dummyParagraph111.id]: { ...dummyParagraph111 },
        [dummyParagraph112.id]: { ...dummyParagraph112 },
        [dummyHeading12.id]: { ...dummyHeading12 },
      },
    };
    const removeFromStateAction: t.RemoveFromStateAction = {
      type: t.REMOVE_FROM_STATE,
      payload: {
        id: dummyParagraph111.id,
      },
    };
    const nextState: ContentItemsState = {
      byId: {
        [dummyRoot1.id]: { ...dummyRoot1, childItemIds: [dummyHeading11.id, dummyHeading12.id] },
        [dummyHeading11.id]: { ...dummyHeading11, subItemIds: [dummyParagraph112.id] },
        [dummyParagraph112.id]: { ...dummyParagraph112 },
        [dummyHeading12.id]: { ...dummyHeading12 },
      },
    };
    const resultState: ContentItemsState = reducer(prevState, removeFromStateAction);

    expect(resultState).toEqual(nextState);
    expect(resultState).not.toBe(nextState);
    expect(resultState.byId).not.toBe(nextState.byId);
    expect(resultState.byId[dummyHeading11.id]).not.toBe(nextState.byId[dummyHeading11.id]);
    expect(((resultState.byId[dummyHeading11.id]: any): SubableContentItem).subItemIds).not.toBe(((nextState.byId[dummyHeading11.id]: any): SubableContentItem).subItemIds);
  });

  it(`removes the contentItem from the state, when the contentItem is a childItem`, (): void => {
    const prevState: ContentItemsState = {
      byId: {
        [dummyRoot1.id]: { ...dummyRoot1, childItemIds: [dummyHeading11.id, dummyHeading12.id] },
        [dummyHeading11.id]: { ...dummyHeading11, subItemIds: [dummyParagraph111.id, dummyParagraph112.id] },
        [dummyParagraph111.id]: { ...dummyParagraph111 },
        [dummyParagraph112.id]: { ...dummyParagraph112 },
        [dummyHeading12.id]: { ...dummyHeading12 },
      },
    };
    const removeFromStateAction: t.RemoveFromStateAction = {
      type: t.REMOVE_FROM_STATE,
      payload: {
        id: dummyHeading12.id,
      },
    };
    const nextState: ContentItemsState = {
      byId: {
        [dummyRoot1.id]: { ...dummyRoot1, childItemIds: [dummyHeading11.id] },
        [dummyHeading11.id]: { ...dummyHeading11, subItemIds: [dummyParagraph111.id, dummyParagraph112.id] },
        [dummyParagraph111.id]: { ...dummyParagraph111 },
        [dummyParagraph112.id]: { ...dummyParagraph112 },
      },
    };
    const resultState: ContentItemsState = reducer(prevState, removeFromStateAction);

    expect(resultState).toEqual(nextState);
    expect(resultState).not.toBe(nextState);
    expect(resultState.byId).not.toBe(nextState.byId);
    expect(resultState.byId[dummyRoot1.id]).not.toBe(nextState.byId[dummyRoot1.id]);
    expect(((resultState.byId[dummyRoot1.id]: any): ContainerContentItem).childItemIds).not.toBe(((nextState.byId[dummyRoot1.id]: any): ContainerContentItem).childItemIds);
  });

  it(`removes all subItems as well, when the contentItem to delete is a superItem`, (): void => {
    const prevState: ContentItemsState = {
      byId: {
        [dummyRoot1.id]: { ...dummyRoot1, childItemIds: [dummyHeading11.id, dummyHeading12.id] },
        [dummyHeading11.id]: { ...dummyHeading11, subItemIds: [dummyParagraph111.id, dummyParagraph112.id] },
        [dummyParagraph111.id]: { ...dummyParagraph111 },
        [dummyParagraph112.id]: { ...dummyParagraph112 },
        [dummyHeading12.id]: { ...dummyHeading12 },
      },
    };
    const removeFromStateAction: t.RemoveFromStateAction = {
      type: t.REMOVE_FROM_STATE,
      payload: {
        id: dummyHeading11.id,
      },
    };
    const nextState: ContentItemsState = {
      byId: {
        [dummyRoot1.id]: { ...dummyRoot1, childItemIds: [dummyHeading12.id] },
        [dummyHeading12.id]: { ...dummyHeading12 },
      },
    };
    const resultState: ContentItemsState = reducer(prevState, removeFromStateAction);

    expect(resultState).toEqual(nextState);
  });

  it(`removes all childItems as well, when the contentItem to delete is a parentItem`, (): void => {
    const prevState: ContentItemsState = {
      byId: {
        [dummyRoot1.id]: { ...dummyRoot1, childItemIds: [dummyHeading11.id, dummyHeading12.id] },
        [dummyHeading11.id]: { ...dummyHeading11, subItemIds: [dummyParagraph111.id, dummyParagraph112.id] },
        [dummyParagraph111.id]: { ...dummyParagraph111 },
        [dummyParagraph112.id]: { ...dummyParagraph112 },
        [dummyHeading12.id]: { ...dummyHeading12 },
        [dummyRoot2.id]: { ...dummyRoot2 },
      },
    };
    const removeFromStateAction: t.RemoveFromStateAction = {
      type: t.REMOVE_FROM_STATE,
      payload: {
        id: dummyRoot1.id,
      },
    };
    const nextState: ContentItemsState = {
      byId: {
        [dummyRoot2.id]: { ...dummyRoot2 },
      },
    };
    const resultState: ContentItemsState = reducer(prevState, removeFromStateAction);

    expect(resultState).toEqual(nextState);
  });

  it(`throws an ObjectNotFoundError, when the contentItem for the passed id cannot be found`, (): void => {
    const prevState: ContentItemsState = {
      byId: {
        [dummyRoot1.id]: { ...dummyRoot1, childItemIds: [dummyHeading11.id, dummyHeading12.id] },
        [dummyHeading11.id]: { ...dummyHeading11, subItemIds: [dummyParagraph111.id, dummyParagraph112.id] },
        [dummyParagraph111.id]: { ...dummyParagraph111 },
        [dummyParagraph112.id]: { ...dummyParagraph112 },
        [dummyHeading12.id]: { ...dummyHeading12 },
      },
    };
    const removeFromStateAction: t.RemoveFromStateAction = {
      type: t.REMOVE_FROM_STATE,
      payload: {
        id: 'DefinitelyNotValidId',
      },
    };

    expect((): void => {
      reducer(prevState, removeFromStateAction);
    }).toThrow(ObjectNotFoundError);
  });

  it(`throws a CorruptedInternalStateError, when a subItem cannot be found`, (): void => {
    const prevState: ContentItemsState = {
      byId: {
        [dummyRoot1.id]: { ...dummyRoot1, childItemIds: [dummyHeading11.id, dummyHeading12.id] },
        [dummyHeading11.id]: { ...dummyHeading11, subItemIds: [dummyParagraph111.id, dummyParagraph112.id, 'DefinitelyNotValidId'] },
        [dummyParagraph111.id]: { ...dummyParagraph111 },
        [dummyParagraph112.id]: { ...dummyParagraph112 },
        [dummyHeading12.id]: { ...dummyHeading12 },
      },
    };
    const removeFromStateAction: t.RemoveFromStateAction = {
      type: t.REMOVE_FROM_STATE,
      payload: {
        id: dummyHeading11.id,
      },
    };

    expect((): void => {
      reducer(prevState, removeFromStateAction);
    }).toThrow(CorruptedInternalStateError);
  });

  it(`throws a CorruptedInternalStateError, when a childItem cannot be found`, (): void => {
    const prevState: ContentItemsState = {
      byId: {
        [dummyRoot1.id]: { ...dummyRoot1, childItemIds: [dummyHeading11.id, dummyHeading12.id, 'DefinitelyNotValidId'] },
        [dummyHeading11.id]: { ...dummyHeading11, subItemIds: [dummyParagraph111.id, dummyParagraph112.id] },
        [dummyParagraph111.id]: { ...dummyParagraph111 },
        [dummyParagraph112.id]: { ...dummyParagraph112 },
        [dummyHeading12.id]: { ...dummyHeading12 },
      },
    };
    const removeFromStateAction: t.RemoveFromStateAction = {
      type: t.REMOVE_FROM_STATE,
      payload: {
        id: dummyRoot1.id,
      },
    };

    expect((): void => {
      reducer(prevState, removeFromStateAction);
    }).toThrow(CorruptedInternalStateError);
  });


  it(`throws a CorruptedInternalStateError, when a parentOrSuperItem cannot be found for a non-root contentItem`, async (): Promise<*> => {
    const prevState: ContentItemsState = {
      byId: {
        [dummyRoot1.id]: { ...dummyRoot1, childItemIds: [dummyHeading11.id, dummyHeading12.id] },
        [dummyHeading11.id]: { ...dummyHeading11, subItemIds: ['DefinitelyNotValidId', dummyParagraph112.id] },
        [dummyParagraph111.id]: { ...dummyParagraph111 },
        [dummyParagraph112.id]: { ...dummyParagraph112 },
        [dummyHeading12.id]: { ...dummyHeading12 },
      },
    };
    const removeFromStateAction: t.RemoveFromStateAction = {
      type: t.REMOVE_FROM_STATE,
      payload: {
        id: dummyParagraph111.id,
      },
    };

    expect((): void => {
      reducer(prevState, removeFromStateAction);
    }).toThrow(CorruptedInternalStateError);
  });

});
