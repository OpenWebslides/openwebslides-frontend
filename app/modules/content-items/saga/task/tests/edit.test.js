// @flow

import { expectSaga } from 'redux-saga-test-plan';

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
import * as dummyContentItemData from '../../../lib/test-resources/dummyContentItemData';

import editSaga from '../edit';

describe(`editSaga`, (): void => {

  const dummyParagraph2: $Exact<ParagraphContentItem> = {
    id: 'cpi389s1e3cpi389s1e3',
    type: contentItemTypes.PARAGRAPH,
    text: 'Sed ut neque tristique, venenatis purus a, consequat orci. Aenean sed lectus et ante aliquet maximus.',
    metadata: dummyContentItemData.emptyMetadata,
    subItemIds: [],
  };
  const dummyParagraph1: $Exact<ParagraphContentItem> = {
    id: 'vrci6v35s7vrci6v35s7',
    type: contentItemTypes.PARAGRAPH,
    text: 'Sed hendrerit eget metus nec elementum. Aenean commodo semper sapien, nec porta leo.',
    metadata: dummyContentItemData.emptyMetadata,
    subItemIds: [],
  };
  const dummyHeading1: $Exact<HeadingContentItem> = {
    id: '6o6qy5dz0a6o6qy5dz0a',
    type: contentItemTypes.HEADING,
    text: 'Lorem ipsum',
    metadata: dummyContentItemData.emptyMetadata,
    subItemIds: [dummyParagraph1.id, dummyParagraph2.id],
  };
  const dummyRoot1: $Exact<RootContentItem> = {
    id: 'ua32xchh7qua32xchh7q',
    type: contentItemTypes.ROOT,
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
            propsForType: {
              text: dummyEditAction.payload.propsForType.text,
            },
          },
        },
      })
      .run();
  });

  it(`temporarily replaces empty text props with a delete placeholder`, (): void => {
    const dummyEditAction: $Exact<EditAction> = {
      type: t.EDIT,
      payload: {
        id: dummyParagraph1.id,
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
