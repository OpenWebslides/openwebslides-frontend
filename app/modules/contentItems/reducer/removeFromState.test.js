// @flow

import CorruptedInternalStateError from 'errors/implementation-errors/CorruptedInternalStateError';
import ObjectNotFoundError from 'errors/usage-errors/ObjectNotFoundError';

import * as t from '../actionTypes';
import type {
  SubableContentItem,
  ContainerContentItem,
  RootContentItem,
  HeadingContentItem,
  ParagraphContentItem,
  ContentItemsState,
} from '../model';
import * as dummyData from '../lib/testResources/dummyContentItemData';

import reducer from '../reducer';

describe(`removeFromState`, (): void => {

  let dummyRoot2: $Exact<RootContentItem>;
  let dummyHeading2: $Exact<HeadingContentItem>;
  let dummyParagraph2: $Exact<ParagraphContentItem>;
  let dummyParagraph1: $Exact<ParagraphContentItem>;
  let dummyHeading1: $Exact<HeadingContentItem>;
  let dummyRoot1: $Exact<RootContentItem>;

  beforeEach((): void => {
    dummyRoot2 = { ...dummyData.rootContentItem2 };
    dummyHeading2 = { ...dummyData.headingContentItem2 };
    dummyParagraph2 = { ...dummyData.paragraphContentItem2 };
    dummyParagraph1 = { ...dummyData.paragraphContentItem };
    dummyHeading1 = { ...dummyData.headingContentItem };
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
        [dummyRoot1.id]: { ...dummyRoot1, childItemIds: [dummyHeading1.id, dummyHeading2.id] },
        [dummyHeading1.id]: { ...dummyHeading1, subItemIds: [dummyParagraph1.id, dummyParagraph2.id] },
        [dummyParagraph1.id]: { ...dummyParagraph1 },
        [dummyParagraph2.id]: { ...dummyParagraph2 },
        [dummyHeading2.id]: { ...dummyHeading2 },
      },
    };
    const removeFromStateAction: t.RemoveFromStateAction = {
      type: t.REMOVE_FROM_STATE,
      payload: {
        id: dummyParagraph1.id,
      },
    };
    const nextState: ContentItemsState = {
      byId: {
        [dummyRoot1.id]: { ...dummyRoot1, childItemIds: [dummyHeading1.id, dummyHeading2.id] },
        [dummyHeading1.id]: { ...dummyHeading1, subItemIds: [dummyParagraph2.id] },
        [dummyParagraph2.id]: { ...dummyParagraph2 },
        [dummyHeading2.id]: { ...dummyHeading2 },
      },
    };
    const resultState: ContentItemsState = reducer(prevState, removeFromStateAction);

    expect(resultState).toEqual(nextState);
    expect(resultState).not.toBe(nextState);
    expect(resultState.byId).not.toBe(nextState.byId);
    expect(resultState.byId[dummyHeading1.id]).not.toBe(nextState.byId[dummyHeading1.id]);
    expect(((resultState.byId[dummyHeading1.id]: any): SubableContentItem).subItemIds).not.toBe(((nextState.byId[dummyHeading1.id]: any): SubableContentItem).subItemIds);
  });

  it(`removes the contentItem from the state, when the contentItem is a childItem`, (): void => {
    const prevState: ContentItemsState = {
      byId: {
        [dummyRoot1.id]: { ...dummyRoot1, childItemIds: [dummyHeading1.id, dummyHeading2.id] },
        [dummyHeading1.id]: { ...dummyHeading1, subItemIds: [dummyParagraph1.id, dummyParagraph2.id] },
        [dummyParagraph1.id]: { ...dummyParagraph1 },
        [dummyParagraph2.id]: { ...dummyParagraph2 },
        [dummyHeading2.id]: { ...dummyHeading2 },
      },
    };
    const removeFromStateAction: t.RemoveFromStateAction = {
      type: t.REMOVE_FROM_STATE,
      payload: {
        id: dummyHeading2.id,
      },
    };
    const nextState: ContentItemsState = {
      byId: {
        [dummyRoot1.id]: { ...dummyRoot1, childItemIds: [dummyHeading1.id] },
        [dummyHeading1.id]: { ...dummyHeading1, subItemIds: [dummyParagraph1.id, dummyParagraph2.id] },
        [dummyParagraph1.id]: { ...dummyParagraph1 },
        [dummyParagraph2.id]: { ...dummyParagraph2 },
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
        [dummyRoot1.id]: { ...dummyRoot1, childItemIds: [dummyHeading1.id, dummyHeading2.id] },
        [dummyHeading1.id]: { ...dummyHeading1, subItemIds: [dummyParagraph1.id, dummyParagraph2.id] },
        [dummyParagraph1.id]: { ...dummyParagraph1 },
        [dummyParagraph2.id]: { ...dummyParagraph2 },
        [dummyHeading2.id]: { ...dummyHeading2 },
      },
    };
    const removeFromStateAction: t.RemoveFromStateAction = {
      type: t.REMOVE_FROM_STATE,
      payload: {
        id: dummyHeading1.id,
      },
    };
    const nextState: ContentItemsState = {
      byId: {
        [dummyRoot1.id]: { ...dummyRoot1, childItemIds: [dummyHeading2.id] },
        [dummyHeading2.id]: { ...dummyHeading2 },
      },
    };
    const resultState: ContentItemsState = reducer(prevState, removeFromStateAction);

    expect(resultState).toEqual(nextState);
  });

  it(`removes all childItems as well, when the contentItem to delete is a parentItem`, (): void => {
    const prevState: ContentItemsState = {
      byId: {
        [dummyRoot1.id]: { ...dummyRoot1, childItemIds: [dummyHeading1.id, dummyHeading2.id] },
        [dummyHeading1.id]: { ...dummyHeading1, subItemIds: [dummyParagraph1.id, dummyParagraph2.id] },
        [dummyParagraph1.id]: { ...dummyParagraph1 },
        [dummyParagraph2.id]: { ...dummyParagraph2 },
        [dummyHeading2.id]: { ...dummyHeading2 },
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
        [dummyRoot1.id]: { ...dummyRoot1, childItemIds: [dummyHeading1.id, dummyHeading2.id] },
        [dummyHeading1.id]: { ...dummyHeading1, subItemIds: [dummyParagraph1.id, dummyParagraph2.id] },
        [dummyParagraph1.id]: { ...dummyParagraph1 },
        [dummyParagraph2.id]: { ...dummyParagraph2 },
        [dummyHeading2.id]: { ...dummyHeading2 },
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
        [dummyRoot1.id]: { ...dummyRoot1, childItemIds: [dummyHeading1.id, dummyHeading2.id] },
        [dummyHeading1.id]: { ...dummyHeading1, subItemIds: [dummyParagraph1.id, dummyParagraph2.id, 'DefinitelyNotValidId'] },
        [dummyParagraph1.id]: { ...dummyParagraph1 },
        [dummyParagraph2.id]: { ...dummyParagraph2 },
        [dummyHeading2.id]: { ...dummyHeading2 },
      },
    };
    const removeFromStateAction: t.RemoveFromStateAction = {
      type: t.REMOVE_FROM_STATE,
      payload: {
        id: dummyHeading1.id,
      },
    };

    expect((): void => {
      reducer(prevState, removeFromStateAction);
    }).toThrow(CorruptedInternalStateError);
  });

  it(`throws a CorruptedInternalStateError, when a childItem cannot be found`, (): void => {
    const prevState: ContentItemsState = {
      byId: {
        [dummyRoot1.id]: { ...dummyRoot1, childItemIds: [dummyHeading1.id, dummyHeading2.id, 'DefinitelyNotValidId'] },
        [dummyHeading1.id]: { ...dummyHeading1, subItemIds: [dummyParagraph1.id, dummyParagraph2.id] },
        [dummyParagraph1.id]: { ...dummyParagraph1 },
        [dummyParagraph2.id]: { ...dummyParagraph2 },
        [dummyHeading2.id]: { ...dummyHeading2 },
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
        [dummyRoot1.id]: { ...dummyRoot1, childItemIds: [dummyHeading1.id, dummyHeading2.id] },
        [dummyHeading1.id]: { ...dummyHeading1, subItemIds: ['DefinitelyNotValidId', dummyParagraph2.id] },
        [dummyParagraph1.id]: { ...dummyParagraph1 },
        [dummyParagraph2.id]: { ...dummyParagraph2 },
        [dummyHeading2.id]: { ...dummyHeading2 },
      },
    };
    const removeFromStateAction: t.RemoveFromStateAction = {
      type: t.REMOVE_FROM_STATE,
      payload: {
        id: dummyParagraph1.id,
      },
    };

    expect((): void => {
      reducer(prevState, removeFromStateAction);
    }).toThrow(CorruptedInternalStateError);
  });

});
