// @flow

import { expectSaga } from 'redux-saga-test-plan';
import CorruptedInternalStateError from 'errors/implementation-errors/CorruptedInternalStateError';
import ObjectNotFoundError from 'errors/usage-errors/ObjectNotFoundError';

import * as t from '../../../actionTypes';
import type {
  RootContentItem,
  HeadingContentItem,
  ParagraphContentItem,
  ContentItemsById,
} from '../../../model';
import * as dummyContentItemData from '../../../lib/test-resources/dummyContentItemData';

import removeSaga from '../remove';

describe(`removeSaga`, (): void => {

  let dummyParagraph: $Exact<ParagraphContentItem>;
  let dummyHeading: $Exact<HeadingContentItem>;
  let dummyRoot: $Exact<RootContentItem>;
  let dummyContentItemsById: $Exact<ContentItemsById>;
  let dummyState: any;

  beforeEach((): void => {
    dummyParagraph = {
      ...dummyContentItemData.paragraphContentItem,
    };
    dummyHeading = {
      ...dummyContentItemData.headingContentItem,
      subItemIds: [dummyParagraph.id],
    };
    dummyRoot = {
      ...dummyContentItemData.rootContentItem,
      childItemIds: [dummyHeading.id],
    };
    dummyContentItemsById = {
      [dummyRoot.id]: dummyRoot,
      [dummyHeading.id]: dummyHeading,
      [dummyParagraph.id]: dummyParagraph,
    };
    dummyState = {
      modules: {
        contentItems: {
          byId: dummyContentItemsById,
        },
      },
    };
  });

  it(`puts a removeFromState action`, (): void => {
    const dummyRemoveAction: t.RemoveAction = {
      type: t.REMOVE,
      payload: {
        id: dummyParagraph.id,
      },
    };
    return expectSaga(removeSaga, dummyRemoveAction)
      .withState(dummyState)
      .put.like({
        action: {
          type: t.REMOVE_FROM_STATE,
          payload: {
            id: dummyParagraph.id,
          },
        },
      })
      .run();
  });

  it(`passes on the correct context, when the contentItem to delete is a subItem`, (): void => {
    const dummyRemoveAction: t.RemoveAction = {
      type: t.REMOVE,
      payload: {
        id: dummyParagraph.id,
      },
    };
    return expectSaga(removeSaga, dummyRemoveAction)
      .withState(dummyState)
      .put.like({
        action: {
          type: t.REMOVE_FROM_STATE,
          payload: {
            id: dummyParagraph.id,
            context: {
              contextType: t.actionPayloadReducerContextTypes.SUPER,
              contextItemId: dummyHeading.id,
            },
          },
        },
      })
      .run();
  });

  it(`passes on the correct context, when the contentItem to delete is a childItem`, (): void => {
    const dummyRemoveAction: t.RemoveAction = {
      type: t.REMOVE,
      payload: {
        id: dummyHeading.id,
      },
    };
    return expectSaga(removeSaga, dummyRemoveAction)
      .withState(dummyState)
      .put.like({
        action: {
          type: t.REMOVE_FROM_STATE,
          payload: {
            id: dummyHeading.id,
            context: {
              contextType: t.actionPayloadReducerContextTypes.PARENT,
              contextItemId: dummyRoot.id,
            },
          },
        },
      })
      .run();
  });

  it(`passes on the correct context, when the contentItem to delete is a ROOT`, (): void => {
    const dummyRemoveAction: t.RemoveAction = {
      type: t.REMOVE,
      payload: {
        id: dummyRoot.id,
      },
    };
    return expectSaga(removeSaga, dummyRemoveAction)
      .withState(dummyState)
      .put.like({
        action: {
          type: t.REMOVE_FROM_STATE,
          payload: {
            id: dummyRoot.id,
            context: null,
          },
        },
      })
      .run();
  });

  it(`throws an ObjectNotFoundError, when the contentItem for the passed id cannot be found`, async (): Promise<*> => {
    const dummyRemoveAction: t.RemoveAction = {
      type: t.REMOVE,
      payload: {
        id: 'ThisIdIsNotVeryValid',
      },
    };

    // Suppress console.error from redux-saga $FlowFixMe
    console.error = jest.fn();
    await expect(
      expectSaga(removeSaga, dummyRemoveAction)
        .withState(dummyState)
        .run(),
    ).rejects.toBeInstanceOf(ObjectNotFoundError);
  });

  it(`throws a CorruptedInternalStateError, when a parent or super item cannot be found for a non-root contentItem`, async (): Promise<*> => {
    const dummyInvalidState: any = {
      modules: {
        contentItems: {
          byId: {
            [dummyParagraph.id]: dummyParagraph,
          },
        },
      },
    };
    const dummyRemoveAction: t.RemoveAction = {
      type: t.REMOVE,
      payload: {
        id: dummyParagraph.id,
      },
    };

    // Suppress console.error from redux-saga $FlowFixMe
    console.error = jest.fn();
    await expect(
      expectSaga(removeSaga, dummyRemoveAction)
        .withState(dummyInvalidState)
        .run(),
    ).rejects.toBeInstanceOf(CorruptedInternalStateError);
  });

});
