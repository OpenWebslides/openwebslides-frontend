// @flow

import { expectSaga } from 'redux-saga-test-plan';
import CorruptedInternalStateError from 'errors/implementation-errors/CorruptedInternalStateError';
import ObjectNotFoundError from 'errors/usage-errors/ObjectNotFoundError';

import * as t from '../../actionTypes';
import * as m from '../../model';
import * as dummyData from '../../lib/testResources/dummyContentItemData';

import removeSaga from './remove';

describe(`removeSaga`, (): void => {

  let dummyParagraph22: $Exact<m.ParagraphContentItem>;
  let dummyParagraph21: $Exact<m.ParagraphContentItem>;
  let dummyHeading2: $Exact<m.HeadingContentItem>;
  let dummyParagraph122: $Exact<m.ParagraphContentItem>;
  let dummyParagraph121: $Exact<m.ParagraphContentItem>;
  let dummyHeading12: $Exact<m.HeadingContentItem>;
  let dummyParagraph112: $Exact<m.ParagraphContentItem>;
  let dummyParagraph111: $Exact<m.ParagraphContentItem>;
  let dummyHeading11: $Exact<m.HeadingContentItem>;
  let dummyHeading1: $Exact<m.HeadingContentItem>;
  let dummyRoot: $Exact<m.RootContentItem>;
  let dummyContentItemsById: m.ContentItemsById;
  let dummyContentItemsState: m.ContentItemsState;
  let dummyState: Object;

  beforeEach((): void => {
    dummyParagraph22 = { ...dummyData.paragraphContentItem6 };
    dummyParagraph21 = { ...dummyData.paragraphContentItem5 };
    dummyHeading2 = {
      ...dummyData.headingContentItem4,
      subItemIds: [dummyParagraph21.id, dummyParagraph22.id],
    };
    dummyParagraph122 = { ...dummyData.paragraphContentItem4 };
    dummyParagraph121 = { ...dummyData.paragraphContentItem3 };
    dummyHeading12 = {
      ...dummyData.headingContentItem3,
      subItemIds: [dummyParagraph121.id, dummyParagraph122.id],
    };
    dummyParagraph112 = { ...dummyData.paragraphContentItem2 };
    dummyParagraph111 = { ...dummyData.paragraphContentItem };
    dummyHeading11 = {
      ...dummyData.headingContentItem2,
      subItemIds: [dummyParagraph111.id, dummyParagraph112.id],
    };
    dummyHeading1 = {
      ...dummyData.headingContentItem,
      subItemIds: [dummyHeading11.id, dummyHeading12.id],
    };
    dummyRoot = {
      ...dummyData.rootContentItem,
      childItemIds: [dummyHeading1.id, dummyHeading2.id],
    };
    dummyContentItemsById = {
      [dummyRoot.id]: dummyRoot,
      [dummyHeading1.id]: dummyHeading1,
      [dummyHeading11.id]: dummyHeading11,
      [dummyParagraph111.id]: dummyParagraph111,
      [dummyParagraph112.id]: dummyParagraph112,
      [dummyHeading12.id]: dummyHeading12,
      [dummyParagraph121.id]: dummyParagraph121,
      [dummyParagraph122.id]: dummyParagraph122,
      [dummyHeading2.id]: dummyHeading2,
      [dummyParagraph21.id]: dummyParagraph21,
      [dummyParagraph22.id]: dummyParagraph22,
    };
    dummyContentItemsState = { byId: dummyContentItemsById };
    dummyState = { modules: { contentItems: dummyContentItemsState } };
  });

  it(`puts a REMOVE_FROM_STATE action`, (): void => {
    const dummyRemoveAction: t.RemoveAction = {
      type: t.REMOVE,
      payload: {
        id: dummyParagraph111.id,
      },
    };

    return expectSaga(removeSaga, dummyRemoveAction)
      .withState(dummyState)
      .put.like({
        action: {
          type: t.REMOVE_FROM_STATE,
          payload: {
            id: dummyParagraph111.id,
          },
        },
      })
      .run();
  });

  it(`puts MOVE actions to move its subItems to the end of the previous HEADING, when the contentItem is a HEADING and its previousSibling is also a HEADING`, (): void => {
    const dummyRemoveAction: t.RemoveAction = {
      type: t.REMOVE,
      payload: {
        id: dummyHeading12.id,
      },
    };

    return expectSaga(removeSaga, dummyRemoveAction)
      .withState(dummyState)
      .put.like({
        action: {
          type: t.MOVE,
          payload: {
            id: dummyParagraph122.id,
            nextContext: {
              contextType: m.contextTypes.SUPER,
              contextItemId: dummyHeading11.id,
              indexInSiblingItems: 2,
            },
          },
        },
      })
      .put.like({
        action: {
          type: t.MOVE,
          payload: {
            id: dummyParagraph121.id,
            nextContext: {
              contextType: m.contextTypes.SUPER,
              contextItemId: dummyHeading11.id,
              indexInSiblingItems: 2,
            },
          },
        },
      })
      .put.like({
        action: {
          type: t.REMOVE_FROM_STATE,
          payload: {
            id: dummyHeading12.id,
          },
        },
      })
      .run();
  });

  it(`puts MOVE actions to move its subItems to its own previous location, when the contentItem is a HEADING and its previousSibling is not a HEADING`, (): void => {
    const dummyRemoveAction: t.RemoveAction = {
      type: t.REMOVE,
      payload: {
        id: dummyHeading11.id,
      },
    };

    return expectSaga(removeSaga, dummyRemoveAction)
      .withState(dummyState)
      .put.like({
        action: {
          type: t.MOVE,
          payload: {
            id: dummyParagraph112.id,
            nextContext: {
              contextType: m.contextTypes.SUPER,
              contextItemId: dummyHeading1.id,
              indexInSiblingItems: 0,
            },
          },
        },
      })
      .put.like({
        action: {
          type: t.MOVE,
          payload: {
            id: dummyParagraph111.id,
            nextContext: {
              contextType: m.contextTypes.SUPER,
              contextItemId: dummyHeading1.id,
              indexInSiblingItems: 0,
            },
          },
        },
      })
      .put.like({
        action: {
          type: t.REMOVE_FROM_STATE,
          payload: {
            id: dummyHeading11.id,
          },
        },
      })
      .run();
  });

  it(`does not put any MOVE actions, when the contentItem is not a HEADING`, (): void => {
    const dummyRemoveAction: t.RemoveAction = {
      type: t.REMOVE,
      payload: {
        id: dummyParagraph111.id,
      },
    };
    return expectSaga(removeSaga, dummyRemoveAction)
      .withState(dummyState)
      .not.put.actionType(t.MOVE)
      .run();
  });

  it(`throws an ObjectNotFoundError, when the contentItem for the passed id cannot be found`, async (): Promise<*> => {
    const dummyRemoveAction: t.RemoveAction = {
      type: t.REMOVE,
      payload: {
        id: 'DefinitelyNotValidId',
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

  it(`throws a CorruptedInternalStateError, when the passed contentItemsById structure is corrupted`, async (): Promise<*> => {
    dummyHeading1.subItemIds = [dummyHeading12.id];

    const dummyRemoveAction: t.RemoveAction = {
      type: t.REMOVE,
      payload: {
        id: dummyHeading11.id,
      },
    };

    // Suppress console.error from redux-saga $FlowFixMe
    console.error = jest.fn();
    await expect(
      expectSaga(removeSaga, dummyRemoveAction)
        .withState(dummyState)
        .run(),
    ).rejects.toBeInstanceOf(CorruptedInternalStateError);
  });

});
