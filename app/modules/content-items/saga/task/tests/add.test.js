// @flow

import { select } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';
import CorruptedInternalStateError from 'errors/implementation-errors/CorruptedInternalStateError';
import InvalidArgumentError from 'errors/implementation-errors/InvalidArgumentError';
import ObjectNotFoundError from 'errors/usage-errors/ObjectNotFoundError';

import * as t from '../../../actionTypes';
import { getParentOrSuperById } from '../../../selectors';
import {
  contentItemTypes,
  contextTypes,
} from '../../../model';
import type {
  RootContentItem,
  HeadingContentItem,
  ParagraphContentItem,
  ContentItemsById,
} from '../../../model';
import * as dummyContentItemData from '../../../lib/test-resources/dummyContentItemData';

import addSaga, { convertContextToAncestorContext } from '../add';

describe(`addSaga`, (): void => {

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
  const dummyState: any = {
    modules: {
      contentItems: {
        byId: dummyContentItemsById,
      },
    },
  };

  it(`puts an addToState action`, (): void => {
    const dummyAddAction: t.AddAction = {
      type: t.ADD,
      payload: {
        type: contentItemTypes.PARAGRAPH,
        context: {
          contextType: contextTypes.SUPER,
          contextItemId: dummyHeading1.id,
          positionInSiblings: 0,
        },
        propsForType: {
          text: 'Lorem ipsum dolor sit amet.',
        },
      },
    };
    return expectSaga(addSaga, dummyAddAction)
      .withState(dummyState)
      .put.like({
        action: {
          type: t.ADD_TO_STATE,
          payload: {
            type: dummyAddAction.payload.type,
            context: dummyAddAction.payload.context,
            propsForType: dummyAddAction.payload.propsForType,
          },
        },
      })
      .run();
  });

  it(`puts a toggleEditing action`, (): void => {
    const dummyAddAction: t.AddAction = {
      type: t.ADD,
      payload: {
        type: contentItemTypes.PARAGRAPH,
        context: {
          contextType: contextTypes.SUPER,
          contextItemId: dummyHeading1.id,
          positionInSiblings: 0,
        },
        propsForType: {
          text: 'Lorem ipsum dolor sit amet.',
        },
      },
    };
    return expectSaga(addSaga, dummyAddAction)
      .withState(dummyState)
      .put.actionType(t.TOGGLE_EDITING)
      .run();
  });

  it(`sets the context to NULL, if it was NULL or UNDEFINED`, (): void => {
    const dummyAddAction: t.AddAction = {
      type: t.ADD,
      payload: {
        type: contentItemTypes.ROOT,
        context: undefined,
        propsForType: {},
      },
    };
    return expectSaga(addSaga, dummyAddAction)
      .withState(dummyState)
      .put.like({
        action: {
          type: t.ADD_TO_STATE,
          payload: {
            type: dummyAddAction.payload.type,
            context: null,
            propsForType: dummyAddAction.payload.propsForType,
          },
        },
      })
      .run();
  });

  it(`converts a context with contextType.SIBLING to a context with contextType.PARENT, when the contentItem with id context.contextItemId is a childItem`, (): void => {
    const dummyAddAction: t.AddAction = {
      type: t.ADD,
      payload: {
        type: contentItemTypes.HEADING,
        context: {
          contextType: contextTypes.SIBLING,
          contextItemId: dummyHeading1.id,
          positionInSiblings: 0,
        },
        propsForType: {
          text: 'Lorem ipsum',
        },
      },
    };
    return expectSaga(addSaga, dummyAddAction)
      .withState(dummyState)
      .put.like({
        action: {
          type: t.ADD_TO_STATE,
          payload: {
            type: dummyAddAction.payload.type,
            context: {
              contextType: contextTypes.PARENT,
              contextItemId: dummyRoot.id,
              positionInSiblings: 1,
            },
            propsForType: dummyAddAction.payload.propsForType,
          },
        },
      })
      .run();
  });

  it(`converts a context with contextType.SIBLING to a context with contextType.SUPER, when the contentItem with id context.contextItemId is a subItem`, (): void => {
    const dummyAddAction: t.AddAction = {
      type: t.ADD,
      payload: {
        type: contentItemTypes.PARAGRAPH,
        context: {
          contextType: contextTypes.SIBLING,
          contextItemId: dummyParagraph4.id,
          positionInSiblings: 0,
        },
        propsForType: {
          text: 'Lorem ipsum',
        },
      },
    };
    return expectSaga(addSaga, dummyAddAction)
      .withState(dummyState)
      .put.like({
        action: {
          type: t.ADD_TO_STATE,
          payload: {
            type: dummyAddAction.payload.type,
            context: {
              contextType: contextTypes.SUPER,
              contextItemId: dummyHeading2.id,
              positionInSiblings: 2,
            },
            propsForType: dummyAddAction.payload.propsForType,
          },
        },
      })
      .run();
  });

  describe(`convertContextToAncestorContext`, (): void => {

    it(`correctly calculates absolute positionInSiblings from relative positionInSiblings, when relative positionInSiblings is a positive number different from 0`, (): void => {
      const dummySagaContext = {
        contextType: contextTypes.SIBLING,
        contextItemId: dummyHeading1.id,
        positionInSiblings: 1,
      };
      const expectedAncestorContext = {
        contextType: contextTypes.PARENT,
        contextItemId: dummyRoot.id,
        positionInSiblings: 2,
      };
      return expectSaga(convertContextToAncestorContext, dummySagaContext)
        .withState(dummyState)
        .returns(expectedAncestorContext)
        .run();
    });

    it(`correctly calculates absolute positionInSiblings from relative positionInSiblings, when relative positionInSiblings is a negative number`, (): void => {
      const dummySagaContext = {
        contextType: contextTypes.SIBLING,
        contextItemId: dummyHeading2.id,
        positionInSiblings: -1,
      };
      const expectedAncestorContext = {
        contextType: contextTypes.PARENT,
        contextItemId: dummyRoot.id,
        positionInSiblings: 1,
      };
      return expectSaga(convertContextToAncestorContext, dummySagaContext)
        .withState(dummyState)
        .returns(expectedAncestorContext)
        .run();
    });

    it(`throws an ObjectNotFoundError, when the contentItem with id context.contextItemId could not be found`, async (): Promise<*> => {
      const dummySagaContext = {
        contextType: contextTypes.SIBLING,
        contextItemId: 'DefinitelyNotValidId',
        positionInSiblings: 0,
      };
      // Suppress console.error from redux-saga $FlowFixMe
      console.error = jest.fn();
      await expect(
        expectSaga(convertContextToAncestorContext, dummySagaContext)
          .withState(dummyState)
          .run(),
      ).rejects.toBeInstanceOf(ObjectNotFoundError);
    });

    it(`throws an InvalidArgumentError, when the calculated absolute positionInSiblings is less than 0`, async (): Promise<*> => {
      const dummySagaContext = {
        contextType: contextTypes.SIBLING,
        contextItemId: dummyHeading1.id,
        positionInSiblings: -2,
      };
      // Suppress console.error from redux-saga $FlowFixMe
      console.error = jest.fn();
      await expect(
        expectSaga(convertContextToAncestorContext, dummySagaContext)
          .withState(dummyState)
          .run(),
      ).rejects.toBeInstanceOf(InvalidArgumentError);
    });

    it(`throws an InvalidArgumentError, when the calculated absolute positionInSiblings is greater than the length of the siblings array`, async (): Promise<*> => {
      const dummySagaContext = {
        contextType: contextTypes.SIBLING,
        contextItemId: dummyHeading1.id,
        positionInSiblings: 2,
      };
      // Suppress console.error from redux-saga $FlowFixMe
      console.error = jest.fn();
      await expect(
        expectSaga(convertContextToAncestorContext, dummySagaContext)
          .withState(dummyState)
          .run(),
      ).rejects.toBeInstanceOf(InvalidArgumentError);
    });

    it(`throws a CorruptedInternalStateError if the selected parentOrSuperItem is neither subable nor a container, which shouldn't happen in normal circumstances`, async (): Promise<*> => {
      const dummySagaContext = {
        contextType: contextTypes.SIBLING,
        contextItemId: dummyHeading1.id,
        positionInSiblings: 0,
      };
      // Suppress console.error from redux-saga $FlowFixMe
      console.error = jest.fn();
      await expect(
        expectSaga(convertContextToAncestorContext, dummySagaContext)
          .provide([
            [
              select(getParentOrSuperById, { id: dummyHeading1.id }),
              dummyContentItemData.courseBreakContentItem,
            ],
          ])
          .run(),
      ).rejects.toBeInstanceOf(CorruptedInternalStateError);
    });

  });

});
