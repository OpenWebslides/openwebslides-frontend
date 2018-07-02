// @flow

import { expectSaga, testSaga } from 'redux-saga-test-plan';
import NotYetImplementedError from 'errors/implementation-errors/NotYetImplementedError';
import ObjectNotFoundError from 'errors/usage-errors/ObjectNotFoundError';

import * as t from '../../actionTypes';
import type { EditAction } from '../../actionTypes';
import type {
  RootContentItem,
  HeadingContentItem,
  ParagraphContentItem,
  ContentItemsById,
  ContentItemsState,
} from '../../model';
import selectors from '../../selectors';
import * as dummyData from '../../lib/testResources/dummyContentItemData';

import editSaga from './edit';

describe(`editSaga`, (): void => {

  let dummyParagraph12: $Exact<ParagraphContentItem>;
  let dummyParagraph11: $Exact<ParagraphContentItem>;
  let dummyHeading1: $Exact<HeadingContentItem>;
  let dummyRoot: $Exact<RootContentItem>;
  let dummyContentItemsById: ContentItemsById;
  let dummyContentItemsState: ContentItemsState;
  let dummyState: any;

  beforeEach((): void => {
    dummyParagraph12 = { ...dummyData.paragraphContentItem2 };
    dummyParagraph11 = { ...dummyData.paragraphContentItem };
    dummyHeading1 = {
      ...dummyData.headingContentItem,
      subItemIds: [dummyParagraph11.id, dummyParagraph12.id],
    };
    dummyRoot = {
      ...dummyData.rootContentItem,
      childItemIds: [dummyHeading1.id],
    };
    dummyContentItemsById = {
      [dummyRoot.id]: dummyRoot,
      [dummyHeading1.id]: dummyHeading1,
      [dummyParagraph11.id]: dummyParagraph11,
      [dummyParagraph12.id]: dummyParagraph12,
    };
    dummyContentItemsState = {
      byId: dummyContentItemsById,
    };
    dummyState = {
      modules: {
        contentItems: dummyContentItemsState,
      },
    };
  });

  it(`puts an editPropsForTypeInState action`, (): void => {
    const dummyEditAction: $Exact<EditAction> = {
      type: t.EDIT,
      payload: {
        id: dummyParagraph11.id,
        propsForType: {
          text: 'Lorem ipsum dolor sit amet.',
        },
      },
    };
    return expectSaga(editSaga, dummyEditAction)
      .withState(dummyState)
      .put.like({
        action: {
          type: t.EDIT_PROPS_FOR_TYPE_IN_STATE,
          payload: {
            contentItem: dummyParagraph11,
            propsForType: {
              text: dummyEditAction.payload.propsForType.text,
            },
          },
        },
      })
      .run();
  });

  it(`puts a remove action, when a plainText contentItem's isEditing state is FALSE and its text property is being set to an empty string`, (): void => {
    const dummyEditAction: $Exact<EditAction> = {
      type: t.EDIT,
      payload: {
        id: dummyParagraph11.id,
        propsForType: {
          text: '',
        },
      },
    };
    return expectSaga(editSaga, dummyEditAction)
      .withState(dummyState)
      .put.like({
        action: {
          type: t.REMOVE,
          payload: {
            id: dummyParagraph11.id,
          },
        },
      })
      .run();
  });

  it(`does not put a remove action, when a plainText contentItem's isEditing state is TRUE and its text property is being set to an empty string`, (): void => {
    dummyParagraph11.isEditing = true;

    const dummyEditAction: $Exact<EditAction> = {
      type: t.EDIT,
      payload: {
        id: dummyParagraph11.id,
        propsForType: {
          text: '',
        },
      },
    };
    return expectSaga(editSaga, dummyEditAction)
      .withState(dummyState)
      .not.put.actionType(t.REMOVE)
      .run();
  });

  it(`throws an ObjectNotFoundError, when the contentItem for the passed id cannot be found`, (): void => {
    const dummyInvalidId = 'ExtremelyUnlikelyIdX';
    const dummyEditAction: $Exact<EditAction> = {
      type: t.EDIT,
      payload: {
        id: dummyInvalidId,
        propsForType: {
          text: 'Lorem ipsum dolor sit amet.',
        },
      },
    };
    expect((): void => {
      testSaga(editSaga, dummyEditAction)
        .next()
        .select(selectors.getById, { id: dummyInvalidId })
        .next(null);
    }).toThrow(ObjectNotFoundError);
  });

  it(`temporarily throws a NotYetImplementedError, when the contentItem's type is not a plainTextContentItemType`, (): void => {
    const dummyEditAction: $Exact<EditAction> = {
      type: t.EDIT,
      payload: {
        id: dummyRoot.id,
        isEditing: false,
        propsForType: {},
      },
    };
    expect((): void => {
      testSaga(editSaga, dummyEditAction)
        .next()
        .select(selectors.getById, { id: dummyRoot.id })
        .next(dummyRoot);
    }).toThrow(NotYetImplementedError);
  });

});
