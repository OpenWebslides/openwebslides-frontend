// @flow

import { expectSaga, testSaga } from 'redux-saga-test-plan';
import NotYetImplementedError from 'errors/implementation-errors/NotYetImplementedError';
import ObjectNotFoundError from 'errors/usage-errors/ObjectNotFoundError';

import * as t from '../../../actionTypes';
import type { EditAction } from '../../../actionTypes';
import { contentItemTypes } from '../../../model';
import type {
  RootContentItem,
  HeadingContentItem,
  ParagraphContentItem,
  ContentItemsById,
  ContentItemsState,
} from '../../../model';
import { getById } from '../../../selectors';
import * as dummyContentItemData from '../../../lib/test-resources/dummyContentItemData';

import editSaga from '../edit';

describe(`editSaga`, (): void => {

  const dummyParagraph2: $Exact<ParagraphContentItem> = {
    id: 'cpi389s1e3cpi389s1e3',
    type: contentItemTypes.PARAGRAPH,
    isEditing: false,
    text: 'Sed ut neque tristique, venenatis purus a, consequat orci. Aenean sed lectus et ante aliquet maximus.',
    metadata: dummyContentItemData.emptyMetadata,
    subItemIds: [],
  };
  const dummyParagraph1: $Exact<ParagraphContentItem> = {
    id: 'vrci6v35s7vrci6v35s7',
    type: contentItemTypes.PARAGRAPH,
    isEditing: false,
    text: 'Sed hendrerit eget metus nec elementum. Aenean commodo semper sapien, nec porta leo.',
    metadata: dummyContentItemData.emptyMetadata,
    subItemIds: [],
  };
  const dummyHeading1: $Exact<HeadingContentItem> = {
    id: '6o6qy5dz0a6o6qy5dz0a',
    type: contentItemTypes.HEADING,
    isEditing: false,
    text: 'Lorem ipsum',
    metadata: dummyContentItemData.emptyMetadata,
    subItemIds: [dummyParagraph1.id, dummyParagraph2.id],
  };
  const dummyRoot1: $Exact<RootContentItem> = {
    id: 'ua32xchh7qua32xchh7q',
    type: contentItemTypes.ROOT,
    isEditing: false,
    childItemIds: [dummyHeading1.id],
  };
  const dummyContentItemsById: ContentItemsById = {
    [dummyRoot1.id]: dummyRoot1,
    [dummyHeading1.id]: dummyHeading1,
    [dummyParagraph1.id]: dummyParagraph1,
    [dummyParagraph2.id]: dummyParagraph2,
  };
  const dummyContentItemsState: ContentItemsState = {
    byId: dummyContentItemsById,
  };
  const dummyState: any = {
    modules: {
      contentItems: dummyContentItemsState,
    },
  };

  it(`puts an editInState action`, (): void => {
    const dummyEditAction: $Exact<EditAction> = {
      type: t.EDIT,
      payload: {
        id: dummyParagraph1.id,
        isEditing: false,
        propsForType: {
          text: 'Lorem ipsum dolor sit amet.',
        },
      },
    };
    return expectSaga(editSaga, dummyEditAction)
      .withState(dummyState)
      .put.like({
        action: {
          type: t.EDIT_IN_STATE,
          payload: {
            id: dummyParagraph1.id,
            type: dummyParagraph1.type,
            isEditing: false,
            propsForType: {
              text: dummyEditAction.payload.propsForType.text,
            },
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
          type: t.EDIT_IN_STATE,
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
