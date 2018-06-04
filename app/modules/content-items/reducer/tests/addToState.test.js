// @flow

import InvalidArgumentError from 'errors/implementation-errors/InvalidArgumentError';
import NotYetImplementedError from 'errors/implementation-errors/NotYetImplementedError';
import ObjectNotFoundError from 'errors/usage-errors/ObjectNotFoundError';

import reducer from '../../reducer';
import * as t from '../../actionTypes';
import { contentItemTypes } from '../../model';
import type {
  RootContentItem,
  HeadingContentItem,
  ParagraphContentItem,
  ContentItemsById,
  ContentItemsState,
} from '../../model';
import * as dummyContentItemData from '../../lib/test-resources/dummyContentItemData';

describe(`ADD_TO_STATE`, (): void => {

  const dummyParagraph4: $Exact<ParagraphContentItem> = {
    ...dummyContentItemData.paragraphContentItem4,
  };
  const dummyParagraph3: $Exact<ParagraphContentItem> = {
    ...dummyContentItemData.paragraphContentItem3,
  };
  const dummyHeading2: $Exact<HeadingContentItem> = {
    ...dummyContentItemData.headingContentItem2,
    subItemIds: [dummyParagraph3.id, dummyParagraph4.id],
  };
  const dummyParagraph2: $Exact<ParagraphContentItem> = {
    ...dummyContentItemData.paragraphContentItem2,
  };
  const dummyParagraph1: $Exact<ParagraphContentItem> = {
    ...dummyContentItemData.paragraphContentItem,
  };
  const dummyHeading1: $Exact<HeadingContentItem> = {
    ...dummyContentItemData.headingContentItem,
    subItemIds: [dummyParagraph1.id, dummyParagraph2.id],
  };
  const dummyRoot: $Exact<RootContentItem> = {
    ...dummyContentItemData.rootContentItem,
    childItemIds: [dummyHeading1.id, dummyHeading2.id],
  };
  const dummyContentItemsById: $Exact<ContentItemsById> = {
    [dummyRoot.id]: dummyRoot,
    [dummyHeading1.id]: dummyHeading1,
    [dummyParagraph1.id]: dummyParagraph1,
    [dummyParagraph2.id]: dummyParagraph2,
    [dummyHeading2.id]: dummyHeading2,
    [dummyParagraph3.id]: dummyParagraph3,
    [dummyParagraph4.id]: dummyParagraph4,
  };

  const dummyNewRoot: $Exact<RootContentItem> = {
    ...dummyContentItemData.rootContentItem2,
  };
  const dummyNewHeading: $Exact<HeadingContentItem> = {
    ...dummyContentItemData.headingContentItem3,
  };
  const dummyNewParagraph: $Exact<ParagraphContentItem> = {
    ...dummyContentItemData.paragraphContentItem5,
  };

  it(`adds a HeadingContentItem to the state, when the type is HEADING and the passed props are valid`, (): void => {
    const prevState: ContentItemsState = {
      byId: dummyContentItemsById,
    };
    const addToStateAction: t.AddToStateAction = {
      type: t.ADD_TO_STATE,
      payload: {
        id: dummyNewHeading.id,
        type: contentItemTypes.HEADING,
        context: {
          contextType: t.actionPayloadReducerContextTypes.PARENT,
          contextItemId: dummyRoot.id,
          positionInSiblings: 2,
        },
        propsForType: {
          text: dummyNewHeading.text,
        },
      },
    };
    const nextState: ContentItemsState = {
      byId: {
        ...dummyContentItemsById,
        [dummyRoot.id]: {
          ...dummyRoot,
          childItemIds: [dummyHeading1.id, dummyHeading2.id, dummyNewHeading.id],
        },
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
      byId: dummyContentItemsById,
    };
    const addToStateAction: t.AddToStateAction = {
      type: t.ADD_TO_STATE,
      payload: {
        id: dummyNewParagraph.id,
        type: contentItemTypes.PARAGRAPH,
        context: {
          contextType: t.actionPayloadReducerContextTypes.SUPER,
          contextItemId: dummyHeading1.id,
          positionInSiblings: 1,
        },
        propsForType: {
          text: dummyNewParagraph.text,
        },
      },
    };
    const nextState: ContentItemsState = {
      byId: {
        ...dummyContentItemsById,
        [dummyHeading1.id]: {
          ...dummyHeading1,
          subItemIds: [dummyParagraph1.id, dummyNewParagraph.id, dummyParagraph2.id],
        },
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
      byId: dummyContentItemsById,
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
        ...dummyContentItemsById,
        [dummyNewRoot.id]: dummyNewRoot,
      },
    };
    const resultState: ContentItemsState = reducer(prevState, addToStateAction);

    expect(resultState).toEqual(nextState);
    expect(resultState).not.toBe(nextState);
    expect(resultState.byId).not.toBe(prevState.byId);
  });

  it(`uses a default of 0 for context.positionInSiblings, when context.positionInSiblings is not set`, (): void => {
    const prevState: ContentItemsState = {
      byId: dummyContentItemsById,
    };
    const addToStateAction: t.AddToStateAction = {
      type: t.ADD_TO_STATE,
      payload: {
        id: dummyNewParagraph.id,
        type: contentItemTypes.PARAGRAPH,
        context: {
          contextType: t.actionPayloadReducerContextTypes.SUPER,
          contextItemId: dummyHeading1.id,
        },
        propsForType: {
          text: dummyNewParagraph.text,
        },
      },
    };
    const nextState: ContentItemsState = {
      byId: {
        ...dummyContentItemsById,
        [dummyHeading1.id]: {
          ...dummyHeading1,
          subItemIds: [dummyNewParagraph.id, dummyParagraph1.id, dummyParagraph2.id],
        },
        [dummyNewParagraph.id]: dummyNewParagraph,
      },
    };
    const resultState: ContentItemsState = reducer(prevState, addToStateAction);

    expect(resultState).toEqual(nextState);
  });

  it(`throws an InvalidArgumentError, when the type is not a valid contentItemType`, (): void => {
    const prevState: ContentItemsState = {
      byId: dummyContentItemsById,
    };
    const addToStateAction: any = {
      type: t.ADD_TO_STATE,
      payload: {
        id: 'abcdefghijklmnopqrst',
        type: 'DEFINITELY_NOT_A_VALID_TYPE',
        context: {
          contextType: t.actionPayloadReducerContextTypes.SUPER,
          contextItemId: dummyHeading1.id,
          positionInSiblings: 1,
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
      byId: dummyContentItemsById,
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

  it(`throws an ObjectNotFoundError, when the contentItem with id context.contextItemId could not be found`, (): void => {
    const prevState: ContentItemsState = {
      byId: dummyContentItemsById,
    };
    const addToStateAction: any = {
      type: t.ADD_TO_STATE,
      payload: {
        id: dummyNewParagraph.id,
        type: contentItemTypes.PARAGRAPH,
        context: {
          contextType: t.actionPayloadReducerContextTypes.SUPER,
          contextItemId: 'ThisIsAVeryInvalidId',
          positionInSiblings: 1,
        },
        propsForType: {
          text: dummyNewParagraph.text,
        },
      },
    };
    expect((): void => {
      reducer(prevState, addToStateAction);
    }).toThrow(ObjectNotFoundError);
  });

  it(`throws an InvalidArgumentError, when the context.contextType is PARENT, but the contentItem with id context.contextItemId is not a container`, (): void => {
    const prevState: ContentItemsState = {
      byId: dummyContentItemsById,
    };
    const addToStateAction: any = {
      type: t.ADD_TO_STATE,
      payload: {
        id: dummyNewParagraph.id,
        type: contentItemTypes.PARAGRAPH,
        context: {
          contextType: t.actionPayloadReducerContextTypes.PARENT,
          contextItemId: dummyHeading1.id,
          positionInSiblings: 1,
        },
        propsForType: {
          text: dummyNewParagraph.text,
        },
      },
    };
    expect((): void => {
      reducer(prevState, addToStateAction);
    }).toThrow(InvalidArgumentError);
  });

  it(`throws an InvalidArgumentError, when the context.contextType is SUPER, but the contentItem with id context.contextItemId is not subable`, (): void => {
    const prevState: ContentItemsState = {
      byId: dummyContentItemsById,
    };
    const addToStateAction: any = {
      type: t.ADD_TO_STATE,
      payload: {
        id: dummyNewParagraph.id,
        type: contentItemTypes.PARAGRAPH,
        context: {
          contextType: t.actionPayloadReducerContextTypes.SUPER,
          contextItemId: dummyRoot.id,
          positionInSiblings: 1,
        },
        propsForType: {
          text: dummyNewParagraph.text,
        },
      },
    };
    expect((): void => {
      reducer(prevState, addToStateAction);
    }).toThrow(InvalidArgumentError);
  });

  it(`throws an InvalidArgumentError, when the context.contextType is not a valid actionPayloadReducerContextType`, (): void => {
    const prevState: ContentItemsState = {
      byId: dummyContentItemsById,
    };
    const addToStateAction: any = {
      type: t.ADD_TO_STATE,
      payload: {
        id: dummyNewParagraph.id,
        type: contentItemTypes.PARAGRAPH,
        context: {
          contextType: 'InvalidContextType',
          contextItemId: dummyHeading1.id,
          positionInSiblings: 1,
        },
        propsForType: {
          text: dummyNewParagraph.text,
        },
      },
    };
    expect((): void => {
      reducer(prevState, addToStateAction);
    }).toThrow(InvalidArgumentError);
  });

  it(`temporarily throws a NotYetImplementedError, when the type is anything other than HEADING or PARAGRAPH`, (): void => {
    const prevState: ContentItemsState = {
      byId: dummyContentItemsById,
    };
    const addToStateAction: t.AddToStateAction = {
      type: t.ADD_TO_STATE,
      payload: {
        id: 'abcdefghijklmnopqrst',
        type: contentItemTypes.LIST,
        context: {
          contextType: t.actionPayloadReducerContextTypes.SUPER,
          contextItemId: dummyHeading1.id,
          positionInSiblings: 1,
        },
        propsForType: {},
      },
    };
    expect((): void => {
      reducer(prevState, addToStateAction);
    }).toThrow(NotYetImplementedError);
  });

});
