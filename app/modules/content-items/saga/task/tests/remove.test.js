// @flow

import { expectSaga } from 'redux-saga-test-plan';
import CorruptedInternalStateError from 'errors/implementation-errors/CorruptedInternalStateError';
import ObjectNotFoundError from 'errors/usage-errors/ObjectNotFoundError';

import * as t from '../../../actionTypes';
import {
  contextTypes,
} from '../../../model';
import type {
  RootContentItem,
  HeadingContentItem,
  ParagraphContentItem,
  ContentItemsById,
} from '../../../model';
import * as dummyData from '../../../lib/test-resources/dummyContentItemData';

import removeSaga from '../remove';

describe(`removeSaga`, (): void => {

  let dummyParagraph11: $Exact<ParagraphContentItem>;
  let dummyHeading1: $Exact<HeadingContentItem>;
  let dummyRoot: $Exact<RootContentItem>;
  let dummyContentItemsById: $Exact<ContentItemsById>;
  let dummyState: any;

  beforeEach((): void => {
    dummyParagraph11 = { ...dummyData.paragraphContentItem };
    dummyHeading1 = {
      ...dummyData.headingContentItem,
      subItemIds: [dummyParagraph11.id],
    };
    dummyRoot = {
      ...dummyData.rootContentItem,
      childItemIds: [dummyHeading1.id],
    };
    dummyContentItemsById = {
      [dummyRoot.id]: dummyRoot,
      [dummyHeading1.id]: dummyHeading1,
      [dummyParagraph11.id]: dummyParagraph11,
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
        id: dummyParagraph11.id,
      },
    };
    return expectSaga(removeSaga, dummyRemoveAction)
      .withState(dummyState)
      .put.like({
        action: {
          type: t.REMOVE_FROM_STATE,
          payload: {
            id: dummyParagraph11.id,
          },
        },
      })
      .run();
  });

  it(`passes on the correct context, when the contentItem to delete is a subItem`, (): void => {
    const dummyRemoveAction: t.RemoveAction = {
      type: t.REMOVE,
      payload: {
        id: dummyParagraph11.id,
      },
    };
    return expectSaga(removeSaga, dummyRemoveAction)
      .withState(dummyState)
      .put.like({
        action: {
          type: t.REMOVE_FROM_STATE,
          payload: {
            id: dummyParagraph11.id,
            context: {
              contextType: contextTypes.SUPER,
              contextItemId: dummyHeading1.id,
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
        id: dummyHeading1.id,
      },
    };
    return expectSaga(removeSaga, dummyRemoveAction)
      .withState(dummyState)
      .put.like({
        action: {
          type: t.REMOVE_FROM_STATE,
          payload: {
            id: dummyHeading1.id,
            context: {
              contextType: contextTypes.PARENT,
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
            [dummyParagraph11.id]: dummyParagraph11,
          },
        },
      },
    };
    const dummyRemoveAction: t.RemoveAction = {
      type: t.REMOVE,
      payload: {
        id: dummyParagraph11.id,
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
