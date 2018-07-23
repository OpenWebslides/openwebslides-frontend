// @flow

import { UnsupportedOperationError, ObjectNotFoundError } from 'errors';
import { dummyContentItemData as dummyData } from 'lib/testResources';

import * as a from '../actionTypes';
import * as m from '../model';

import reducer from '.';

describe(`switchEditingInState`, (): void => {

  it(`sets the previousEditingItem's isEditing value to FALSE and the nextEditingItem's isEditing value to TRUE, when both ids are passed`, (): void => {
    const prevState: m.ContentItemsState = {
      byId: {
        [dummyData.rootContentItem.id]: {
          ...dummyData.rootContentItem,
          isEditing: false,
          childItemIds: [dummyData.headingContentItem.id, dummyData.headingContentItem2.id],
        },
        [dummyData.headingContentItem.id]: {
          ...dummyData.headingContentItem,
          isEditing: true,
        },
        [dummyData.headingContentItem2.id]: {
          ...dummyData.headingContentItem2,
          isEditing: false,
        },
      },
    };
    const switchEditingInStateAction: a.SwitchEditingInStateAction = {
      type: a.SWITCH_EDITING_IN_STATE,
      payload: {
        previousEditingItemId: dummyData.headingContentItem.id,
        nextEditingItemId: dummyData.headingContentItem2.id,
      },
    };
    const nextState: m.ContentItemsState = {
      byId: {
        [dummyData.rootContentItem.id]: {
          ...dummyData.rootContentItem,
          isEditing: false,
          childItemIds: [dummyData.headingContentItem.id, dummyData.headingContentItem2.id],
        },
        [dummyData.headingContentItem.id]: {
          ...dummyData.headingContentItem,
          isEditing: false,
        },
        [dummyData.headingContentItem2.id]: {
          ...dummyData.headingContentItem2,
          isEditing: true,
        },
      },
    };
    const resultState = reducer(prevState, switchEditingInStateAction);

    expect(resultState).toEqual(nextState);
    expect(resultState).not.toBe(prevState);
    expect(resultState.byId).not.toBe(prevState.byId);
    expect(resultState.byId[dummyData.headingContentItem.id]).not.toBe(prevState.byId[dummyData.headingContentItem.id]);
    expect(resultState.byId[dummyData.headingContentItem2.id]).not.toBe(prevState.byId[dummyData.headingContentItem2.id]);
  });

  it(`does not change the state object, when neither id is passed`, (): void => {
    const prevState: m.ContentItemsState = {
      byId: {
        [dummyData.rootContentItem.id]: {
          ...dummyData.rootContentItem,
          isEditing: false,
          childItemIds: [dummyData.headingContentItem.id, dummyData.headingContentItem2.id],
        },
        [dummyData.headingContentItem.id]: {
          ...dummyData.headingContentItem,
          isEditing: true,
        },
        [dummyData.headingContentItem2.id]: {
          ...dummyData.headingContentItem2,
          isEditing: false,
        },
      },
    };
    const switchEditingInStateAction: a.SwitchEditingInStateAction = {
      type: a.SWITCH_EDITING_IN_STATE,
      payload: {
        previousEditingItemId: null,
        nextEditingItemId: null,
      },
    };
    const resultState = reducer(prevState, switchEditingInStateAction);

    expect(resultState).toBe(prevState);
  });

  it(`throws an ObjectNotFoundError, when the contentItem for the passed previousEditingItemId could not be found`, (): void => {
    const prevState: m.ContentItemsState = {
      byId: {
        [dummyData.rootContentItem.id]: {
          ...dummyData.rootContentItem,
          isEditing: false,
          childItemIds: [dummyData.headingContentItem.id, dummyData.headingContentItem2.id],
        },
        [dummyData.headingContentItem.id]: {
          ...dummyData.headingContentItem,
          isEditing: true,
        },
        [dummyData.headingContentItem2.id]: {
          ...dummyData.headingContentItem2,
          isEditing: false,
        },
      },
    };
    const switchEditingInStateAction: a.SwitchEditingInStateAction = {
      type: a.SWITCH_EDITING_IN_STATE,
      payload: {
        previousEditingItemId: 'DefinitelyNotValidId',
        nextEditingItemId: dummyData.headingContentItem2.id,
      },
    };

    expect((): void => {
      reducer(prevState, switchEditingInStateAction);
    }).toThrow(ObjectNotFoundError);
  });

  it(`throws an ObjectNotFoundError, when the contentItem for the passed nextEditingItemId could not be found`, (): void => {
    const prevState: m.ContentItemsState = {
      byId: {
        [dummyData.rootContentItem.id]: {
          ...dummyData.rootContentItem,
          isEditing: false,
          childItemIds: [dummyData.headingContentItem.id, dummyData.headingContentItem2.id],
        },
        [dummyData.headingContentItem.id]: {
          ...dummyData.headingContentItem,
          isEditing: true,
        },
        [dummyData.headingContentItem2.id]: {
          ...dummyData.headingContentItem2,
          isEditing: false,
        },
      },
    };
    const switchEditingInStateAction: a.SwitchEditingInStateAction = {
      type: a.SWITCH_EDITING_IN_STATE,
      payload: {
        previousEditingItemId: dummyData.headingContentItem.id,
        nextEditingItemId: 'DefinitelyNotValidId',
      },
    };

    expect((): void => {
      reducer(prevState, switchEditingInStateAction);
    }).toThrow(ObjectNotFoundError);
  });

  it(`throws an UnsupportedOperationError, when the previousEditingItem's isEditing value was already FALSE`, (): void => {
    const prevState: m.ContentItemsState = {
      byId: {
        [dummyData.rootContentItem.id]: {
          ...dummyData.rootContentItem,
          isEditing: false,
          childItemIds: [dummyData.headingContentItem.id, dummyData.headingContentItem2.id],
        },
        [dummyData.headingContentItem.id]: {
          ...dummyData.headingContentItem,
          isEditing: false,
        },
        [dummyData.headingContentItem2.id]: {
          ...dummyData.headingContentItem2,
          isEditing: false,
        },
      },
    };
    const switchEditingInStateAction: a.SwitchEditingInStateAction = {
      type: a.SWITCH_EDITING_IN_STATE,
      payload: {
        previousEditingItemId: dummyData.headingContentItem.id,
        nextEditingItemId: null,
      },
    };

    expect((): void => {
      reducer(prevState, switchEditingInStateAction);
    }).toThrow(UnsupportedOperationError);
  });

  it(`throws an UnsupportedOperationError, when the nextEditingItem's isEditing value was already TRUE`, (): void => {
    const prevState: m.ContentItemsState = {
      byId: {
        [dummyData.rootContentItem.id]: {
          ...dummyData.rootContentItem,
          isEditing: false,
          childItemIds: [dummyData.headingContentItem.id, dummyData.headingContentItem2.id],
        },
        [dummyData.headingContentItem.id]: {
          ...dummyData.headingContentItem,
          isEditing: false,
        },
        [dummyData.headingContentItem2.id]: {
          ...dummyData.headingContentItem2,
          isEditing: true,
        },
      },
    };
    const switchEditingInStateAction: a.SwitchEditingInStateAction = {
      type: a.SWITCH_EDITING_IN_STATE,
      payload: {
        previousEditingItemId: null,
        nextEditingItemId: dummyData.headingContentItem2.id,
      },
    };

    expect((): void => {
      reducer(prevState, switchEditingInStateAction);
    }).toThrow(UnsupportedOperationError);
  });

});
