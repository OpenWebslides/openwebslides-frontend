// @flow

import { expectSaga, testSaga } from 'redux-saga-test-plan';
import NotYetImplementedError from 'errors/implementation-errors/NotYetImplementedError';
import ObjectNotFoundError from 'errors/usage-errors/ObjectNotFoundError';

import * as t from '../../../actionTypes';
import type { EditAction } from '../../../actionTypes';
import type {
  RootContentItem,
  HeadingContentItem,
  ParagraphContentItem,
  ContentItemsById,
  ContentItemsState,
} from '../../../model';
import { getById } from '../../../selectors';
import * as dummyData from '../../../lib/test-resources/dummyContentItemData';

import editSaga from '../edit';

describe(`editSaga`, (): void => {

  let dummyParagraph2: $Exact<ParagraphContentItem>;
  let dummyParagraph1: $Exact<ParagraphContentItem>;
  let dummyHeading1: $Exact<HeadingContentItem>;
  let dummyRoot1: $Exact<RootContentItem>;
  let dummyContentItemsById: ContentItemsById;
  let dummyContentItemsState: ContentItemsState;
  let dummyState: any;

  beforeEach((): void => {
    dummyParagraph2 = {
      ...dummyData.paragraphContentItem2,
    };
    dummyParagraph1 = {
      ...dummyData.paragraphContentItem,
    };
    dummyHeading1 = {
      ...dummyData.headingContentItem,
      subItemIds: [dummyParagraph1.id, dummyParagraph2.id],
    };
    dummyRoot1 = {
      ...dummyData.rootContentItem,
      childItemIds: [dummyHeading1.id],
    };
    dummyContentItemsById = {
      [dummyRoot1.id]: dummyRoot1,
      [dummyHeading1.id]: dummyHeading1,
      [dummyParagraph1.id]: dummyParagraph1,
      [dummyParagraph2.id]: dummyParagraph2,
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
        id: dummyParagraph1.id,
        isEditing: true,
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
            contentItem: dummyParagraph1,
            propsForType: {
              text: dummyEditAction.payload.propsForType.text,
            },
          },
        },
      })
      .run();
  });

  it(`puts an toggleEditing action, when the passed isEditing value is different from the contentItem's current isEditing value`, (): void => {
    const dummyEditAction: $Exact<EditAction> = {
      type: t.EDIT,
      payload: {
        id: dummyParagraph1.id,
        isEditing: true,
        propsForType: {
          text: 'Lorem ipsum dolor sit amet.',
        },
      },
    };
    return expectSaga(editSaga, dummyEditAction)
      .withState(dummyState)
      .put.like({
        action: {
          type: t.TOGGLE_EDITING,
          payload: {
            id: dummyParagraph1.id,
          },
        },
      })
      .run();
  });

  it(`throws an ObjectNotFoundError, when the contentItem for the passed id cannot be found`, (): void => {
    const dummyInvalidId = 'ExtremelyUnlikelyIdX';
    const dummyEditAction: $Exact<EditAction> = {
      type: t.EDIT,
      payload: {
        id: dummyInvalidId,
        isEditing: false,
        propsForType: {
          text: 'Lorem ipsum dolor sit amet.',
        },
      },
    };
    expect((): void => {
      testSaga(editSaga, dummyEditAction)
        .next()
        .select(getById, { id: dummyInvalidId })
        .next(null);
    }).toThrow(ObjectNotFoundError);
  });

  it(`temporarily throws a NotYetImplementedError, when the contentItem's type is not a plainTextContentItemType`, (): void => {
    const dummyEditAction: $Exact<EditAction> = {
      type: t.EDIT,
      payload: {
        id: dummyRoot1.id,
        isEditing: false,
        propsForType: {},
      },
    };
    expect((): void => {
      testSaga(editSaga, dummyEditAction)
        .next()
        .select(getById, { id: dummyRoot1.id })
        .next(dummyRoot1);
    }).toThrow(NotYetImplementedError);
  });

  it(`temporarily replaces empty text props with a delete placeholder`, (): void => {
    const dummyEditAction: $Exact<EditAction> = {
      type: t.EDIT,
      payload: {
        id: dummyParagraph1.id,
        isEditing: false,
        propsForType: {
          text: '',
        },
      },
    };
    return expectSaga(editSaga, dummyEditAction)
      .withState(dummyState)
      .put.like({
        action: {
          type: t.EDIT_PROPS_FOR_TYPE_IN_STATE,
          payload: {
            propsForType: {
              text: `*\\[Empty contentItems should be automatically deleted; delete functionality to be implemented later.\\]*`,
            },
          },
        },
      })
      .run();
  });

});
