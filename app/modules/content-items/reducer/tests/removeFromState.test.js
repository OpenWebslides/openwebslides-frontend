// @flow

import CorruptedInternalStateError from 'errors/implementation-errors/CorruptedInternalStateError';
import InvalidArgumentError from 'errors/implementation-errors/InvalidArgumentError';
import ObjectNotFoundError from 'errors/usage-errors/ObjectNotFoundError';

import * as t from '../../actionTypes';
import type {
  ContentItemsState,
} from '../../model';
import * as dummyContentItemData from '../../lib/test-resources/dummyContentItemData';

import reducer from '../../reducer';

describe(`removeFromState`, (): void => {

  it(`removes the contentItem from the state, when the context is NULL`, (): void => {
    const prevState: ContentItemsState = {
      byId: {
        [dummyContentItemData.rootContentItem.id]: {
          ...dummyContentItemData.rootContentItem,
        },
        [dummyContentItemData.rootContentItem2.id]: {
          ...dummyContentItemData.rootContentItem2,
        },
      },
    };
    const removeFromStateAction: t.RemoveFromStateAction = {
      type: t.REMOVE_FROM_STATE,
      payload: {
        id: dummyContentItemData.rootContentItem.id,
        context: null,
      },
    };
    const nextState: ContentItemsState = {
      byId: {
        [dummyContentItemData.rootContentItem2.id]: {
          ...dummyContentItemData.rootContentItem2,
        },
      },
    };
    const resultState: ContentItemsState = reducer(prevState, removeFromStateAction);

    expect(resultState).toEqual(nextState);
    expect(resultState).not.toBe(nextState);
    expect(resultState.byId).not.toBe(nextState.byId);
  });

  it(`removes the contentItem from the state, when the contextType is SUPER`, (): void => {
    const prevState: ContentItemsState = {
      byId: {
        [dummyContentItemData.rootContentItem.id]: {
          ...dummyContentItemData.rootContentItem,
          childItemIds: [dummyContentItemData.headingContentItem.id],
        },
        [dummyContentItemData.headingContentItem.id]: {
          ...dummyContentItemData.headingContentItem,
          subItemIds: [dummyContentItemData.paragraphContentItem.id],
        },
        [dummyContentItemData.paragraphContentItem.id]: {
          ...dummyContentItemData.paragraphContentItem,
        },
      },
    };
    const removeFromStateAction: t.RemoveFromStateAction = {
      type: t.REMOVE_FROM_STATE,
      payload: {
        id: dummyContentItemData.paragraphContentItem.id,
        context: {
          contextType: t.actionPayloadReducerContextTypes.SUPER,
          contextItemId: dummyContentItemData.headingContentItem.id,
        },
      },
    };
    const nextState: ContentItemsState = {
      byId: {
        [dummyContentItemData.rootContentItem.id]: {
          ...dummyContentItemData.rootContentItem,
          childItemIds: [dummyContentItemData.headingContentItem.id],
        },
        [dummyContentItemData.headingContentItem.id]: {
          ...dummyContentItemData.headingContentItem,
        },
      },
    };
    const resultState: ContentItemsState = reducer(prevState, removeFromStateAction);

    expect(resultState).toEqual(nextState);
    expect(resultState).not.toBe(nextState);
    expect(resultState.byId).not.toBe(nextState.byId);
    expect(resultState.byId[dummyContentItemData.headingContentItem.id]).not.toBe(nextState.byId[dummyContentItemData.headingContentItem.id]);
  });

  it(`removes the contentItem from the state, when the contextType is PARENT`, (): void => {
    const prevState: ContentItemsState = {
      byId: {
        [dummyContentItemData.rootContentItem.id]: {
          ...dummyContentItemData.rootContentItem,
          childItemIds: [dummyContentItemData.headingContentItem.id],
        },
        [dummyContentItemData.headingContentItem.id]: {
          ...dummyContentItemData.headingContentItem,
        },
      },
    };
    const removeFromStateAction: t.RemoveFromStateAction = {
      type: t.REMOVE_FROM_STATE,
      payload: {
        id: dummyContentItemData.headingContentItem.id,
        context: {
          contextType: t.actionPayloadReducerContextTypes.PARENT,
          contextItemId: dummyContentItemData.rootContentItem.id,
        },
      },
    };
    const nextState: ContentItemsState = {
      byId: {
        [dummyContentItemData.rootContentItem.id]: {
          ...dummyContentItemData.rootContentItem,
        },
      },
    };
    const resultState: ContentItemsState = reducer(prevState, removeFromStateAction);

    expect(resultState).toEqual(nextState);
    expect(resultState).not.toBe(nextState);
    expect(resultState.byId).not.toBe(nextState.byId);
    expect(resultState.byId[dummyContentItemData.rootContentItem.id]).not.toBe(nextState.byId[dummyContentItemData.rootContentItem.id]);
  });

  it(`removes all subItems as well, when the contentItem to delete is a superItem`, (): void => {
    const prevState: ContentItemsState = {
      byId: {
        [dummyContentItemData.rootContentItem.id]: {
          ...dummyContentItemData.rootContentItem,
          childItemIds: [dummyContentItemData.headingContentItem.id],
        },
        [dummyContentItemData.headingContentItem.id]: {
          ...dummyContentItemData.headingContentItem,
          subItemIds: [
            dummyContentItemData.paragraphContentItem.id,
            dummyContentItemData.paragraphContentItem2.id,
          ],
        },
        [dummyContentItemData.paragraphContentItem.id]: {
          ...dummyContentItemData.paragraphContentItem,
        },
        [dummyContentItemData.paragraphContentItem2.id]: {
          ...dummyContentItemData.paragraphContentItem2,
          subItemIds: [dummyContentItemData.paragraphContentItem3.id],
        },
        [dummyContentItemData.paragraphContentItem3.id]: {
          ...dummyContentItemData.paragraphContentItem3,
        },
      },
    };
    const removeFromStateAction: t.RemoveFromStateAction = {
      type: t.REMOVE_FROM_STATE,
      payload: {
        id: dummyContentItemData.headingContentItem.id,
        context: {
          contextType: t.actionPayloadReducerContextTypes.PARENT,
          contextItemId: dummyContentItemData.rootContentItem.id,
        },
      },
    };
    const nextState: ContentItemsState = {
      byId: {
        [dummyContentItemData.rootContentItem.id]: {
          ...dummyContentItemData.rootContentItem,
        },
      },
    };
    const resultState: ContentItemsState = reducer(prevState, removeFromStateAction);

    expect(resultState).toEqual(nextState);
  });

  it(`removes all childItems as well, when the contentItem to delete is a parentItem`, (): void => {
    const prevState: ContentItemsState = {
      byId: {
        [dummyContentItemData.rootContentItem.id]: {
          ...dummyContentItemData.rootContentItem,
          childItemIds: [dummyContentItemData.headingContentItem.id],
        },
        [dummyContentItemData.headingContentItem.id]: {
          ...dummyContentItemData.headingContentItem,
          subItemIds: [
            dummyContentItemData.paragraphContentItem.id,
            dummyContentItemData.paragraphContentItem2.id,
          ],
        },
        [dummyContentItemData.paragraphContentItem.id]: {
          ...dummyContentItemData.paragraphContentItem,
        },
        [dummyContentItemData.paragraphContentItem2.id]: {
          ...dummyContentItemData.paragraphContentItem2,
          subItemIds: [dummyContentItemData.paragraphContentItem3.id],
        },
        [dummyContentItemData.paragraphContentItem3.id]: {
          ...dummyContentItemData.paragraphContentItem3,
        },
        [dummyContentItemData.rootContentItem2.id]: {
          ...dummyContentItemData.rootContentItem2,
        },
      },
    };
    const removeFromStateAction: t.RemoveFromStateAction = {
      type: t.REMOVE_FROM_STATE,
      payload: {
        id: dummyContentItemData.rootContentItem.id,
        context: null,
      },
    };
    const nextState: ContentItemsState = {
      byId: {
        [dummyContentItemData.rootContentItem2.id]: {
          ...dummyContentItemData.rootContentItem2,
        },
      },
    };
    const resultState: ContentItemsState = reducer(prevState, removeFromStateAction);

    expect(resultState).toEqual(nextState);
  });

  it(`throws an ObjectNotFoundError, when the contentItem for the passed id cannot be found`, (): void => {
    const prevState: ContentItemsState = {
      byId: {
        [dummyContentItemData.rootContentItem.id]: {
          ...dummyContentItemData.rootContentItem,
          childItemIds: [dummyContentItemData.headingContentItem.id],
        },
        [dummyContentItemData.headingContentItem.id]: {
          ...dummyContentItemData.headingContentItem,
          subItemIds: [dummyContentItemData.paragraphContentItem.id],
        },
        [dummyContentItemData.paragraphContentItem.id]: {
          ...dummyContentItemData.paragraphContentItem,
        },
      },
    };
    const removeFromStateAction: t.RemoveFromStateAction = {
      type: t.REMOVE_FROM_STATE,
      payload: {
        id: 'DefinitelyNotValidId',
        context: {
          contextType: t.actionPayloadReducerContextTypes.SUPER,
          contextItemId: dummyContentItemData.headingContentItem.id,
        },
      },
    };

    expect((): void => {
      reducer(prevState, removeFromStateAction);
    }).toThrow(ObjectNotFoundError);
  });

  it(`throws an ObjectNotFoundError, when the contentItem with id contextItemId cannot be found`, (): void => {
    const prevState: ContentItemsState = {
      byId: {
        [dummyContentItemData.rootContentItem.id]: {
          ...dummyContentItemData.rootContentItem,
          childItemIds: [dummyContentItemData.headingContentItem.id],
        },
        [dummyContentItemData.headingContentItem.id]: {
          ...dummyContentItemData.headingContentItem,
          subItemIds: [dummyContentItemData.paragraphContentItem.id],
        },
        [dummyContentItemData.paragraphContentItem.id]: {
          ...dummyContentItemData.paragraphContentItem,
        },
      },
    };
    const removeFromStateAction: t.RemoveFromStateAction = {
      type: t.REMOVE_FROM_STATE,
      payload: {
        id: dummyContentItemData.paragraphContentItem.id,
        context: {
          contextType: t.actionPayloadReducerContextTypes.SUPER,
          contextItemId: 'DefinitelyNotValidId',
        },
      },
    };

    expect((): void => {
      reducer(prevState, removeFromStateAction);
    }).toThrow(ObjectNotFoundError);
  });

  it(`throws an InvalidArgumentError, when the context is NULL and the contentItem with the passed id is not a rootContentItem`, (): void => {
    const prevState: ContentItemsState = {
      byId: {
        [dummyContentItemData.rootContentItem.id]: {
          ...dummyContentItemData.rootContentItem,
          childItemIds: [dummyContentItemData.headingContentItem.id],
        },
        [dummyContentItemData.headingContentItem.id]: {
          ...dummyContentItemData.headingContentItem,
        },
      },
    };
    const removeFromStateAction: t.RemoveFromStateAction = {
      type: t.REMOVE_FROM_STATE,
      payload: {
        id: dummyContentItemData.headingContentItem.id,
        context: null,
      },
    };

    expect((): void => {
      reducer(prevState, removeFromStateAction);
    }).toThrow(InvalidArgumentError);
  });

  it(`throws an InvalidArgumentError, when the contextType is SUPER and the contentItem with id contextItemId is not a superItem`, (): void => {
    const prevState: ContentItemsState = {
      byId: {
        [dummyContentItemData.rootContentItem.id]: {
          ...dummyContentItemData.rootContentItem,
          childItemIds: [dummyContentItemData.headingContentItem.id],
        },
        [dummyContentItemData.headingContentItem.id]: {
          ...dummyContentItemData.headingContentItem,
          subItemIds: [dummyContentItemData.paragraphContentItem.id],
        },
        [dummyContentItemData.paragraphContentItem.id]: {
          ...dummyContentItemData.paragraphContentItem,
        },
      },
    };
    const removeFromStateAction: t.RemoveFromStateAction = {
      type: t.REMOVE_FROM_STATE,
      payload: {
        id: dummyContentItemData.headingContentItem.id,
        context: {
          contextType: t.actionPayloadReducerContextTypes.SUPER,
          contextItemId: dummyContentItemData.rootContentItem.id,
        },
      },
    };

    expect((): void => {
      reducer(prevState, removeFromStateAction);
    }).toThrow(InvalidArgumentError);
  });

  it(`throws an InvalidArgumentError, when the contextType is SUPER and the contentItem with id contextItemId has no such subItem`, (): void => {
    const prevState: ContentItemsState = {
      byId: {
        [dummyContentItemData.rootContentItem.id]: {
          ...dummyContentItemData.rootContentItem,
          childItemIds: [dummyContentItemData.headingContentItem.id],
        },
        [dummyContentItemData.headingContentItem.id]: {
          ...dummyContentItemData.headingContentItem,
        },
        [dummyContentItemData.paragraphContentItem.id]: {
          ...dummyContentItemData.paragraphContentItem,
        },
      },
    };
    const removeFromStateAction: t.RemoveFromStateAction = {
      type: t.REMOVE_FROM_STATE,
      payload: {
        id: dummyContentItemData.paragraphContentItem.id,
        context: {
          contextType: t.actionPayloadReducerContextTypes.SUPER,
          contextItemId: dummyContentItemData.headingContentItem.id,
        },
      },
    };

    expect((): void => {
      reducer(prevState, removeFromStateAction);
    }).toThrow(InvalidArgumentError);
  });

  it(`throws an InvalidArgumentError, when the contextType is PARENT and the contentItem with id contextItemId is not a containerItem`, (): void => {
    const prevState: ContentItemsState = {
      byId: {
        [dummyContentItemData.rootContentItem.id]: {
          ...dummyContentItemData.rootContentItem,
          childItemIds: [dummyContentItemData.headingContentItem.id],
        },
        [dummyContentItemData.headingContentItem.id]: {
          ...dummyContentItemData.headingContentItem,
          subItemIds: [dummyContentItemData.paragraphContentItem.id],
        },
        [dummyContentItemData.paragraphContentItem.id]: {
          ...dummyContentItemData.paragraphContentItem,
        },
      },
    };
    const removeFromStateAction: t.RemoveFromStateAction = {
      type: t.REMOVE_FROM_STATE,
      payload: {
        id: dummyContentItemData.paragraphContentItem.id,
        context: {
          contextType: t.actionPayloadReducerContextTypes.PARENT,
          contextItemId: dummyContentItemData.headingContentItem.id,
        },
      },
    };

    expect((): void => {
      reducer(prevState, removeFromStateAction);
    }).toThrow(InvalidArgumentError);
  });

  it(`throws an InvalidArgumentError, when the contextType is PARENT and the contentItem with id contextItemId has no such childItem`, (): void => {
    const prevState: ContentItemsState = {
      byId: {
        [dummyContentItemData.rootContentItem.id]: {
          ...dummyContentItemData.rootContentItem,
        },
        [dummyContentItemData.headingContentItem.id]: {
          ...dummyContentItemData.headingContentItem,
          subItemIds: [dummyContentItemData.paragraphContentItem.id],
        },
        [dummyContentItemData.paragraphContentItem.id]: {
          ...dummyContentItemData.paragraphContentItem,
        },
      },
    };
    const removeFromStateAction: t.RemoveFromStateAction = {
      type: t.REMOVE_FROM_STATE,
      payload: {
        id: dummyContentItemData.headingContentItem.id,
        context: {
          contextType: t.actionPayloadReducerContextTypes.PARENT,
          contextItemId: dummyContentItemData.rootContentItem.id,
        },
      },
    };

    expect((): void => {
      reducer(prevState, removeFromStateAction);
    }).toThrow(InvalidArgumentError);
  });

  it(`throws an InvalidArgumentError, when the context.contextType is not a valid actionPayloadReducerContextType`, (): void => {
    const prevState: ContentItemsState = {
      byId: {
        [dummyContentItemData.rootContentItem.id]: {
          ...dummyContentItemData.rootContentItem,
          childItemIds: [dummyContentItemData.headingContentItem.id],
        },
        [dummyContentItemData.headingContentItem.id]: {
          ...dummyContentItemData.headingContentItem,
          subItemIds: [dummyContentItemData.paragraphContentItem.id],
        },
        [dummyContentItemData.paragraphContentItem.id]: {
          ...dummyContentItemData.paragraphContentItem,
        },
      },
    };
    const removeFromStateAction: t.RemoveFromStateAction = {
      type: t.REMOVE_FROM_STATE,
      payload: {
        id: dummyContentItemData.headingContentItem.id,
        context: {
          contextType: ('InvalidContextType': any),
          contextItemId: dummyContentItemData.rootContentItem.id,
        },
      },
    };

    expect((): void => {
      reducer(prevState, removeFromStateAction);
    }).toThrow(InvalidArgumentError);
  });

  it(`throws a CorruptedInternalStateError, when a subItem cannot be found`, (): void => {
    const prevState: ContentItemsState = {
      byId: {
        [dummyContentItemData.rootContentItem.id]: {
          ...dummyContentItemData.rootContentItem,
          childItemIds: [dummyContentItemData.headingContentItem.id],
        },
        [dummyContentItemData.headingContentItem.id]: {
          ...dummyContentItemData.headingContentItem,
          subItemIds: ['DefinitelyNotValidId'],
        },
        [dummyContentItemData.paragraphContentItem.id]: {
          ...dummyContentItemData.paragraphContentItem,
        },
      },
    };
    const removeFromStateAction: t.RemoveFromStateAction = {
      type: t.REMOVE_FROM_STATE,
      payload: {
        id: dummyContentItemData.headingContentItem.id,
        context: {
          contextType: t.actionPayloadReducerContextTypes.SUPER,
          contextItemId: dummyContentItemData.headingContentItem.id,
        },
      },
    };

    expect((): void => {
      reducer(prevState, removeFromStateAction);
    }).toThrow(CorruptedInternalStateError);
  });

  it(`throws a CorruptedInternalStateError, when a childItem cannot be found`, (): void => {
    const prevState: ContentItemsState = {
      byId: {
        [dummyContentItemData.rootContentItem.id]: {
          ...dummyContentItemData.rootContentItem,
          childItemIds: ['DefinitelyNotValidId'],
        },
        [dummyContentItemData.headingContentItem.id]: {
          ...dummyContentItemData.headingContentItem,
          subItemIds: [dummyContentItemData.paragraphContentItem.id],
        },
        [dummyContentItemData.paragraphContentItem.id]: {
          ...dummyContentItemData.paragraphContentItem,
        },
      },
    };
    const removeFromStateAction: t.RemoveFromStateAction = {
      type: t.REMOVE_FROM_STATE,
      payload: {
        id: dummyContentItemData.rootContentItem.id,
        context: null,
      },
    };

    expect((): void => {
      reducer(prevState, removeFromStateAction);
    }).toThrow(CorruptedInternalStateError);
  });

});
