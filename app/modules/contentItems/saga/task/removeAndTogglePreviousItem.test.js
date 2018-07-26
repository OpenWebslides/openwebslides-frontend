// @flow

import { expectSaga } from 'redux-saga-test-plan';

import { ObjectNotFoundError } from 'errors';
import { dummyContentItemData as dummyData } from 'lib/testResources';

import * as a from '../../actionTypes';
import * as m from '../../model';

import removeAndTogglePreviousItemSaga from './removeAndTogglePreviousItem';

describe(`removeAndTogglePreviousItemSaga`, (): void => {

  let dummyParagraph11: $Exact<m.ParagraphContentItem>;
  let dummyHeading1: $Exact<m.HeadingContentItem>;
  let dummyRoot: $Exact<m.RootContentItem>;
  let dummyContentItemsById: $Exact<m.ContentItemsById>;
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

  it(`puts a REMOVE action`, (): void => {
    const dummyRemoveAndTogglePreviousItemAction: a.RemoveAndTogglePreviousItemAction = {
      type: a.REMOVE_AND_TOGGLE_PREVIOUS_ITEM,
      payload: {
        id: dummyParagraph11.id,
      },
    };
    return expectSaga(removeAndTogglePreviousItemSaga, dummyRemoveAndTogglePreviousItemAction)
      .withState(dummyState)
      .put.like({
        action: {
          type: a.REMOVE,
          payload: {
            id: dummyParagraph11.id,
          },
        },
      })
      .run();
  });

  it(`puts a TOGGLE_EDITING action which moves the isEditing state to the removed contentItem's previousEditorItem, when the removed contentItem has a previousEditorItem`, (): void => {
    const dummyRemoveAndTogglePreviousItemAction: a.RemoveAndTogglePreviousItemAction = {
      type: a.REMOVE_AND_TOGGLE_PREVIOUS_ITEM,
      payload: {
        id: dummyParagraph11.id,
      },
    };
    return expectSaga(removeAndTogglePreviousItemSaga, dummyRemoveAndTogglePreviousItemAction)
      .withState(dummyState)
      .put.like({
        action: {
          type: a.TOGGLE_EDITING,
          payload: {
            id: dummyHeading1.id,
            isEditing: true,
          },
        },
      })
      .run();
  });

  it(`does not put a TOGGLE_EDITING action, when the removed contentItem does not have a previousEditorItem`, (): void => {
    const dummyRemoveAndTogglePreviousItemAction: a.RemoveAndTogglePreviousItemAction = {
      type: a.REMOVE_AND_TOGGLE_PREVIOUS_ITEM,
      payload: {
        id: dummyRoot.id,
      },
    };
    return expectSaga(removeAndTogglePreviousItemSaga, dummyRemoveAndTogglePreviousItemAction)
      .withState(dummyState)
      .not.put.actionType(a.TOGGLE_EDITING)
      .run();
  });

  it(`throws an ObjectNotFoundError, when the contentItem for the passed id cannot be found`, async (): Promise<mixed> => {
    const dummyRemoveAndTogglePreviousItemAction: a.RemoveAndTogglePreviousItemAction = {
      type: a.REMOVE_AND_TOGGLE_PREVIOUS_ITEM,
      payload: {
        id: 'ThisIdIsNotVeryValid',
      },
    };

    // Suppress console.error from redux-saga $FlowFixMe
    console.error = jest.fn();
    await expect(
      expectSaga(removeAndTogglePreviousItemSaga, dummyRemoveAndTogglePreviousItemAction)
        .withState(dummyState)
        .run(),
    ).rejects.toBeInstanceOf(ObjectNotFoundError);
  });

});
